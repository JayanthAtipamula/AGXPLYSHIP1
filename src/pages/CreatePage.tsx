import * as React from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, Save, Check, Pencil, Link as LinkIcon, Trash2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo: string;
}

interface Page {
  id: string;
  pageId: string;
  companies: string[];
  createdAt: string;
}

export function CreatePage() {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = React.useState<Set<string>>(new Set());
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pageId, setPageId] = React.useState('');
  const [pages, setPages] = React.useState<Page[]>([]);
  const [editingPage, setEditingPage] = React.useState<Page | null>(null);

  React.useEffect(() => {
    fetchPages();
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'companies'));
      const companiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        logo: doc.data().logo
      }));
      setCompanies(companiesData);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const fetchPages = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'pages'));
      const pagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Page[];
      setPages(pagesData);
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError('Failed to load pages');
    }
  };

  const handleSave = async () => {
    if (!pageId.trim()) {
      setError('Please enter a page ID');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Check if pageId already exists
      const existingPageQuery = query(
        collection(db, 'pages'),
        where('pageId', '==', pageId.trim().toLowerCase())
      );
      const existingPageSnapshot = await getDocs(existingPageQuery);

      if (!editingPage && !existingPageSnapshot.empty) {
        setError('This page ID already exists');
        return;
      }

      const pageData = {
        pageId: pageId.trim().toLowerCase(),
        companies: Array.from(selectedCompanies),
        createdAt: new Date().toISOString()
      };

      console.log('Saving page data:', pageData); // Debug log

      if (editingPage) {
        await updateDoc(doc(db, 'pages', editingPage.id), pageData);
      } else {
        await addDoc(collection(db, 'pages'), pageData);
      }

      // Reset form
      setPageId('');
      setSelectedCompanies(new Set());
      setEditingPage(null);
      await fetchPages();
      alert(editingPage ? 'Page updated successfully!' : 'Page created successfully!');
    } catch (err) {
      console.error('Error saving page:', err);
      setError('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(companyId)) {
        next.delete(companyId);
      } else {
        next.add(companyId);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedCompanies.size === companies.length) {
      setSelectedCompanies(new Set());
    } else {
      setSelectedCompanies(new Set(companies.map(c => c.id)));
    }
  };

  const startEditing = (page: Page) => {
    setEditingPage(page);
    setPageId(page.pageId);
    setSelectedCompanies(new Set(page.companies));
  };

  const handleDelete = async (pageId: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'pages', pageId));
      await fetchPages();
    } catch (err) {
      console.error('Error deleting page:', err);
      setError('Failed to delete page');
    }
  };

  return (
    <div className="space-y-8">
      {/* Create/Edit Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingPage ? 'Edit Page' : 'Create Page'}
        </h2>

        <div className="space-y-6">
          {/* Page ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page ID
            </label>
            <input
              type="text"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              placeholder="Enter page ID (e.g., 'page1')"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              This ID will be used in the URL: /page/{pageId}
            </p>
          </div>

          {/* Companies Selection */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select Companies</h3>
              <button
                onClick={toggleAll}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {selectedCompanies.size === companies.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map(company => (
                  <div
                    key={company.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCompanies.has(company.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => toggleCompany(company.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {company.name}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {selectedCompanies.has(company.id) && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end space-x-3">
            {editingPage && (
              <button
                onClick={() => {
                  setEditingPage(null);
                  setPageId('');
                  setSelectedCompanies(new Set());
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel Edit
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving || selectedCompanies.size === 0 || !pageId.trim()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {saving ? 'Saving...' : editingPage ? 'Update Page' : 'Create Page'}
            </button>
          </div>
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Created Pages</h2>
        
        <div className="space-y-4">
          {pages.map(page => (
            <div 
              key={page.id}
              className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">/{page.pageId}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <LinkIcon className="w-4 h-4" />
                    <a 
                      href={`/page/${page.pageId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {window.location.origin}/page/{page.pageId}
                    </a>
                  </div>
                  <p className="text-sm text-gray-500">
                    {page.companies.length} companies • Created {new Date(page.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(page)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pages created yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 