import * as React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2 } from 'lucide-react';

interface ContactFormProps {
  onSubmit: () => void;
  type: 'consultation' | 'visit';
  companyId: string;
  companyName: string;
}

export function ContactForm({ onSubmit, type, companyId, companyName }: ContactFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: ''
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        phone: `+91${formData.phone}`,
        type,
        companyId,
        companyName,
        timestamp: new Date().toISOString(),
        status: 'new'
      });

      onSubmit();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Only allow digits and limit to 10 characters
    value = value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number
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
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Enter 10-digit number"
            pattern="\d{10}"
            title="Please enter a valid 10-digit mobile number"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">Enter 10-digit mobile number</p>
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? (
          <span className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting...
          </span>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}