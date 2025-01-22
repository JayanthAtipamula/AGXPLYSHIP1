import * as React from 'react';
import { collection, query, where, getDocs, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, Phone, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lead {
  id: string;
  name: string;
  phone: string;
  type: 'consultation' | 'visit';
  timestamp: string;
  companyId?: string;
  distributedAt?: string;
  contacted: boolean;
}

interface Company {
  id: string;
  name: string;
  logo: string;
}

export function OwnerDashboard() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [company, setCompany] = React.useState<Company | null>(null);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      setLoading(true);
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
        logo: companyDetails.logo
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
          contacted: Boolean(data.contacted)
        } as Lead;
      });

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
    }
  };

  React.useEffect(() => {
    // Load data only when component mounts (when user opens dashboard)
    fetchLeads();
  }, []); // Empty dependency array means it only runs once when mounted

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleContactToggle = async (leadId: string, currentStatus: boolean) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        contacted: !currentStatus
      });
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { ...lead, contacted: !currentStatus }
            : lead
        )
      );
    } catch (err) {
      console.error('Error updating lead status:', err);
      if (err instanceof Error) {
        setError(`Failed to update lead: ${err.message}`);
      }
    }
  };

  const handleRefresh = () => {
    fetchLeads();
  };

  const isNewLead = (distributedAt: string) => {
    const date = new Date(distributedAt || new Date().toISOString());
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const leadDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (leadDate.getTime() === today.getTime()) {
      return 'today';
    } else if (leadDate.getTime() === yesterday.getTime()) {
      return 'yesterday';
    }
    return 'older';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr || new Date().toISOString());
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="text-red-600">{error}</div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Company Header */}
      {company && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={company.logo} alt={company.name} className="h-12 w-12 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-sm text-gray-500">Your Leads Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="hidden lg:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Call
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => {
                const leadAge = isNewLead(lead.distributedAt || '');
                const bgColor = 
                  leadAge === 'today' ? 'bg-blue-50' :
                  leadAge === 'yesterday' ? 'bg-purple-50' :
                  '';
                
                return (
                  <tr key={lead.id} className={bgColor}>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button
                        onClick={() => handleContactToggle(lead.id, lead.contacted)}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          lead.contacted
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                        title={lead.contacted ? 'Contacted' : 'Pending'}
                      >
                        {lead.contacted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <X className="w-5 h-5" />
                        )}
                        <span className="sr-only">{lead.contacted ? 'Contacted' : 'Pending'}</span>
                      </button>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="font-medium text-gray-900">{lead.name}</span>
                        {leadAge !== 'older' && (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            leadAge === 'today' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {leadAge === 'today' ? 'Today' : 'Yesterday'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{lead.phone}</span>
                    </td>
                    <td className="hidden lg:table-cell px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.distributedAt || '')}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button
                        onClick={() => handleCallClick(lead.phone)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200"
                        title="Call Now"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="sr-only">Call Now</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {leads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No leads available yet</p>
          </div>
        )}
      </div>
    </div>
  );
} 