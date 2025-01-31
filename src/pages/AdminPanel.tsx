import * as React from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, getCountFromServer, updateDoc, query, where, writeBatch, orderBy, limit, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Loader2, Trash2, Upload, LayoutDashboard, Building, UserPlus, Users, X, Calendar, Edit, AlertTriangle, Eye, EyeOff, Layout, LogOut } from 'lucide-react';
import { LeadsView } from '../components/LeadsView';
import { ExpiringPlans } from '../components/ExpiringPlans';
import { CreatePage } from './CreatePage';
import { LeadDistribution } from '../components/LeadDistribution';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { DistributedDataView } from '../components/DistributedDataView';

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

interface Lead {
  id: string;
  type: 'consultation' | 'visit';
  status: 'active' | 'archived' | 'new';
  companyId: string | null;
  distributedAt?: string;
  previousCompanyIds?: string[];
  rotationCount?: number;
}

interface DistributionResults {
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

interface DistributionHistory {
  id: string;
  timestamp: string;
  rotatedLeads: number;
  archivedLeads: number;
  activeCompanies: number;
  distributionSummary: Record<string, {
    newLeads: number;
    consultationLeads: number;
    visitLeads: number;
  }>;
  rotationSummary: Record<string, {
    rotatedLeads: number;
    consultationLeads: number;
    visitLeads: number;
  }>;
  settings: {
    rotationPeriod: number;
    cycleDays: number;
  };
}

type ActiveView = 'dashboard' | 'companies' | 'addCompany' | 'leads' | 'expiring' | 'createPage' | 'leadDistribution';

interface ProjectImage {
  file: File;
  preview: string;
}

interface Settings {
  rotation_period: number;  // n days - how many days back to look for leads to rotate
  cycle_days: number;      // N days - total rotation cycle before archiving
}

interface CompanyLeadCount {
  total: number;
  consultation: number;
  visit: number;
}

interface CompanyDistribution {
  [companyId: string]: CompanyLeadCount;
}

interface DistributionSummaryData {
    newLeads: number;
    consultationLeads: number;
    visitLeads: number;
  totalLeads?: number;
}

interface DistributionSummary {
  [company: string]: DistributionSummaryData;
}

interface DistributionSummary {
  newLeads: number;
  consultationLeads: number;
  visitLeads: number;
  rotatedLeads: number;
}

interface RotationSummary {
  rotatedLeads: number;
  consultationLeads: number;
  visitLeads: number;
}

function AdminPanel() {
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
  const [showDistributionModal, setShowDistributionModal] = React.useState(false);
  const [distributionResults, setDistributionResults] = React.useState<DistributionResults | null>(null);
  const [distributionOptions, setDistributionOptions] = React.useState({
    distributeToday: true,
    distributeYesterday: true
  });
  const [todayLeadsCount, setTodayLeadsCount] = React.useState(0);
  const [yesterdayLeadsCount, setYesterdayLeadsCount] = React.useState(0);
  const [companyLeadCounts, setCompanyLeadCounts] = React.useState<CompanyDistribution>({});
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const [distributionHistory, setDistributionHistory] = React.useState<DistributionHistory[]>([]);
  const [rotationPeriod, setRotationPeriod] = React.useState(2);
  const [cycleDays, setCycleDays] = React.useState(10);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [savingSettings, setSavingSettings] = React.useState(false);
  const navigate = useNavigate();
  // Add new state for selected history items
  const [selectedHistory, setSelectedHistory] = React.useState<Set<string>>(new Set());
  const [deletingHistory, setDeletingHistory] = React.useState(false);
  // Add new state for company distribution modal
  const [showCompanyDistributionModal, setShowCompanyDistributionModal] = React.useState(false);
  const [totalLeadsCount, setTotalLeadsCount] = React.useState(0);

  React.useEffect(() => {
    fetchData();
    // Set up an interval to refresh the counts every minute
    const interval = setInterval(fetchLeadsCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCompanies(), fetchLeadsCount(), fetchLeadCounts(), fetchSettings()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadsCount = async () => {
    try {
      // Get today's date range
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Get previous n days date
      const nDaysAgo = new Date(today);
      nDaysAgo.setDate(nDaysAgo.getDate() - rotationPeriod);

      // Query for today's undistributed leads
      const leadsRef = collection(db, 'leads');
      const todayQuery = query(
        leadsRef,
        where('timestamp', '>=', today.toISOString()),
        where('timestamp', '<', tomorrow.toISOString()),
        where('companyId', '==', null)
      );
      const todaySnapshot = await getCountFromServer(todayQuery);
      setTodayLeadsCount(todaySnapshot.data().count);

      // Query for previous n days leads
      const previousDaysQuery = query(
        leadsRef,
        where('timestamp', '>=', nDaysAgo.toISOString()),
        where('timestamp', '<', today.toISOString()),
        where('status', '==', 'active')
      );
      const previousDaysSnapshot = await getCountFromServer(previousDaysQuery);
      setYesterdayLeadsCount(previousDaysSnapshot.data().count);

      // Get total leads count
      const totalSnapshot = await getCountFromServer(collection(db, 'leads'));
      setLeadsCount(totalSnapshot.data().count);
    } catch (err) {
      console.error('Error fetching leads count:', err);
    }
  };

  const fetchLeadCounts = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const leadsRef = collection(db, 'leads');
      const todayQuery = query(leadsRef, where('timestamp', '>=', today.toISOString()));
      const todaySnapshot = await getDocs(todayQuery);
      setTodayLeadsCount(todaySnapshot.size);

      const allLeadsSnapshot = await getDocs(leadsRef);
      setTotalLeadsCount(allLeadsSnapshot.size);
    } catch (err) {
      console.error('Error fetching lead counts:', err);
    }
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
        name: formData.name,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        numberOfProjects: formData.numberOfProjects ? parseInt(formData.numberOfProjects) : 'Not Available',
        location: formData.location,
        ownerName: formData.ownerName,
        ownerPhone: `+91${formData.ownerPhone}`,
        projectsLink: formData.projectsLink.trim() || '',
        subscriptionPlan: formData.subscriptionPlan as '1M' | '3M' | '6M' | '1Y',
        subscriptionStartDate: formData.subscriptionStartDate,
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
    
    // Create dummy File objects for existing images
    if (company.projectImages) {
      const projectImageObjects: ProjectImage[] = company.projectImages.map(url => ({
        preview: url,
        file: new File([], 'placeholder', { type: 'image/jpeg' })
      }));
      setProjectImages(projectImageObjects);
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

  const fetchDistributionHistory = async () => {
    try {
      const historyQuery = query(
        collection(db, 'distributionHistory'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(historyQuery);
      const history = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DistributionHistory[];
      setDistributionHistory(history);
    } catch (err) {
      console.error('Error fetching distribution history:', err);
    }
  };

  const handleDistributeLeads = async () => {
    try {
      setLoading(true);
      const batch = writeBatch(db);
      
      // Get active companies
      const activeCompanies = companies.filter(company => {
        const subscription = calculateSubscriptionDetails(
          company.subscriptionStartDate,
          company.subscriptionPlan
        );
        return subscription.daysLeft > 0;
      });

      if (activeCompanies.length === 0) {
        throw new Error('No active companies available for distribution');
      }

      // Get today's undistributed leads
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayLeadsQuery = query(
        collection(db, 'leads'),
        where('timestamp', '>=', today.toISOString()),
        where('timestamp', '<', tomorrow.toISOString()),
        where('companyId', '==', null)
      );
      const todayLeadsSnapshot = await getDocs(todayLeadsQuery);
      const todayLeads = todayLeadsSnapshot.docs;

      // Get leads to rotate (from previous n days)
      const nDaysAgo = new Date(today);
      nDaysAgo.setDate(nDaysAgo.getDate() - rotationPeriod);
      
      const rotateLeadsQuery = query(
        collection(db, 'leads'),
        where('timestamp', '>=', nDaysAgo.toISOString()),
        where('timestamp', '<', today.toISOString()),
        where('status', '==', 'active')
      );
      const rotateLeadsSnapshot = await getDocs(rotateLeadsQuery);
      const leadsToRotate = rotateLeadsSnapshot.docs;

      // Initialize distribution summary
      const distributionSummary = {
        totalLeads: todayLeads.length,
        newLeads: todayLeads.length,
        consultationLeads: todayLeads.filter(doc => (doc.data() as Lead).type === 'consultation').length,
        visitLeads: todayLeads.filter(doc => (doc.data() as Lead).type === 'visit').length
      };

      const companyDistribution: Record<string, {
        newLeads: number;
        consultationLeads: number;
        visitLeads: number;
      }> = {};
      
      const rotationSummary: Record<string, {
        rotatedLeads: number;
        consultationLeads: number;
        visitLeads: number;
      }> = {};

      // Initialize summaries for each company
      activeCompanies.forEach(company => {
        companyDistribution[company.name] = {
          newLeads: 0,
          consultationLeads: 0,
          visitLeads: 0
        };
        rotationSummary[company.name] = {
          rotatedLeads: 0,
          consultationLeads: 0,
          visitLeads: 0
        };
      });

      // Distribute today's leads
      let companyIndex = 0;
      todayLeads.forEach(doc => {
        const lead = doc.data() as Lead;
        const company = activeCompanies[companyIndex];
        
        batch.update(doc.ref, {
          companyId: company.id,
          distributedAt: new Date().toISOString(),
          status: 'active',
          previousCompanyIds: [company.id],
          rotationCount: 0
        });

        companyDistribution[company.name].newLeads++;
        if (lead.type === 'consultation') {
          companyDistribution[company.name].consultationLeads++;
        } else {
          companyDistribution[company.name].visitLeads++;
        }

        companyIndex = (companyIndex + 1) % activeCompanies.length;
      });

      // Rotate previous leads
      let rotationIndex = 0;
      leadsToRotate.forEach(doc => {
        const lead = doc.data() as Lead;
        const previousCompanyIds = lead.previousCompanyIds || [];
        
        // Find eligible companies (companies that haven't received this lead before)
        const eligibleCompanies = activeCompanies.filter(company => 
          !previousCompanyIds.includes(company.id)
        );

        if (eligibleCompanies.length > 0) {
          // Rotate to next company using round-robin
          const nextCompany = eligibleCompanies[rotationIndex % eligibleCompanies.length];
          rotationIndex++;
          
          batch.update(doc.ref, {
            companyId: nextCompany.id,
            distributedAt: new Date().toISOString(),
            previousCompanyIds: arrayUnion(nextCompany.id),
            rotationCount: (lead.rotationCount || 0) + 1
          });

          rotationSummary[nextCompany.name].rotatedLeads++;
          if (lead.type === 'consultation') {
            rotationSummary[nextCompany.name].consultationLeads++;
          } else {
            rotationSummary[nextCompany.name].visitLeads++;
          }
        } else {
          // Archive lead if no eligible companies left
          batch.update(doc.ref, {
            status: 'archived',
            companyId: null
          });
        }
      });

      // Commit all changes
      await batch.commit();

      // Save distribution history
      const historyRef = doc(collection(db, 'distributionHistory'));
      await setDoc(historyRef, {
        id: historyRef.id,
        timestamp: new Date().toISOString(),
        rotatedLeads: leadsToRotate.length,
        archivedLeads: leadsToRotate.filter(doc => {
          const lead = doc.data() as Lead;
          const previousCompanyIds = lead.previousCompanyIds || [];
          return previousCompanyIds.length >= activeCompanies.length;
        }).length,
        activeCompanies: activeCompanies.length,
        distributionSummary: companyDistribution,
        rotationSummary,
        settings: {
          rotationPeriod,
          cycleDays
        }
      });

      // Update UI
      const results: DistributionResults = {
        todayLeads: todayLeads.length,
        rotatedLeads: leadsToRotate.length,
        expiredLeads: leadsToRotate.filter(doc => {
          const lead = doc.data() as Lead;
          const previousCompanyIds = lead.previousCompanyIds || [];
          return previousCompanyIds.length >= activeCompanies.length;
        }).length,
        activeCompanies: activeCompanies.length,
        distributionSummary: companyDistribution,
        rotationSummary
      };

      // Add rotatedLeads count to distribution summary
      for (const [companyId, summary] of Object.entries(distributionSummary)) {
        results.distributionSummary[companyId] = {
          ...summary,
          rotatedLeads: 0  // Initialize with 0 if not present
        };
      }

      // Update rotation summary
      results.rotationSummary = rotationSummary;

      setDistributionResults(results);
      setShowDistributionModal(true);
      
      // Refresh data
      await fetchData();
    } catch (err) {
      console.error('Error distributing leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to distribute leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateFakeCompany = (index: number): Omit<Company, 'id'> => {
    const plans: Company['subscriptionPlan'][] = ['1M', '3M', '6M', '1Y'];
    const today = new Date();
    return {
      name: `Test Company ${index}`,
      logo: 'https://via.placeholder.com/150',
      yearsExperience: Math.floor(Math.random() * 20) + 1,
      numberOfProjects: Math.floor(Math.random() * 100),
      location: `City ${index}`,
      projectsLink: 'https://example.com',
      ownerName: `Owner ${index}`,
      ownerPhone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      subscriptionPlan: plans[Math.floor(Math.random() * plans.length)],
      subscriptionStartDate: today.toISOString().split('T')[0],
      projectImages: [],
      password: 'test123'
    };
  };

  const generateFakeLead = () => {
    const types: Lead['type'][] = ['consultation', 'visit'];
    
    // Generate a random date from the last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Get random timestamp between 7 days ago and now
    const randomTimestamp = new Date(
      sevenDaysAgo.getTime() + Math.random() * (now.getTime() - sevenDaysAgo.getTime())
    );
    
    return {
      name: `Lead ${Math.floor(Math.random() * 1000)}`,
      phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      type: types[Math.floor(Math.random() * types.length)],
      timestamp: randomTimestamp.toISOString(),
      status: 'new',
      companyId: null
    };
  };

  const handleAddFakeData = async (type: 'companies' | 'leads', quantity: number) => {
    try {
      setLoading(true);
      const batch = writeBatch(db);

      if (type === 'companies') {
        for (let i = 0; i < quantity; i++) {
          const companyData = generateFakeCompany(companies.length + i + 1);
          const newCompanyRef = doc(collection(db, 'companies'));
          batch.set(newCompanyRef, companyData);
        }
      } else {
        for (let i = 0; i < quantity; i++) {
          const leadData = generateFakeLead();
          const newLeadRef = doc(collection(db, 'leads'));
          batch.set(newLeadRef, leadData);
        }
      }

      await batch.commit();
      await fetchData();
      alert(`Successfully added ${quantity} fake ${type}`);
    } catch (err) {
      console.error(`Error adding fake ${type}:`, err);
      setError(`Failed to add fake ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAdmin');
      navigate('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const settingsRef = doc(db, 'settings', 'distribution');
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        const settings = settingsSnap.data() as Settings;
        setRotationPeriod(settings.rotation_period);
        setCycleDays(settings.cycle_days);
      } else {
        // Create default settings if they don't exist
        await setDoc(settingsRef, { 
          rotation_period: 2,
          cycle_days: 10
        });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const updateSettings = async (period: number, cycle: number) => {
    try {
      setSavingSettings(true);
      const settingsRef = doc(db, 'settings', 'distribution');
      await updateDoc(settingsRef, { 
        rotation_period: period,
        cycle_days: cycle
      });
      setRotationPeriod(period);
      setCycleDays(cycle);
      setIsSettingsModalOpen(false);
      // Refresh data to ensure everything is in sync
      await fetchData();
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings');
    } finally {
      setSavingSettings(false);
    }
  };

  // Add function to handle history deletion
  const handleDeleteHistory = async () => {
    try {
      setDeletingHistory(true);
      const batch = writeBatch(db);
      
      selectedHistory.forEach((id) => {
        const historyRef = doc(db, 'distributionHistory', id);
        batch.delete(historyRef);
      });
      
      await batch.commit();
      await fetchDistributionHistory();
      setSelectedHistory(new Set());
    } catch (err) {
      console.error('Error deleting history:', err);
      setError('Failed to delete history items');
    } finally {
      setDeletingHistory(false);
    }
  };

  // Add function to toggle all history selection
  const toggleSelectAllHistory = () => {
    if (selectedHistory.size === distributionHistory.length) {
      setSelectedHistory(new Set());
    } else {
      setSelectedHistory(new Set(distributionHistory.map(record => record.id)));
    }
  };

  const CompanyDistributionModal = () => {
    if (!showCompanyDistributionModal) return null;

    const activeCompanies = companies.filter(company => {
      const subscription = calculateSubscriptionDetails(
        company.subscriptionStartDate,
        company.subscriptionPlan
      );
      return subscription.daysLeft > 0;
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Company Lead Distribution</h3>
            <button
              onClick={() => setShowCompanyDistributionModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {activeCompanies.map(company => (
                <div key={company.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                      <div>
                        <h4 className="font-medium">{company.name}</h4>
                        <p className="text-sm text-gray-600">
                        {calculateSubscriptionDetails(
                          company.subscriptionStartDate,
                          company.subscriptionPlan
                        ).daysLeft} days left
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        {companyLeadCounts[company.id]?.total || 0}
                      </p>
                      <p className="text-sm text-gray-600">Active Leads</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Today's Leads</h3>
          <div className="mt-2 flex items-center">
            <div className="text-3xl font-bold text-blue-600">
              {todayLeadsCount}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Active Companies</h3>
          <div className="mt-2 flex items-center">
            <div className="text-3xl font-bold text-blue-600">
              {companies.filter(company => {
                const subscription = calculateSubscriptionDetails(
                  company.subscriptionStartDate,
                  company.subscriptionPlan
                );
                return subscription.daysLeft > 0;
              }).length}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Total Leads</h3>
          <div className="mt-2 flex items-center">
            <div className="text-3xl font-bold text-blue-600">
              {totalLeadsCount}
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Button */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Lead Distribution</h3>
            <p className="text-sm text-gray-600 mt-1">Distribute new leads to active companies</p>
          </div>
          <button
            onClick={handleDistributeLeads}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Users className="w-5 h-5" />
                <span>Distribute Leads</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Distribution Results */}
      {distributionResults && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Latest Distribution Results</h3>
          <DistributedDataView distributionResults={distributionResults} />
        </div>
      )}

      {/* Test Data Generation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Test Data Generation</h3>
            <p className="text-sm text-gray-600">Generate fake data for testing purposes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Add Fake Companies</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Number of companies"
                  className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const value = Math.min(50, Math.max(1, parseInt(e.target.value) || 0));
                    e.target.value = value.toString();
                  }}
                  id="companyCount"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('companyCount') as HTMLInputElement;
                    const count = parseInt(input.value);
                    if (count > 0) {
                      handleAddFakeData('companies', count);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                >
                  Add Companies
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddFakeData('companies', 5)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  Quick Add 5
                </button>
                <button
                  onClick={() => handleAddFakeData('companies', 10)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  Quick Add 10
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Add Fake Leads</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Number of leads"
                  className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const value = Math.min(100, Math.max(1, parseInt(e.target.value) || 0));
                    e.target.value = value.toString();
                  }}
                  id="leadCount"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('leadCount') as HTMLInputElement;
                    const count = parseInt(input.value);
                    if (count > 0) {
                      handleAddFakeData('leads', count);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                >
                  Add Leads
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddFakeData('leads', 20)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                >
                  Quick Add 20
                </button>
                <button
                  onClick={() => handleAddFakeData('leads', 50)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                >
                  Quick Add 50
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Active Companies</h3>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {companies.filter(company => {
              const subscription = calculateSubscriptionDetails(
                company.subscriptionStartDate,
                company.subscriptionPlan
              );
              return subscription.daysLeft > 0;
            }).length}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Companies ready for distribution</p>
            <button
              onClick={() => setShowCompanyDistributionModal(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Distribution
            </button>
          </div>
        </div>

        {/* Today's Leads Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Today's Leads</h3>
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {Number(todayLeadsCount) || 0}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">New leads waiting for distribution</p>
            <p className="text-sm text-blue-600 mt-1">
              Total: {Number(todayLeadsCount || 0) + Number(yesterdayLeadsCount || 0)} leads 
              (Today + Previous {rotationPeriod} days)
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Yesterday's Leads</h3>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {yesterdayLeadsCount}
          </div>
          <p className="text-sm text-gray-600">Leads ready for rotation</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10 overflow-y-auto">
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen bg-gray-50 p-8">
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

      {showDistributionModal && distributionResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Lead Distribution Summary</h2>
                <button
                  onClick={() => setShowDistributionModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Total Leads</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {typeof distributionResults.distributionSummary === 'object' 
                        ? Object.values(distributionResults.distributionSummary).reduce((sum, data) => sum + (data.newLeads || 0), 0)
                        : 0}
                    </p>
                    <p className="text-sm text-blue-600">leads processed</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-800 mb-2">Rotated Leads</h3>
                    <p className="text-2xl font-bold text-green-600">{distributionResults.rotatedLeads}</p>
                    <p className="text-sm text-green-600">leads rotated</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-red-800 mb-2">Expired</h3>
                    <p className="text-2xl font-bold text-red-600">{distributionResults.expiredLeads}</p>
                    <p className="text-sm text-red-600">leads expired</p>
                  </div>
                </div>

                {/* Detailed Distribution Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Leads</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Leads</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultations</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rotated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(distributionResults.distributionSummary).map(([company, data]) => {
                        const rotationData = distributionResults.rotationSummary[company] || {
                          rotatedLeads: 0,
                          consultationLeads: 0,
                          visitLeads: 0
                        };
                        const previousLeads = (companyLeadCounts[company] as CompanyLeadCount)?.total || 0;
                        const totalLeads = previousLeads + (data?.newLeads || 0) + (rotationData?.rotatedLeads || 0);
                        
                        return (
                          <tr key={company}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{previousLeads}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-green-600">+{data?.newLeads || 0}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {(data?.consultationLeads || 0) + (rotationData?.consultationLeads || 0)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {(data?.visitLeads || 0) + (rotationData?.visitLeads || 0)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-blue-600">+{rotationData?.rotatedLeads || 0}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{totalLeads}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowDistributionModal(false)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Lead Distribution History</h2>
                <div className="flex items-center space-x-2">
                  {selectedHistory.size > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${selectedHistory.size} history items?`)) {
                          handleDeleteHistory();
                        }
                      }}
                      disabled={deletingHistory}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deletingHistory 
                        ? `Deleting ${selectedHistory.size} items...` 
                        : `Delete Selected (${selectedHistory.size})`
                      }
                    </button>
                  )}
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
                </div>
              </div>

              <div className="space-y-6">
                {distributionHistory.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedHistory.has(record.id)}
                          onChange={() => {
                            const newSelected = new Set(selectedHistory);
                            if (newSelected.has(record.id)) {
                              newSelected.delete(record.id);
                            } else {
                              newSelected.add(record.id);
                            }
                            setSelectedHistory(newSelected);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      <h3 className="font-medium text-gray-900">
                        Distribution on {new Date(record.timestamp).toLocaleString()}
                      </h3>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-blue-600">
                          {calculateTotalNewLeads(record.distributionSummary)} new leads
                        </span>
                        <span className="text-green-600">{record.rotatedLeads} rotated</span>
                        <span className="text-red-600">{record.archivedLeads} expired</span>
                      </div>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Company</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">New Leads</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Consultations</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Visits</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Rotated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(record.distributionSummary).map(([company, data]) => (
                          <tr key={company}>
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">{company}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{data.newLeads}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{data.consultationLeads}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{data.visitLeads}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              {record.rotationSummary[company]?.rotatedLeads || 0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

                {distributionHistory.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No distribution history found
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedHistory.size === distributionHistory.length}
                    onChange={toggleSelectAllHistory}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </label>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Distribution Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rotation Period (n days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={rotationPeriod}
                    onChange={(e) => setRotationPeriod(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Rotate leads from previous n days
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cycle Length (N days)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={cycleDays}
                    onChange={(e) => setCycleDays(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Total days to keep rotating leads before archiving
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateSettings(rotationPeriod, cycleDays)}
                  disabled={savingSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingSettings ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Distribution Modal */}
      {showCompanyDistributionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Company Lead Distribution</h3>
              <button
                onClick={() => setShowCompanyDistributionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {companies.filter(company => {
                const subscription = calculateSubscriptionDetails(
                  company.subscriptionStartDate,
                  company.subscriptionPlan
                );
                return subscription.daysLeft > 0;
              }).map(company => (
                <div key={company.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                      <div>
                        <h4 className="font-medium">{company.name}</h4>
                        <p className="text-sm text-gray-600">
                          {calculateSubscriptionDetails(
                            company.subscriptionStartDate,
                            company.subscriptionPlan
                          ).daysLeft} days left
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        {companyLeadCounts[company.id]?.total || 0}
                      </p>
                      <p className="text-sm text-gray-600">Active Leads</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <CompanyDistributionModal />
    </div>
  );
}

const calculateTotalNewLeads = (summary: DistributionSummary): number => {
  return Object.values(summary).reduce((sum, data) => sum + (data.newLeads || 0), 0);
};

export default AdminPanel;