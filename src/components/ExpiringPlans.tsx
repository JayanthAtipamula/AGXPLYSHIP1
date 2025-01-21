import * as React from 'react';
import { Company } from '../types';
import { Edit, AlertTriangle, Calendar } from 'lucide-react';

type ExpiryTab = 'week' | '3days' | 'day' | 'expired';

interface ExpiryPlanModalProps {
  company: Company;
  onClose: () => void;
  onUpdate: (companyId: string, newPlan: string, newDate: string) => Promise<void>;
}

interface ExpiringPlansProps {
  companies: Company[];
  onUpdateSubscription: (companyId: string, newPlan: string, newDate: string) => Promise<void>;
}

export function ExpiringPlans({ companies, onUpdateSubscription }: ExpiringPlansProps) {
  const [activeTab, setActiveTab] = React.useState<ExpiryTab>('week');
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const [updating, setUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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

  const filterCompaniesByExpiry = (tab: ExpiryTab) => {
    return companies.filter(company => {
      const daysLeft = calculateDaysLeft(company.subscriptionStartDate, company.subscriptionPlan);
      switch (tab) {
        case 'week': return daysLeft <= 7 && daysLeft > 3;
        case '3days': return daysLeft <= 3 && daysLeft > 1;
        case 'day': return daysLeft === 1;
        case 'expired': return daysLeft <= 0;
        default: return false;
      }
    });
  };

  const handleUpdatePlan = async (companyId: string, newPlan: string, newDate: string) => {
    try {
      setUpdating(true);
      setError(null);
      await onUpdateSubscription(companyId, newPlan, newDate);
      setSelectedCompany(null);
    } catch (err) {
      setError('Failed to update subscription');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Subscription Expiry Management</h2>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('week')}
          className={`flex-1 py-2 px-4 rounded-md ${
            activeTab === 'week' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          Expiring in Week
        </button>
        <button
          onClick={() => setActiveTab('3days')}
          className={`flex-1 py-2 px-4 rounded-md ${
            activeTab === '3days' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          Expiring in 3 Days
        </button>
        <button
          onClick={() => setActiveTab('day')}
          className={`flex-1 py-2 px-4 rounded-md ${
            activeTab === 'day' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          Expiring Tomorrow
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          className={`flex-1 py-2 px-4 rounded-md ${
            activeTab === 'expired' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
        >
          Expired
        </button>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filterCompaniesByExpiry(activeTab).map(company => (
          <div
            key={company.id}
            className={`border rounded-lg p-4 ${
              activeTab === 'expired' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-sm text-gray-600">Owner: {company.ownerName}</p>
                  <p className="text-sm text-gray-600">Phone: {company.ownerPhone}</p>
                  <p className={`text-sm ${activeTab === 'expired' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {activeTab === 'expired' ? (
                      <span className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Subscription Expired
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Expires in {calculateDaysLeft(company.subscriptionStartDate, company.subscriptionPlan)} days
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompany(company)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {filterCompaniesByExpiry(activeTab).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No companies {activeTab === 'expired' ? 'expired' : 'expiring'} in this period
          </div>
        )}
      </div>

      {/* Update Plan Modal */}
      {selectedCompany && (
        <ExpiryPlanModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onUpdate={handleUpdatePlan}
        />
      )}
    </div>
  );
}

function ExpiryPlanModal({ company, onClose, onUpdate }: ExpiryPlanModalProps) {
  const [newPlan, setNewPlan] = React.useState(company.subscriptionPlan);
  const [newDate, setNewDate] = React.useState(company.subscriptionStartDate);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      await onUpdate(company.id, newPlan, newDate);
      onClose();
    } catch (err) {
      setError('Failed to update subscription');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Update Subscription - {company.name}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Plan
              </label>
              <select
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isUpdating}
              >
                <option value="1M">1 Month</option>
                <option value="3M">3 Months</option>
                <option value="6M">6 Months</option>
                <option value="1Y">1 Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Start Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isUpdating}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Update Subscription'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 