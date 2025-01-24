import * as React from 'react';
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw, Calendar, Phone, Check, X } from 'lucide-react';
import type { Lead, Company } from '../types/index';

type DashboardCompany = Pick<Company, 'id' | 'name' | 'logo' | 'subscriptionPlan' | 'subscriptionStartDate'>;

interface StatusIconProps {
  status: 'contacted' | 'pending';
  onClick: () => void;
}

const StatusIcon = ({ status, onClick }: StatusIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
        status === 'contacted' 
          ? 'bg-green-100 hover:bg-green-200' 
          : 'bg-red-100 hover:bg-red-200'
      }`}
    >
      {status === 'contacted' ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <X className="w-5 h-5 text-red-600" />
      )}
    </button>
  );
};

export function OwnerDashboard() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [company, setCompany] = React.useState<DashboardCompany | null>(null);
  const [totalLeads, setTotalLeads] = React.useState(0);
  const navigate = useNavigate();

  const calculateDaysLeft = (startDate: string, plan: string) => {
    const start = new Date(startDate);
    const today = new Date();
    let months = 0;
    
    switch (plan) {
      case '1M': months = 1; break;
      case '3M': months = 3; break;
      case '6M': months = 6; break;
      case '1Y': months = 12; break;
    }
    
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getPlanDisplay = (plan: string) => {
    switch (plan) {
      case '1M': return '1 Month';
      case '3M': return '3 Months';
      case '6M': return '6 Months';
      case '1Y': return '1 Year';
      default: return plan;
    }
  };

  const handleCall = (phone: string) => {
    // Remove any non-digit characters from the phone number
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Add the country code if it's not present (assuming India +91)
    const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    
    // Create the tel link
    const telLink = `tel:+${formattedPhone}`;
    
    // Open in new tab to ensure it works on all devices
    window.open(telLink, '_blank');
  };

  const isToday = (date: string) => {
    const today = new Date();
    const leadDate = new Date(date);
    return today.toDateString() === leadDate.toDateString();
  };

  const isYesterday = (date: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const leadDate = new Date(date);
    return yesterday.toDateString() === leadDate.toDateString();
  };

  const handleStatusToggle = async (leadId: string, currentStatus: 'contacted' | 'pending') => {
    try {
      const newStatus = currentStatus === 'contacted' ? 'pending' : 'contacted';
      
      // Update in Firestore
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        status: newStatus
      });

      // Update local state
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === leadId
            ? { ...lead, status: newStatus }
            : lead
        )
      );
    } catch (err) {
      console.error('Error updating lead status:', err);
      // Optionally show error to user
    }
  };

  const fetchLeads = async () => {
    try {
      setRefreshing(true);
      setError(null);

      // Get company ID from localStorage
      const storedCompany = localStorage.getItem('ownerCompany');
      if (!storedCompany) {
        navigate('/owner-login');
        return;
      }

      const companyData = JSON.parse(storedCompany);
      const companyId = companyData.id;

      if (!companyId) {
        setError('No company ID found. Please log in again.');
        navigate('/owner-login');
        return;
      }

      // Get company details
      const companyRef = doc(db, 'companies', companyId);
      const companySnap = await getDoc(companyRef);

      if (!companySnap.exists()) {
        setError('Company not found. Please log in again.');
        navigate('/owner-login');
        return;
      }

      const companyDetails = companySnap.data();
      setCompany({
        id: companySnap.id,
        name: companyDetails.name,
        logo: companyDetails.logo,
        subscriptionPlan: companyDetails.subscriptionPlan,
        subscriptionStartDate: companyDetails.subscriptionStartDate
      });

      // Get leads for this company
      const leadsQuery = query(
        collection(db, 'leads'),
        where('companyId', '==', companyId)
      );
      
      const leadsSnapshot = await getDocs(leadsQuery);
      const leadsData = leadsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          phone: data.phone || '',
          type: data.type || 'consultation',
          timestamp: data.timestamp || new Date().toISOString(),
          companyId: data.companyId,
          distributedAt: data.distributedAt || new Date().toISOString(),
          contacted: Boolean(data.contacted),
          status: data.status || 'pending'
        } as Lead;
      });

      setTotalLeads(leadsData.length);

      // Sort leads by distributedAt in memory
      const sortedLeads = leadsData.sort((a, b) => {
        const dateA = new Date(a.distributedAt || '').getTime();
        const dateB = new Date(b.distributedAt || '').getTime();
        return dateB - dateA; // Sort in descending order (newest first)
      });

      setLeads(sortedLeads);
    } catch (err) {
      console.error('Error fetching leads:', err);
      if (err instanceof Error) {
        setError(`Failed to load leads: ${err.message}`);
      } else {
        setError('Failed to load leads');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchLeads();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-2 pt-4">
      {company && (
        <div className="mb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <img src={company.logo} alt={company.name} className="w-14 h-14 object-contain" />
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold">{company.name}</h1>
            <div className="flex items-center justify-center sm:justify-start text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {getPlanDisplay(company.subscriptionPlan)} Plan • {calculateDaysLeft(company.subscriptionStartDate, company.subscriptionPlan)} days remaining
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Total Leads Card with Refresh */}
      <div className="mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Total Leads</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">{totalLeads}</p>
            </div>
            <button
              onClick={() => fetchLeads()}
              disabled={refreshing}
              className="p-1.5 text-gray-600 hover:text-blue-600 rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  <div>Date</div>
                  <div>Time</div>
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-3 sm:px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Status</th>
                <th className="px-3 sm:px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Call</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map(lead => (
                <tr 
                  key={lead.id}
                  className={`${
                    isToday(lead.distributedAt || '') 
                      ? 'bg-blue-100' 
                      : isYesterday(lead.distributedAt || '') 
                        ? 'bg-purple-100'
                        : ''
                  } hover:bg-opacity-80`}
                >
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>{new Date(lead.distributedAt || '').toLocaleDateString()}</span>
                      <span className="text-gray-500 text-xs">{new Date(lead.distributedAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-900">{lead.name}</td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-900">{lead.phone}</td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center">
                      <StatusIcon 
                        status={lead.status} 
                        onClick={() => handleStatusToggle(lead.id, lead.status)}
                      />
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleCall(lead.phone)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {leads.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No leads available
          </div>
        )}
      </div>
    </div>
  );
} 