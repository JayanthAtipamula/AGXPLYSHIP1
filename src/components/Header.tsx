import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Menu, X, Settings } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Plyship</span>
            </Link>
          </div>

          {/* Mobile view */}
          <div className="flex items-center md:hidden">
            <div className="flex items-center mr-4">
              <MapPin className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-gray-700">Hyderabad</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop view */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600 flex items-center">
              <Settings className="w-4 h-4 mr-1" />
              Admin
            </Link>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Hyderabad</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white/70 backdrop-blur-md">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}