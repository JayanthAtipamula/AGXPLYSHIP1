import * as React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import type { DistributionHistory as DistributionHistoryType } from '../types/index';

interface DistributionHistoryProps {
  history: DistributionHistoryType[];
  onClose: () => void;
}

export function DistributionHistory({ history, onClose }: DistributionHistoryProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Distribution History</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[70vh]">
            {history.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No distribution history available</p>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">Distribution on {formatDate(item.timestamp)}</h3>
                          <p className="text-sm text-gray-600">
                            Total Leads: {item.todayLeads} | Rotated: {item.rotatedLeads} | Expired: {item.expiredLeads}
                          </p>
                        </div>
                      </div>
                      {expandedId === item.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {expandedId === item.id && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Distribution Summary</h4>
                            <div className="space-y-2">
                              {Object.entries(item.distributionSummary).map(([companyId, summary]) => (
                                <div key={companyId} className="text-sm">
                                  <p className="font-medium">Company ID: {companyId}</p>
                                  <p className="text-gray-600">
                                    New Leads: {summary.newLeads} | 
                                    Consultation: {summary.consultationLeads} | 
                                    Visit: {summary.visitLeads} |
                                    Rotated: {summary.rotatedLeads}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Rotation Summary</h4>
                            <div className="space-y-2">
                              {Object.entries(item.rotationSummary).map(([companyId, summary]) => (
                                <div key={companyId} className="text-sm">
                                  <p className="font-medium">Company ID: {companyId}</p>
                                  <p className="text-gray-600">
                                    Rotated: {summary.rotatedLeads} | 
                                    Consultation: {summary.consultationLeads} | 
                                    Visit: {summary.visitLeads}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Additional Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Active Companies: {item.activeCompanies}</p>
                              <p className="text-gray-600">Total Leads Distributed: {item.todayLeads}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Rotated Leads: {item.rotatedLeads}</p>
                              <p className="text-gray-600">Expired Leads: {item.expiredLeads}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 