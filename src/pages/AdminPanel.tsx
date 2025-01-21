import * as React from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, getCountFromServer } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Loader2, Trash2, Upload, LayoutDashboard, Building, UserPlus, Users, X } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo: string;
  yearsExperience: number;
  numberOfProjects: number | 'Not Available';
  location: string;
  projectsLink: string;
}

type ActiveView = 'dashboard' | 'companies' | 'addCompany';

interface ProjectImage {
  file: File;
  preview: string;
}

export function AdminPanel() {
  const [activeView, setActiveView] = React.useState<ActiveView>('dashboard');
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [leadsCount, setLeadsCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    yearsExperience: '',
    numberOfProjects: '',
    location: '',
    projectsLink: ''
  });
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [projectImages, setProjectImages] = React.useState<ProjectImage[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCompanies(), fetchLeadsCount()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadsCount = async () => {
    const snapshot = await getCountFromServer(collection(db, 'leads'));
    setLeadsCount(snapshot.data().count);
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'companies'));
      const companiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          logo: data.logo,
          yearsExperience: data.yearsExperience || 0,
          numberOfProjects: data.numberOfProjects || 'Not Available',
          location: data.location || 'Not Available',
          projectsLink: data.projectsLink || '#'
        };
      }) as Company[];
      setCompanies(companiesData);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImagesDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleProjectImagesSelect(files);
  };

  const handleProjectImagesSelect = (files: File[]) => {
    const newImages = files.slice(0, 4 - projectImages.length).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setProjectImages(prev => [...prev, ...newImages].slice(0, 4));
  };

  const removeProjectImage = (index: number) => {
    setProjectImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile) {
      setError('Please select a logo image');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Upload logo
      const storageRef = ref(storage, `logos/${Date.now()}-${logoFile.name}`);
      await uploadBytes(storageRef, logoFile);
      const logoUrl = await getDownloadURL(storageRef);

      // Upload project images
      const projectImageUrls = await Promise.all(
        projectImages.map(async (img) => {
          const imgRef = ref(storage, `projects/${Date.now()}-${img.file.name}`);
          await uploadBytes(imgRef, img.file);
          return getDownloadURL(imgRef);
        })
      );

      const companyData = {
        name: formData.name,
        logo: logoUrl,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        numberOfProjects: formData.numberOfProjects ? parseInt(formData.numberOfProjects) : 'Not Available',
        location: formData.location.trim() || 'Not Available',
        projectsLink: formData.projectsLink.trim() || '#',
        projectImages: projectImageUrls
      };

      await addDoc(collection(db, 'companies'), companyData);

      // Reset form
      setFormData({
        name: '',
        yearsExperience: '',
        numberOfProjects: '',
        location: '',
        projectsLink: ''
      });
      setLogoFile(null);
      setPreviewUrl(null);
      setProjectImages([]);
      
      await fetchCompanies();
    } catch (err) {
      console.error('Error adding company:', err);
      setError('Failed to add company');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (companyId: string) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'companies', companyId));
      await fetchCompanies();
    } catch (err) {
      console.error('Error deleting company:', err);
      setError('Failed to delete company');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Total Companies</h3>
        <div className="flex items-center">
          <Building className="w-8 h-8 text-blue-600 mr-3" />
          <span className="text-3xl font-bold">{companies.length}</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Total Leads</h3>
        <div className="flex items-center">
          <Users className="w-8 h-8 text-green-600 mr-3" />
          <span className="text-3xl font-bold">{leadsCount}</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'companies':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Companies List</h2>
            <div className="grid gap-6">
              {companies.map(company => (
                <div
                  key={company.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold">{company.name}</h3>
                      <p className="text-sm text-gray-600">
                        Years of Experience: {company.yearsExperience}
                      </p>
                      <p className="text-sm text-gray-600">
                        Number of Projects: {company.numberOfProjects}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {company.location}
                      </p>
                      <a
                        href={company.projectsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Projects
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'addCompany':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Company</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Projects
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.numberOfProjects}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfProjects: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Projects Link
                </label>
                <input
                  type="url"
                  value={formData.projectsLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectsLink: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional - https://..."
                />
              </div>

              {/* Company Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <Upload className="w-5 h-5 mr-2" />
                    <span>Choose Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                      required
                    />
                  </label>
                  {previewUrl && (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Logo preview"
                        className="h-16 w-16 object-contain rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Images (Up to 4)
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleProjectImagesDrop}
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors"
                >
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload files</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleProjectImagesSelect(Array.from(e.target.files || []))}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </div>

                {/* Preview Grid */}
                {projectImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {projectImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Project ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeProjectImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <p className="text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Adding Company...' : 'Add Company'}
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView('companies')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'companies' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building className="w-5 h-5" />
              <span>Companies</span>
            </button>
            <button
              onClick={() => setActiveView('addCompany')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'addCompany' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Company</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
}