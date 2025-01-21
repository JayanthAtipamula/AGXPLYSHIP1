import * as React from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CompanyCard } from '../components/CompanyCard';
import { Loader2 } from 'lucide-react';

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

export function DynamicPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Function to shuffle array
  const shuffleArray = (array: Company[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchPageData = React.useCallback(async () => {
    if (!pageId) {
      setError('Invalid page ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching page with ID:', pageId);

      // First get the page data
      const pagesRef = collection(db, 'pages');
      const pagesQuery = query(pagesRef, where('pageId', '==', pageId));
      const pageSnapshot = await getDocs(pagesQuery);
      
      console.log('Page snapshot size:', pageSnapshot.size);
      console.log('Page snapshot data:', pageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      if (pageSnapshot.empty) {
        setError('Page not found');
        return;
      }

      const pageDoc = pageSnapshot.docs[0];
      const pageData = pageDoc.data();
      
      if (!pageData.companies || !Array.isArray(pageData.companies)) {
        setError('Invalid page data');
        return;
      }

      console.log('Found page data:', pageData);

      // Then fetch the companies
      const companiesData = await Promise.all(
        pageData.companies.map(async (companyId: string) => {
          try {
            const companyRef = doc(db, 'companies', companyId);
            const companySnap = await getDoc(companyRef);
            
            if (!companySnap.exists()) {
              console.log('Company not found:', companyId);
              return null;
            }

            const data = companySnap.data();
            console.log('Company data:', companyId, data);

            return {
              id: companySnap.id,
              name: data.name || '',
              logo: data.logo || '',
              yearsExperience: Number(data.yearsExperience) || 0,
              numberOfProjects: Number(data.numberOfProjects) || 0,
              location: data.location || '',
              projectsLink: data.projectsLink || '#',
              projectImages: data.projectImages || []
            };
          } catch (err) {
            console.error('Error fetching company:', companyId, err);
            return null;
          }
        })
      );

      const validCompanies = companiesData.filter((c): c is Company => c !== null);
      console.log('Valid companies:', validCompanies);

      if (validCompanies.length === 0) {
        setError('No companies found');
        return;
      }

      // Shuffle the companies before setting state
      setCompanies(shuffleArray(validCompanies));
    } catch (err) {
      console.error('Error fetching page data:', err);
      setError('Failed to load page data');
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  // Add effect to reshuffle companies periodically
  React.useEffect(() => {
    if (companies.length > 0) {
      const intervalId = setInterval(() => {
        setCompanies(shuffleArray(companies));
      }, 300000); // Reshuffle every 5 minutes

      return () => clearInterval(intervalId);
    }
  }, [companies]);

  React.useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
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
  );
} 