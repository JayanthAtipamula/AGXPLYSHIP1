import * as React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CompanyCard } from '../components/CompanyCard';
import { Loader2 } from 'lucide-react';
import { seedDemoData } from '../lib/seedData';

interface Company {
  id: string;
  name: string;
  logo: string;
  yearsExperience: number;
  numberOfProjects: number;
  location: string;
  projectsLink: string;
  projectImages?: string[];
}

export function HomePage() {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'companies'));
        const companiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Company[];

        if (companiesData.length === 0) {
          // If no companies exist, seed demo data
          await seedDemoData();
          // Fetch again after seeding
          const newSnapshot = await getDocs(collection(db, 'companies'));
          const newCompaniesData = newSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Company[];
          setCompanies(newCompaniesData);
        } else {
          setCompanies(companiesData);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to load companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 md:pt-28 pb-6 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {companies.map(company => (
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company.name}
                logo={company.logo}
                yearsExperience={company.yearsExperience}
                numberOfProjects={company.numberOfProjects}
                location={company.location}
                projectsLink={company.projectsLink}
                projectImages={company.projectImages}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}