import * as React from 'react';
import { collection, query, where, getDocs, updateDoc, doc, orderBy, writeBatch } from 'firebase/firestore';
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
  distributedAt?: string;
  previousCompanyIds?: string[];
  rotationCount?: number;
}

interface Company {
  id: string;
  name: string;
  ownerName: string;
  subscriptionStartDate: string;
  subscriptionPlan: string;
}

type FilterPeriod = 'today' | 'yesterday' | 'custom';

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
  const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    daysLeft: Math.max(0, daysLeft)
  };
};

export function LeadDistribution() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [distributing, setDistributing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [distributionCounts, setDistributionCounts] = React.useState<Record<string, number>>({});
  const ROTATION_CYCLE_DAYS = 7; // Maximum days to rotate leads
  const [selectedDate, setSelectedDate] = React.useState<string>('today');
  const [showDistributionTable, setShowDistributionTable] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch all leads
      const leadsQuery = query(
        collection(db, 'leads'),
        orderBy('timestamp', 'desc')
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
        ...doc.data()
      })) as Company[];

      // Calculate distribution count based on leads' rotation count
      const distributionsByDate = leadsData.reduce((acc, lead) => {
        const date = new Date(lead.timestamp).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = 0;
        }
        // Use the actual rotation count of leads to determine distribution count
        const rotationCount = lead.rotationCount || 0;
        if (rotationCount > acc[date]) {
          acc[date] = rotationCount;
        }
        return acc;
      }, {} as Record<string, number>);

      setLeads(leadsData);
      setCompanies(companiesData);
      setDistributionCounts(distributionsByDate);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const calculateRotationInfo = (dateLeads: Lead[], dateStr: string) => {
    const activeCompanies = companies.filter(company => {
      const subscription = calculateSubscriptionDetails(
        company.subscriptionStartDate,
        company.subscriptionPlan
      );
      return subscription.daysLeft > 0;
    });

    // Calculate total possible unique assignments
    const totalLeads = dateLeads.length;
    const totalCompanies = activeCompanies.length;
    const totalPossibleAssignments = totalLeads * totalCompanies;
    
    // Calculate current assignments
    const currentAssignments = dateLeads.reduce((total, lead) => {
      const previousAssignments = lead.previousCompanyIds?.length || 0;
      return total + previousAssignments;
    }, 0);

    // Calculate unique leads per company per day
    const leadsPerCompanyPerDay = Math.ceil(totalLeads / totalCompanies);
    
    // Calculate total rotation days based on unique leads per company
    const totalRotationDays = Math.ceil(totalLeads / leadsPerCompanyPerDay);
    
    // Calculate remaining rotation days based on current distribution progress
    const completedRotationDays = Math.floor(currentAssignments / totalLeads);
    const remainingDays = totalRotationDays - completedRotationDays;

    // Calculate rotation stats
    const rotationStats = dateLeads.reduce((acc, lead) => {
      const previousCompanies = lead.previousCompanyIds || [];
      const canBeRotated = previousCompanies.length < activeCompanies.length;
      const remainingCompanies = activeCompanies.length - previousCompanies.length;

      if (canBeRotated) {
        acc.rotatable++;
        acc.remainingCompanies = Math.max(acc.remainingCompanies, remainingCompanies);
      } else {
        acc.completed++;
      }
      return acc;
    }, { rotatable: 0, completed: 0, remainingCompanies: 0 });

    return {
      remainingDays,
      rotationStats,
      canRotate: remainingDays > 0 && rotationStats.rotatable > 0,
      activeCompaniesCount: activeCompanies.length,
      totalPossibleAssignments,
      currentAssignments,
      leadsPerCompanyPerDay,
      totalRotationDays
    };
  };

  const distributeLeads = async () => {
    try {
      setDistributing(true);
      
      // Get active companies
      const activeCompanies = companies.filter(company => {
        const subscription = calculateSubscriptionDetails(
          company.subscriptionStartDate,
          company.subscriptionPlan
        );
        return subscription.daysLeft > 0;
      });

      if (activeCompanies.length === 0) {
        throw new Error('No active companies available for distribution');
      }

      const batch = writeBatch(db);
      const dateLeads = leads.filter(lead => {
        const leadDate = new Date(lead.timestamp).toLocaleDateString();
        return leadDate === selectedDate;
      });

      // First-time distribution: Divide leads equally among companies
      if (!dateLeads.some(lead => lead.rotationCount && lead.rotationCount > 0)) {
        const leadsPerCompany = Math.ceil(dateLeads.length / activeCompanies.length);
        
        // Distribute leads equally for first time
        activeCompanies.forEach((company, companyIndex) => {
          const startIndex = companyIndex * leadsPerCompany;
          const endIndex = Math.min(startIndex + leadsPerCompany, dateLeads.length);
          const companyLeads = dateLeads.slice(startIndex, endIndex);
          
          companyLeads.forEach(lead => {
            const leadRef = doc(db, 'leads', lead.id);
            batch.update(leadRef, {
              companyId: company.id,
              distributedAt: new Date().toISOString(),
              previousCompanyIds: [company.id],
              rotationCount: 1,
              status: 'distributed'
            });
          });
        });
      } else {
        // Subsequent distribution: Rotate leads to new companies while keeping previous distributions
        const currentDistributionCount = Math.max(...dateLeads.map(lead => lead.rotationCount || 0));
        
        // Group leads by their current company
        const leadsByCompany = new Map<string, Lead[]>();
        activeCompanies.forEach(company => leadsByCompany.set(company.id, []));
        
        dateLeads.forEach(lead => {
          const lastCompanyId = lead.previousCompanyIds?.[lead.previousCompanyIds.length - 1];
          if (lastCompanyId && leadsByCompany.has(lastCompanyId)) {
            leadsByCompany.get(lastCompanyId)?.push(lead);
          }
        });

        // Rotate leads to next company in sequence
        const companyIds = activeCompanies.map(c => c.id);
        leadsByCompany.forEach((companyLeads, currentCompanyId) => {
          if (!companyLeads.length) return;
          
          const currentIndex = companyIds.indexOf(currentCompanyId);
          const nextIndex = (currentIndex + 1) % companyIds.length;
          const nextCompanyId = companyIds[nextIndex];
          
          companyLeads.forEach(lead => {
            // Skip if lead has been distributed to all companies
            if (lead.previousCompanyIds?.length === activeCompanies.length) return;
            
            // Skip if next company already had this lead
            if (lead.previousCompanyIds?.includes(nextCompanyId)) {
              // Find the next available company
              let foundNextCompany = false;
              for (let i = 1; i < activeCompanies.length; i++) {
                const tryIndex = (nextIndex + i) % companyIds.length;
                const tryCompanyId = companyIds[tryIndex];
                if (!lead.previousCompanyIds.includes(tryCompanyId)) {
                  const leadRef = doc(db, 'leads', lead.id);
                  // Keep previous company assignments and add new one
                  batch.update(leadRef, {
                    companyId: tryCompanyId,
                    distributedAt: new Date().toISOString(),
                    previousCompanyIds: [...lead.previousCompanyIds, tryCompanyId],
                    rotationCount: currentDistributionCount + 1,
                    status: 'distributed'
                  });
                  foundNextCompany = true;
                  break;
                }
              }
              if (!foundNextCompany) return; // Skip if no available company found
            } else {
              // Assign to next company in sequence while keeping history
              const leadRef = doc(db, 'leads', lead.id);
              batch.update(leadRef, {
                companyId: nextCompanyId,
                distributedAt: new Date().toISOString(),
                previousCompanyIds: [...(lead.previousCompanyIds || []), nextCompanyId],
                rotationCount: currentDistributionCount + 1,
                status: 'distributed'
              });
            }
          });
        });
      }

      await batch.commit();
      await fetchData();
    } catch (err) {
      console.error('Error distributing leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to distribute leads');
    } finally {
      setDistributing(false);
    }
  };

  // Add this new function to get company name by ID
  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown Company';
  };

  // Add this new function to get all distribution history for a lead
  const getLeadDistributionHistory = (lead: Lead) => {
    const history = [];
    if (lead.previousCompanyIds && lead.previousCompanyIds.length > 0) {
      for (let i = 0; i < lead.previousCompanyIds.length; i++) {
        history.push({
          companyId: lead.previousCompanyIds[i],
          distributedAt: i === lead.previousCompanyIds.length - 1 ? lead.distributedAt : undefined
        });
      }
    }
    return history;
  };

  // Update the getDistributionDetails function
  const getDistributionDetails = (dateLeads: Lead[]) => {
    const distributionMap = new Map<string, {
      currentLeads: Lead[];
      previousLeads: Lead[];
    }>();
    
    // Initialize map with all active companies
    companies.forEach(company => {
      if (calculateSubscriptionDetails(company.subscriptionStartDate, company.subscriptionPlan).daysLeft > 0) {
        distributionMap.set(company.id, {
          currentLeads: [],
          previousLeads: []
        });
      }
    });

    // Group leads by current and previous distributions
    dateLeads.forEach(lead => {
      const history = getLeadDistributionHistory(lead);
      
      // Add to current company's current leads
      if (lead.companyId && distributionMap.has(lead.companyId)) {
        distributionMap.get(lead.companyId)?.currentLeads.push(lead);
      }

      // Add to previous companies' previous leads
      history.slice(0, -1).forEach(({ companyId }) => {
        if (companyId && distributionMap.has(companyId)) {
          distributionMap.get(companyId)?.previousLeads.push(lead);
        }
      });
    });

    return Array.from(distributionMap.entries()).map(([companyId, { currentLeads, previousLeads }]) => ({
      companyName: getCompanyName(companyId),
      totalCurrentLeads: currentLeads.length,
      totalPreviousLeads: previousLeads.length,
      currentLeads,
      previousLeads
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Group leads by date
  const leadsByDate = leads.reduce((acc, lead) => {
    const date = new Date(lead.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lead Distribution</h2>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      <div className="space-y-4">
        {Object.entries(leadsByDate).map(([date, dateLeads]) => {
          const totalLeads = dateLeads.length;
          const rotationInfo = calculateRotationInfo(dateLeads, date);
          const distributionCount = distributionCounts[date] || 0;

          return (
            <div key={date} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{date}</h3>
                  <p className="text-sm text-gray-600">Total Leads: {totalLeads}</p>
                  <div className="mt-2 text-sm">
                    <p className="text-blue-600">
                      Rotation Days Left: {rotationInfo.remainingDays} days
                      <span className="text-gray-500 text-xs ml-2">
                        ({rotationInfo.currentAssignments}/{rotationInfo.totalPossibleAssignments} assignments used)
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Each company gets {rotationInfo.leadsPerCompanyPerDay} unique leads per day
                    </p>
                    <p className="text-green-600">
                      Can Rotate: {rotationInfo.rotationStats.rotatable} leads
                      {rotationInfo.rotationStats.rotatable > 0 && 
                        ` to ${rotationInfo.rotationStats.remainingCompanies} companies`}
                    </p>
                    <p className="text-gray-600">
                      Active Companies: {rotationInfo.activeCompaniesCount}
                    </p>
                    <p className="text-purple-600">Distribution Count: {distributionCount}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setSelectedDate(date);
                      distributeLeads();
                    }}
                    disabled={distributing || rotationInfo.rotationStats.rotatable === 0}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {distributing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        <span>Distributing...</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 mr-2" />
                        <span>Distribute Leads</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowDistributionTable(showDistributionTable === date ? null : date)}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    <span>{showDistributionTable === date ? 'Hide Distribution' : 'View Distribution'}</span>
                  </button>
                </div>
              </div>
              
              {showDistributionTable === date && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Leads
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Previous Leads
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Leads
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lead Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getDistributionDetails(dateLeads).map(({ 
                        companyName, 
                        totalCurrentLeads, 
                        totalPreviousLeads, 
                        currentLeads, 
                        previousLeads 
                      }) => (
                        <tr key={companyName}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {companyName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {totalCurrentLeads}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {totalPreviousLeads}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {totalCurrentLeads + totalPreviousLeads}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="max-h-40 overflow-y-auto space-y-4">
                              {totalCurrentLeads > 0 && (
                                <div>
                                  <p className="font-medium text-blue-600 mb-1">Current Leads:</p>
                                  {currentLeads.map(lead => (
                                    <div key={lead.id} className="mb-1">
                                      {lead.name} - {lead.phone} ({lead.type})
                                    </div>
                                  ))}
                                </div>
                              )}
                              {totalPreviousLeads > 0 && (
                                <div>
                                  <p className="font-medium text-gray-600 mb-1">Previous Leads:</p>
                                  {previousLeads.map(lead => (
                                    <div key={lead.id} className="mb-1 text-gray-400">
                                      {lead.name} - {lead.phone} ({lead.type})
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 