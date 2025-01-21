export interface Company {
  id: string;
  name: string;
  logo: string;
  yearsExperience: number;
  numberOfProjects: number | 'Not Available';
  location: string;
  projectsLink: string;
} 