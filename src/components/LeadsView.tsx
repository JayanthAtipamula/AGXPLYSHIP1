import * as React from 'react';
import { collection, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, Calendar, Trash2, X } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  type: 'consultation' | 'visit';
  companyName: string;
  timestamp: string;
  status: string;
}

type FilterPeriod = 'today' | 'yesterday' | 'last7days' | 'last1month' | 'custom';

interface PaginationConfig {
  itemsPerPage: number;
  currentPage: number;
}

export function LeadsView() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = React.useState<FilterPeriod>('today');
  const [customDateRange, setCustomDateRange] = React.useState({
    start: '',
    end: ''
  });
  const [pagination, setPagination] = React.useState<PaginationConfig>({
    itemsPerPage: 10,
    currentPage: 1
  });
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set());
  const [deleting, setDeleting] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<'consultation' | 'visit'>('consultation');
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    companyName: '',
    type: 'consultation' as 'consultation' | 'visit'
  });
  const [submitting, setSubmitting] = React.useState(false);

  const totalPages = Math.ceil(leads.length / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const currentLeads = leads.slice(startIndex, endIndex);

  const fetchLeads = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedLeads(new Set());

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
        case 'last1month':
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
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
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [filterPeriod, customDateRange]);

  const handleDeleteSelected = async () => {
    if (!window.confirm('Are you sure you want to delete the selected leads?')) {
      return;
    }

    try {
      setDeleting(true);
      const deletePromises = Array.from(selectedLeads).map(id => 
        deleteDoc(doc(db, 'leads', id))
      );
      await Promise.all(deletePromises);
      await fetchLeads();
    } catch (err) {
      console.error('Error deleting leads:', err);
      setError('Failed to delete leads');
    } finally {
      setDeleting(false);
      setSelectedLeads(new Set());
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === currentLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(currentLeads.map(lead => lead.id)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Implement the logic to add a new lead
      console.log('New lead:', formData);
      // Reset form and close modal
      setFormData({
        name: '',
        phone: '',
        companyName: '',
        type: 'consultation' as 'consultation' | 'visit'
      });
      setShowModal(false);
    } catch (err) {
      console.error('Error adding lead:', err);
      setError('Failed to add lead');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setCustomDateRange(prev => {
      const newRange = { ...prev, [field]: value };
      
      if (newRange.start && newRange.end) {
        const startDate = new Date(newRange.start);
        const endDate = new Date(newRange.end);
        
        if (endDate < startDate) {
          if (field === 'start') {
            newRange.end = value;
          } else {
            newRange.start = value;
          }
        }
        
        setError(null);
        setTimeout(() => fetchLeads(), 0);
      }
      
      return newRange;
    });
  };

  React.useEffect(() => {
    fetchLeads();
  }, [fetchLeads, filterPeriod]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Leads</h2>
        
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <div className="flex flex-wrap gap-3">
            <select
              value={filterPeriod}
              onChange={(e) => {
                setFilterPeriod(e.target.value as FilterPeriod);
                if (e.target.value !== 'custom') {
                  setCustomDateRange({ start: '', end: '' });
                  setError(null);
                }
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last1month">Last 1 Month</option>
              <option value="custom">Custom Range</option>
            </select>

            <select
              value={pagination.itemsPerPage}
              onChange={(e) => setPagination(prev => ({ ...prev, itemsPerPage: Number(e.target.value), currentPage: 1 }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>

          {filterPeriod === 'custom' && (
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-gray-600">Start Date</label>
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-gray-600">End Date</label>
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
              {filterPeriod === 'custom' && (!customDateRange.start || !customDateRange.end) && (
                <div className="text-red-500 text-sm">Please select both start and end dates</div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedLeads.size > 0 && (
        <div className="mb-4 flex justify-between items-center bg-red-50 p-3 rounded-md">
          <span className="text-red-600">{selectedLeads.size} leads selected</span>
          <button
            onClick={handleDeleteSelected}
            disabled={deleting}
            className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deleting ? 'Deleting...' : 'Delete Selected'}
          </button>
        </div>
      )}

      {leads.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No leads found for the selected period
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedLeads.size === currentLeads.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentLeads.map(lead => (
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
                    <td className="px-4 py-3 text-sm text-gray-900">{lead.companyName}</td>
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

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, leads.length)} of {leads.length} leads
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Lead Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New {selectedType === 'consultation' ? 'Consultation' : 'Visit'} Lead
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData(prev => ({ ...prev, phone: value }));
                      }}
                      pattern="\d{10}"
                      title="Please enter a valid 10-digit phone number"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
                  >
                    {submitting ? (
                      <>
                        <span className="mr-2">Adding Lead...</span>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      </>
                    ) : (
                      'Add Lead'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 