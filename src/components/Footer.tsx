import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Plyship</h3>
            <p className="text-gray-400">Find Your Perfect Interior Solutions</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> contact@plyship.com</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 123-456-7890</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Plyship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}