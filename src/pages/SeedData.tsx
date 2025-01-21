import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

export function SeedData() {
  const [seeding, setSeeding] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const seedData = async () => {
    try {
      setSeeding(true);
      setMessage('Seeding data...');
      
      const companiesRef = collection(db, 'companies');
      
      for (const company of demoCompanies) {
        await addDoc(companiesRef, company);
      }
      
      setMessage('Demo data seeded successfully!');
    } catch (error) {
      console.error('Error seeding data:', error);
      setMessage('Error seeding data. Check console for details.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Seed Demo Data</h1>
        <button
          onClick={seedData}
          disabled={seeding}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {seeding ? 'Seeding...' : 'Seed Demo Data'}
        </button>
        {message && (
          <p className="mt-4 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}