import * as React from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, getCountFromServer, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Loader2, Trash2, Upload, LayoutDashboard, Building, UserPlus, Users, X, Calendar, Edit, AlertTriangle, Eye, EyeOff, Layout } from 'lucide-react';
import { LeadsView } from '../components/LeadsView';
import { ExpiringPlans } from '../components/ExpiringPlans';
import { CreatePage } from './CreatePage';
import { LeadDistribution } from '../components/LeadDistribution';

interface Company {
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
  projectImages?: string[];
  password: string;
}

type ActiveView = 'dashboard' | 'companies' | 'addCompany' | 'leads' | 'expiring' | 'createPage';

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
    projectsLink: '',
    ownerName: '',
    ownerPhone: '',
    subscriptionPlan: '1M',
    subscriptionStartDate: '',
    password: ''
  });
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [projectImages, setProjectImages] = React.useState<ProjectImage[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedCompanies, setSelectedCompanies] = React.useState<Set<string>>(new Set());
  const [deletingCompanies, setDeletingCompanies] = React.useState(false);
  const [editingCompany, setEditingCompany] = React.useState<Company | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
          projectsLink: data.projectsLink || '#',
          ownerName: data.ownerName || '',
          ownerPhone: data.ownerPhone || '',
          subscriptionPlan: data.subscriptionPlan || '1M',
          subscriptionStartDate: data.subscriptionStartDate || '',
          projectImages: data.projectImages || [],
          password: data.password || ''
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
        projectsLink: formData.projectsLink.trim() || '',
        ownerName: formData.ownerName.trim(),
        ownerPhone: `+91${formData.ownerPhone}`,
        subscriptionPlan: formData.subscriptionPlan,
        subscriptionStartDate: formData.subscriptionStartDate,
        projectImages: projectImageUrls,
        password: formData.password
      };

      await addDoc(collection(db, 'companies'), companyData);

      // Reset form
      setFormData({
        name: '',
        yearsExperience: '',
        numberOfProjects: '',
        location: '',
        projectsLink: '',
        ownerName: '',
        ownerPhone: '',
        subscriptionPlan: '1M',
        subscriptionStartDate: '',
        password: ''
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

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedCompanies.size} companies?`)) {
      return;
    }

    try {
      setDeletingCompanies(true);
      const deletePromises = Array.from(selectedCompanies).map(id => 
        deleteDoc(doc(db, 'companies', id))
      );
      await Promise.all(deletePromises);
      await fetchCompanies();
      setSelectedCompanies(new Set());
    } catch (err) {
      console.error('Error deleting companies:', err);
      setError('Failed to delete companies');
    } finally {
      setDeletingCompanies(false);
    }
  };

  const toggleSelectAllCompanies = () => {
    if (selectedCompanies.size === companies.length) {
      setSelectedCompanies(new Set());
    } else {
      setSelectedCompanies(new Set(companies.map(company => company.id)));
    }
  };

  const calculateSubscriptionDetails = (startDate: string, plan: string) => {
    const start = new Date(startDate);
    const today = new Date();
    let months = 0;
    
    switch (plan) {
      case '1M': months = 1; break;
      case '3M': months = 3; break;
      case '6M': months = 6; break;
      case '1Y': months = 12; break;
    }
    
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);
    
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    
    return {
      endDate: end.toLocaleDateString(),
      daysLeft: Math.max(0, daysLeft),
      progress: Math.min(100, Math.max(0, progress))
    };
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    try {
      setSubmitting(true);
      setError(null);

      let updatedData: Partial<Company> = {
        ...formData,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        numberOfProjects: formData.numberOfProjects ? parseInt(formData.numberOfProjects) : 'Not Available',
        ownerPhone: `+91${formData.ownerPhone}`,
        projectsLink: formData.projectsLink.trim() || '',
        password: formData.password || editingCompany.password
      };

      // Handle logo update if new logo is selected
      if (logoFile) {
        const storageRef = ref(storage, `logos/${Date.now()}-${logoFile.name}`);
        await uploadBytes(storageRef, logoFile);
        const logoUrl = await getDownloadURL(storageRef);
        updatedData.logo = logoUrl;
      }

      // Handle project images update if any new images are added
      if (projectImages.length > 0) {
        const projectImageUrls = await Promise.all(
          projectImages.map(async (img) => {
            if (img.file) {
              const imgRef = ref(storage, `projects/${Date.now()}-${img.file.name}`);
              await uploadBytes(imgRef, img.file);
              return getDownloadURL(imgRef);
            }
            return img.preview; // Keep existing image URL
          })
        );
        updatedData.projectImages = projectImageUrls;
      }

      await updateDoc(doc(db, 'companies', editingCompany.id), updatedData);
      await fetchCompanies();
      setIsEditModalOpen(false);
      setEditingCompany(null);
      resetForm();
    } catch (err) {
      console.error('Error updating company:', err);
      setError('Failed to update company');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      yearsExperience: company.yearsExperience.toString(),
      numberOfProjects: company.numberOfProjects.toString(),
      location: company.location,
      projectsLink: company.projectsLink,
      ownerName: company.ownerName,
      ownerPhone: company.ownerPhone.replace('+91', ''),
      subscriptionPlan: company.subscriptionPlan,
      subscriptionStartDate: company.subscriptionStartDate,
      password: company.password
    });
    if (company.projectImages) {
      setProjectImages(
        company.projectImages.map(url => ({
          preview: url,
          file: null
        }))
      );
    }
    setPreviewUrl(company.logo);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      yearsExperience: '',
      numberOfProjects: '',
      location: '',
      projectsLink: '',
      ownerName: '',
      ownerPhone: '',
      subscriptionPlan: '1M',
      subscriptionStartDate: '',
      password: ''
    });
    setLogoFile(null);
    setPreviewUrl(null);
    setProjectImages([]);
  };

  const handleUpdateSubscription = async (companyId: string, newPlan: string, newDate: string) => {
    try {
      await updateDoc(doc(db, 'companies', companyId), {
        subscriptionPlan: newPlan,
        subscriptionStartDate: newDate
      });
      await fetchCompanies();
    } catch (err) {
      console.error('Error updating subscription:', err);
      throw new Error('Failed to update subscription');
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Companies List</h2>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.size === companies.length}
                    onChange={toggleSelectAllCompanies}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </label>
                
                {selectedCompanies.size > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    disabled={deletingCompanies}
                    className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {deletingCompanies 
                      ? `Deleting ${selectedCompanies.size} companies...` 
                      : `Delete Selected (${selectedCompanies.size})`
                    }
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-6">
              {companies.map(company => {
                const subscription = calculateSubscriptionDetails(
                  company.subscriptionStartDate,
                  company.subscriptionPlan
                );

                return (
                  <div key={company.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedCompanies.has(company.id)}
                          onChange={() => {
                            const newSelected = new Set(selectedCompanies);
                            if (newSelected.has(company.id)) {
                              newSelected.delete(company.id);
                            } else {
                              newSelected.add(company.id);
                            }
                            setSelectedCompanies(newSelected);
                          }}
                          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                            <div>
                              <h3 className="font-semibold">{company.name}</h3>
                              <p className="text-sm text-gray-600">Owner: {company.ownerName}</p>
                              <p className="text-sm text-gray-600">Phone: {company.ownerPhone}</p>
                            </div>
                          </div>

                          {/* Subscription Details */}
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                Plan: {company.subscriptionPlan === '1Y' ? '1 Year' : `${company.subscriptionPlan.replace('M', ' Months')}`}
                              </span>
                              <span className="text-gray-600">
                                Expires: {subscription.endDate}
                              </span>
                            </div>
                            
                            <div className="relative pt-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-blue-600 font-semibold">
                                  {subscription.daysLeft} days left
                                </span>
                                <span className="text-gray-500">
                                  {Math.round(subscription.progress)}% used
                                </span>
                              </div>
                              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                <div
                                  style={{ width: `${subscription.progress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(company)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(company.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'addCompany':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Company</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
                  
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
                      Projects Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.projectsLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectsLink: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Owner Details & Subscription */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Owner Details & Subscription</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Owner Phone Number
                    </label>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center h-full px-3 py-2 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                          +91
                        </div>
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.ownerPhone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData(prev => ({ ...prev, ownerPhone: value }));
                        }}
                        pattern="\d{10}"
                        title="Please enter a valid 10-digit phone number"
                        placeholder="Enter 10-digit number"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subscription Plan
                    </label>
                    <select
                      required
                      value={formData.subscriptionPlan}
                      onChange={(e) => setFormData(prev => ({ ...prev, subscriptionPlan: e.target.value as Company['subscriptionPlan'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1M">1 Month</option>
                      <option value="3M">3 Months</option>
                      <option value="6M">6 Months</option>
                      <option value="1Y">1 Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subscription Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.subscriptionStartDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, subscriptionStartDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
                  </div>
                </div>
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
      case 'leads':
        return <LeadsView />;
      case 'expiring':
        return <ExpiringPlans 
          companies={companies} 
          onUpdateSubscription={handleUpdateSubscription}
        />;
      case 'createPage':
        return <CreatePage />;
      case 'leadDistribution':
        return <LeadDistribution />;
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
            <button
              onClick={() => setActiveView('leads')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'leads' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>View Leads</span>
            </button>
            <button
              onClick={() => setActiveView('expiring')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'expiring' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Expiring Plans</span>
            </button>
            <button
              onClick={() => setActiveView('createPage')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'createPage' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Layout className="w-5 h-5" />
              <span>Create Page</span>
            </button>
            <button
              onClick={() => setActiveView('leadDistribution')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeView === 'leadDistribution' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Layout className="w-5 h-5" />
              <span>Lead Distribution</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Company</h2>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCompany(null);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleEdit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Details */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
                    
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
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Projects Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.projectsLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectsLink: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Owner Details & Subscription */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Owner Details & Subscription</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ownerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Owner Phone Number
                      </label>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center h-full px-3 py-2 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                            +91
                          </div>
                        </div>
                        <input
                          type="tel"
                          required
                          value={formData.ownerPhone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData(prev => ({ ...prev, ownerPhone: value }));
                          }}
                          pattern="\d{10}"
                          title="Please enter a valid 10-digit phone number"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subscription Plan
                      </label>
                      <select
                        required
                        value={formData.subscriptionPlan}
                        onChange={(e) => setFormData(prev => ({ ...prev, subscriptionPlan: e.target.value as Company['subscriptionPlan'] }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1M">1 Month</option>
                        <option value="3M">3 Months</option>
                        <option value="6M">6 Months</option>
                        <option value="1Y">1 Year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subscription Start Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.subscriptionStartDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, subscriptionStartDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Leave blank to keep current password"
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {formData.password ? 'Minimum 6 characters' : 'Leave blank to keep current password'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <Upload className="w-5 h-5 mr-2" />
                      <span>Change Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
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

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingCompany(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}