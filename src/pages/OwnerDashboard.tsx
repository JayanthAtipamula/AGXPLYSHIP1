import * as React from 'react';
import { collection, query, where, getDocs, orderBy, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Loader2, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  type: 'consultation' | 'visit';
  timestamp: string;
}

type FilterPeriod = 'today' | 'yesterday' | 'last7days' | 'custom';

interface Company {
  id: string;
  name: string;
  ownerName: string;
  subscriptionPlan: '1M' | '3M' | '6M' | '1Y';
  subscriptionStartDate: string;
}

export function OwnerDashboard() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = React.useState<FilterPeriod>('today');
  const [customDateRange, setCustomDateRange] = React.useState({
    start: '',
    end: ''
  });
  const navigate = useNavigate();
  const [companyData, setCompanyData] = React.useState<Company | null>(null);
  const [lastSubscriptionCheck, setLastSubscriptionCheck] = React.useState<number>(
    parseInt(localStorage.getItem('lastSubscriptionCheck') || '0')
  );

  const shouldCheckSubscription = () => {
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return Date.now() - lastSubscriptionCheck > twentyFourHours;
  };

  const fetchCompanyData = async (companyId: string) => {
    try {
      const companyDoc = await getDocs(doc(db, 'companies', companyId));
      
      if (companyDoc.exists()) {
        const freshData = {
          id: companyId,
          ...companyDoc.data()
        } as Company;
        
        setCompanyData(freshData);
        localStorage.setItem('ownerCompany', JSON.stringify(freshData));
        
        const now = Date.now();
        setLastSubscriptionCheck(now);
        localStorage.setItem('lastSubscriptionCheck', now.toString());
      } else {
        localStorage.removeItem('ownerCompany');
        localStorage.removeItem('lastSubscriptionCheck');
        navigate('/owner-login');
      }
    } catch (err) {
      console.error('Error fetching company data:', err);
      setError('Failed to load company details');
    }
  };

  React.useEffect(() => {
    if (!companyData?.id) return;

    if (shouldCheckSubscription()) {
      fetchCompanyData(companyData.id);
    }

    const dailyCheckInterval = setInterval(() => {
      if (shouldCheckSubscription()) {
        fetchCompanyData(companyData.id);
      }
    }, 60 * 60 * 1000); // Check every hour if 24 hours have passed

    return () => {
      clearInterval(dailyCheckInterval);
    };
  }, [companyData?.id, lastSubscriptionCheck]);

  React.useEffect(() => {
    const storedData = localStorage.getItem('ownerCompany');
    if (!storedData) {
      navigate('/owner-login');
      return;
    }
    const parsedData = JSON.parse(storedData);
    setCompanyData(parsedData);

    if (shouldCheckSubscription()) {
      fetchCompanyData(parsedData.id);
    }
  }, []);

  const fetchLeads = React.useCallback(async () => {
    if (!companyData) return;

    try {
      setLoading(true);
      setError(null);

      let startDate: Date;
      let endDate = new Date();
      endDate.setHours(23, 59, 59, 999);

      switch (filterPeriod) {
        case 'today':
          startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'yesterday':
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(startDate);
          endDate.setHours(23, 59, 59, 999);
          break;
        case 'last7days':
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'custom':
          if (!customDateRange.start || !customDateRange.end) {
            setError('Please select both start and end dates');
            setLoading(false);
            return;
          }
          startDate = new Date(customDateRange.start);
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(customDateRange.end);
          endDate.setHours(23, 59, 59, 999);
          break;
        default:
          startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
      }

      const leadsQuery = query(
        collection(db, 'leads'),
        where('companyId', '==', companyData.id),
        where('timestamp', '>=', startDate.toISOString()),
        where('timestamp', '<=', endDate.toISOString()),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(leadsQuery);
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];

      setLeads(leadsData);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [filterPeriod, customDateRange, companyData]);

  React.useEffect(() => {
    if (companyData) {
      fetchLeads();
    }
  }, [fetchLeads, companyData]);

  const calculateSubscriptionDetails = (startDate: string, plan: string) => {
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
    
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    
    return {
      endDate: end.toLocaleDateString(),
      daysLeft: Math.max(0, daysLeft),
      progress: Math.min(100, Math.max(0, progress)),
      totalDays
    };
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case '1M': return '1 Month';
      case '3M': return '3 Months';
      case '6M': return '6 Months';
      case '1Y': return '1 Year';
      default: return plan;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ownerCompany');
    localStorage.removeItem('lastSubscriptionCheck');
    navigate('/owner-login');
  };

  if (!companyData) return null;

  const subscription = calculateSubscriptionDetails(
    companyData.subscriptionStartDate,
    companyData.subscriptionPlan
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Subscription Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {companyData.name}
              </h1>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Owner: {companyData.ownerName}
                </p>
                <p className="text-sm text-gray-600">
                  Plan: {getPlanLabel(companyData.subscriptionPlan)}
                </p>
                <p className="text-sm text-gray-600">
                  Start Date: {new Date(companyData.subscriptionStartDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Expiry Date: {subscription.endDate}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Subscription Status
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {Math.round(subscription.progress)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${subscription.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
                <div className="text-center">
                  <span className={`text-sm font-medium ${
                    subscription.daysLeft < 7 ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {subscription.daysLeft} days remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Filter and Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Leads</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value as FilterPeriod)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="custom">Custom Range</option>
              </select>

              {filterPeriod === 'custom' && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">{error}</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No leads found for the selected period
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date & Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(lead.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{lead.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{lead.phone}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.type === 'consultation' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {lead.type === 'consultation' ? 'Consultation' : 'Visit'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 