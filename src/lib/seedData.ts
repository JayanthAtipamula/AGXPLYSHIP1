import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const demoCompanies = [
  {
    name: "Modern Interiors",
    logo: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop",
    yearsExperience: 8
  },
  {
    name: "Elite Designs",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=400&fit=crop",
    yearsExperience: 12
  },
  {
    name: "Luxury Living",
    logo: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop",
    yearsExperience: 15
  },
  {
    name: "Urban Spaces",
    logo: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&h=400&fit=crop",
    yearsExperience: 5
  },
  {
    name: "Classic Interiors",
    logo: "https://images.unsplash.com/photo-1616486701797-0f33f61038ec?w=400&h=400&fit=crop",
    yearsExperience: 20
  },
  {
    name: "Future Homes",
    logo: "https://images.unsplash.com/photo-1616486701194-a6be4b5606ff?w=400&h=400&fit=crop",
    yearsExperience: 7
  }
];

export async function seedDemoData() {
  try {
    // Check if data already exists
    const snapshot = await getDocs(collection(db, 'companies'));
    if (snapshot.size > 0) {
      return; // Data already exists, don't seed
    }

    const companiesRef = collection(db, 'companies');
    
    for (const company of demoCompanies) {
      await addDoc(companiesRef, company);
    }
    
    console.log('Demo data seeded successfully');
  } catch (error) {
    console.error('Error seeding demo data:', error);
    throw error;
  }
}