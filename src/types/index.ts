export interface Company {
  id: string;
  name: string;
  logo: string;
  yearsExperience: number;
  numberOfProjects: number | 'Not Available';
  location: string;
  projectsLink: string;
  ownerName: string;
  ownerPhone: string;
  subscriptionPlan: '1M' | '3M' | '6M' | '1Y';
  subscriptionStartDate: string;
  projectImages: string[];
  password: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  type: 'consultation' | 'visit';
  timestamp: string;
  companyId?: string;
  companyName?: string;
  distributedAt?: string;
  contacted: boolean;
  status: 'pending' | 'contacted';
}

export interface Page {
  id: string;
  pageId: string;
  companies: string[];
  createdAt: string;
}

export interface CompanyWithPages extends Company {
  pages: { id: string; pageId: string }[];
}

export type LeadType = 'consultation' | 'visit';
export type LeadStatus = 'pending' | 'contacted';

export interface LeadSummary {
  [companyId: string]: {
    newLeads: number;
    consultationLeads: number;
    visitLeads: number;
  };
}

export interface DistributionHistory {
  id: string;
  timestamp: string;
  todayLeads: number;
  rotatedLeads: number;
  expiredLeads: number;
  activeCompanies: number;
  distributionSummary: Record<string, {
    newLeads: number;
    consultationLeads: number;
    visitLeads: number;
    rotatedLeads: number;
  }>;
  rotationSummary: Record<string, {
    rotatedLeads: number;
    consultationLeads: number;
    visitLeads: number;
  }>;
}

// Helper type for the public view of a company (used in CompanyCard)
export type PublicCompany = Pick<Company, 'id' | 'name' | 'logo' | 'yearsExperience' | 'numberOfProjects' | 'location' | 'projectsLink' | 'projectImages'>;

// Helper type for company creation (all fields except id)
export type CreateCompanyInput = Omit<Company, 'id'>; 