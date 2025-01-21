import * as React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CompanyCard } from '../components/CompanyCard';
import { Loader2 } from 'lucide-react';
import { seedDemoData } from '../lib/seedData';
import { useInView } from 'react-intersection-observer';

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
  const [visibleCompanies, setVisibleCompanies] = React.useState<Company[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  // Function to shuffle array
  const shuffleArray = (array: Company[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'companies'));
        const companiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || '',
          logo: doc.data().logo || '',
          yearsExperience: Number(doc.data().yearsExperience) || 0,
          numberOfProjects: Number(doc.data().numberOfProjects) || 0,
          location: doc.data().location || '',
          projectsLink: doc.data().projectsLink || '#',
          projectImages: doc.data().projectImages || []
        })) as Company[];

        if (companiesData.length === 0) {
          await seedDemoData();
          const newSnapshot = await getDocs(collection(db, 'companies'));
          const newCompaniesData = newSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || '',
            logo: doc.data().logo || '',
            yearsExperience: Number(doc.data().yearsExperience) || 0,
            numberOfProjects: Number(doc.data().numberOfProjects) || 0,
            location: doc.data().location || '',
            projectsLink: doc.data().projectsLink || '#',
            projectImages: doc.data().projectImages || []
          })) as Company[];
          setCompanies(shuffleArray(newCompaniesData));
        } else {
          setCompanies(shuffleArray(companiesData));
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

  React.useEffect(() => {
    if (inView) {
      const nextBatch = companies.slice(
        visibleCompanies.length,
        visibleCompanies.length + 5
      );
      if (nextBatch.length > 0) {
        setVisibleCompanies(prev => [...prev, ...nextBatch]);
      }
    }
  }, [inView, companies]);

  React.useEffect(() => {
    setVisibleCompanies(companies.slice(0, 5));
  }, [companies]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:p-6">
                  <div className="relative">
                    <div className="w-32 h-32 md:w-56 md:h-48 flex-shrink-0 m-4">
                      <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1 px-4 pb-4 md:pl-6 md:pr-2 md:py-0">
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            {visibleCompanies.map(company => (
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
            {visibleCompanies.length < companies.length && (
              <div ref={ref} className="flex justify-center p-4">
                <div className="w-full max-w-4xl">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                    <div className="animate-pulse flex space-x-4">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-5/6" />
                          <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}