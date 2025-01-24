import * as React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, Upload, X } from 'lucide-react';
import type { Lead } from '../types/index';

interface BulkLeadImportProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function BulkLeadImport({ onClose, onSuccess }: BulkLeadImportProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\\n');
        const headers = lines[0].split(',').map(h => h.trim());

        // Validate required columns
        const requiredColumns = ['name', 'phone', 'type'];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          setError(`Missing required columns: ${missingColumns.join(', ')}`);
          return;
        }

        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index];
          });
          return row;
        }).filter(row => row.name && row.phone && row.type);

        setPreview(parsedData.slice(0, 5));
        setError(null);
      } catch (err) {
        console.error('Error parsing CSV:', err);
        setError('Failed to parse CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\\n');
          const headers = lines[0].split(',').map(h => h.trim());
          
          const leads = lines.slice(1)
            .map(line => {
              const values = line.split(',').map(v => v.trim());
              const row: any = {};
              headers.forEach((header, index) => {
                row[header] = values[index];
              });
              return row;
            })
            .filter(row => row.name && row.phone && row.type)
            .map(row => ({
              name: row.name,
              phone: row.phone.startsWith('+91') ? row.phone : `+91${row.phone}`,
              type: row.type.toLowerCase() === 'consultation' ? 'consultation' as const : 'visit' as const,
              timestamp: new Date().toISOString(),
              contacted: false,
              status: 'pending' as const
            }));

          // Add leads in batches of 100
          const batchSize = 100;
          for (let i = 0; i < leads.length; i += batchSize) {
            const batch = leads.slice(i, i + batchSize);
            await Promise.all(
              batch.map(lead => 
                addDoc(collection(db, 'leads'), lead)
              )
            );
          }

          onSuccess();
          onClose();
        } catch (err) {
          console.error('Error importing leads:', err);
          setError('Failed to import leads. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('Error reading file:', err);
      setError('Failed to read file. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Import Leads</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".csv"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    CSV file with columns: name, phone, type (consultation/visit)
                  </p>
                </div>
              </div>
            </div>

            {file && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Selected File</h3>
                <p className="text-sm text-gray-500">{file.name}</p>
              </div>
            )}

            {preview.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview (First 5 Rows)</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        {Object.keys(preview[0]).map(header => (
                          <th 
                            key={header}
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {preview.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value: any, i) => (
                            <td key={i} className="px-4 py-2 text-sm text-gray-900">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!file || loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Importing...
                  </>
                ) : (
                  'Import Leads'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 