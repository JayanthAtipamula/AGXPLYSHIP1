import * as React from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, Share2 } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  type: 'consultation' | 'visit';
  timestamp: string;
  status: 'new' | 'distributed';
  companyId?: string;
}

interface Company {
  id: string;
  name: string;
  ownerName: string;
}

type FilterPeriod = 'today' | 'yesterday' | 'custom';

export function LeadDistribution() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [distributing, setDistributing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = React.useState<FilterPeriod>('today');
  const [customDateRange, setCustomDateRange] = React.useState({
    start: '',
    end: ''
  });
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set());

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate custom date range
      if (filterPeriod === 'custom' && (!customDateRange.start || !customDateRange.end)) {
        setError('Please select both start and end dates');
        return;
      }

      // Get date range
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
        case 'custom':
          startDate = new Date(customDateRange.start);
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(customDateRange.end);
          endDate.setHours(23, 59, 59, 999);
          break;
        default:
          startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
      }

      // Fetch leads
      const leadsQuery = query(
        collection(db, 'leads'),
        where('timestamp', '>=', startDate.toISOString()),
        where('timestamp', '<=', endDate.toISOString())
      );
      const leadsSnapshot = await getDocs(leadsQuery);
      const leadsData = leadsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];

      // Fetch companies
      const companiesSnapshot = await getDocs(collection(db, 'companies'));
      const companiesData = companiesSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        ownerName: doc.data().ownerName
      }));

      setLeads(leadsData);
      setCompanies(companiesData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [filterPeriod, customDateRange]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const distributeLeads = async () => {
    if (selectedLeads.size === 0) {
      setError('Please select leads to distribute');
      return;
    }

    if (companies.length === 0) {
      setError('No companies available for distribution');
      return;
    }

    // Add validation for custom date range
    if (filterPeriod === 'custom' && (!customDateRange.start || !customDateRange.end)) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setDistributing(true);
      setError(null);

      const selectedLeadsArray = Array.from(selectedLeads);
      const updates = selectedLeadsArray.map((leadId, index) => {
        const companyIndex = index % companies.length;
        return updateDoc(doc(db, 'leads', leadId), {
          companyId: companies[companyIndex].id,
          status: 'distributed'
        });
      });

      await Promise.all(updates);
      await fetchData();
      setSelectedLeads(new Set());
    } catch (err) {
      console.error('Error distributing leads:', err);
      setError('Failed to distribute leads');
    } finally {
      setDistributing(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(leads.map(lead => lead.id)));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Lead Distribution</h2>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value as FilterPeriod)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="custom">Custom Range</option>
          </select>

          {filterPeriod === 'custom' && (
            <div className="flex flex-col gap-2">
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
              {error && filterPeriod === 'custom' && (!customDateRange.start || !customDateRange.end) && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      {selectedLeads.size > 0 && (
        <div className="mb-4 flex justify-between items-center bg-blue-50 p-3 rounded-md">
          <span className="text-blue-600">{selectedLeads.size} leads selected</span>
          <button
            onClick={distributeLeads}
            disabled={distributing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {distributing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Share2 className="w-4 h-4 mr-2" />
            )}
            {distributing ? 'Distributing...' : 'Distribute Leads'}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedLeads.size === leads.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date & Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Assigned To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedLeads.has(lead.id)}
                    onChange={() => {
                      const newSelected = new Set(selectedLeads);
                      if (newSelected.has(lead.id)) {
                        newSelected.delete(lead.id);
                      } else {
                        newSelected.add(lead.id);
                      }
                      setSelectedLeads(newSelected);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
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
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    lead.status === 'distributed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lead.status === 'distributed' ? 'Distributed' : 'New'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {lead.companyId 
                    ? companies.find(c => c.id === lead.companyId)?.name || 'Unknown'
                    : '-'
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No leads found for the selected period
        </div>
      )}
    </div>
  );
} 