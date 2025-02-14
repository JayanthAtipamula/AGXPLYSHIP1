import * as React from 'react';
import { Calendar, MapPin, Briefcase, ExternalLink, ChevronDown, ChevronUp, X } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  yearsExperience: number;
  numberOfProjects: number;
  location: string;
  projectsLink: string;
  projectImages?: string[];
}

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  return (
    <div className={`relative ${className} bg-gray-100`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" 
               style={{
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 1.5s infinite'
               }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export function CompanyCard({ 
  id, 
  name, 
  logo, 
  yearsExperience,
  numberOfProjects,
  location,
  projectsLink,
  projectImages = []
}: CompanyCardProps) {
  const [showConsultationForm, setShowConsultationForm] = React.useState(false);
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const [showProjects, setShowProjects] = React.useState(false);

  // Fill remaining slots with placeholder images if less than 4 project images
  const displayImages = [...projectImages];
  while (displayImages.length < 4) {
    displayImages.push('https://placehold.co/512x512');
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:p-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-56 md:h-48 flex-shrink-0 m-4">
              <ImageWithFallback 
                src={logo} 
                alt={name} 
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
            {/* Mobile View Projects button */}
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="md:hidden absolute bottom-6 right-6 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span>View Projects</span>
              {showProjects ? (
                <ChevronUp className="w-4 h-4 ml-1.5" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1.5" />
              )}
            </button>
          </div>

          <div className="flex-1 px-4 pb-4 md:pl-6 md:pr-2 md:py-0">
            <div className="flex flex-col space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{name}</h3>
                {/* Desktop View Projects button */}
                <button
                  onClick={() => setShowProjects(!showProjects)}
                  className="hidden md:inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors ml-2"
                >
                  <span>View Projects</span>
                  {showProjects ? (
                    <ChevronUp className="w-4 h-4 ml-1.5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1.5" />
                  )}
                </button>
              </div>

              {/* Project Images Accordion */}
              {showProjects && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-3">
                  {displayImages.map((img, index) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden">
                      <ImageWithFallback 
                        src={img} 
                        alt={`Project ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2.5 flex-shrink-0" />
                <span>Years of Experience: {yearsExperience}</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <Briefcase className="w-4 h-4 mr-2.5 flex-shrink-0" />
                <span>Number of Projects: {numberOfProjects || 'Not Available'}</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2.5 flex-shrink-0" />
                <span>Location: {location || 'Not Available'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button 
                  onClick={() => setShowConsultationForm(true)}
                  className="flex-1 py-2.5 px-4 bg-white text-red-600 border border-red-600 text-sm text-center rounded-md hover:bg-red-50 transition-colors"
                >
                  Get Free Consultation
                </button>
                
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="flex-1 py-2.5 px-4 bg-red-600 text-white text-sm text-center rounded-md hover:bg-red-700 transition-colors"
                >
                  Book a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(showConsultationForm || showBookingForm) && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowConsultationForm(false);
              setShowBookingForm(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {showConsultationForm ? 'Get Free Consultation' : 'Book a Visit'}
                </h3>
                <button
                  onClick={() => {
                    setShowConsultationForm(false);
                    setShowBookingForm(false);
                  }}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <ContactForm 
                onSubmit={() => {
                  setShowConsultationForm(false);
                  setShowBookingForm(false);
                }}
                type={showConsultationForm ? 'consultation' : 'visit'}
                companyId={id}
                companyName={name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}