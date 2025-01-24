import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DistributedDataProps {
  distributionResults: {
    todayLeads: number;
    rotatedLeads: number;
    expiredLeads: number;
    activeCompanies: number;
    distributionSummary: Record<string, {
      newLeads: number;
      consultationLeads: number;
      visitLeads: number;
    }>;
    rotationSummary: Record<string, {
      rotatedLeads: number;
      consultationLeads: number;
      visitLeads: number;
    }>;
  } | null;
}

export function DistributedDataView({ distributionResults }: DistributedDataProps) {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  if (!distributionResults) {
    return (
      <div className="text-center py-8 text-gray-500">
        No distribution data available
      </div>
    );
  }

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Today's Leads: {distributionResults.todayLeads}</p>
            <p className="text-sm text-gray-600">Rotated Leads: {distributionResults.rotatedLeads}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expired Leads: {distributionResults.expiredLeads}</p>
            <p className="text-sm text-gray-600">Active Companies: {distributionResults.activeCompanies}</p>
          </div>
        </div>
      )
    },
    {
      id: 'distribution',
      title: 'Distribution Summary',
      content: (
        <div className="space-y-2">
          {Object.entries(distributionResults.distributionSummary).map(([companyId, summary]) => (
            <div key={companyId} className="border-b border-gray-100 pb-2">
              <p className="font-medium">Company ID: {companyId}</p>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                <p>New: {summary.newLeads}</p>
                <p>Consultation: {summary.consultationLeads}</p>
                <p>Visit: {summary.visitLeads}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'rotation',
      title: 'Rotation Summary',
      content: (
        <div className="space-y-2">
          {Object.entries(distributionResults.rotationSummary).map(([companyId, summary]) => (
            <div key={companyId} className="border-b border-gray-100 pb-2">
              <p className="font-medium">Company ID: {companyId}</p>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                <p>Rotated: {summary.rotatedLeads}</p>
                <p>Consultation: {summary.consultationLeads}</p>
                <p>Visit: {summary.visitLeads}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-semibold">{section.title}</h3>
            {expandedSection === section.id ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {expandedSection === section.id && (
            <div className="p-4 border-t border-gray-200">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 