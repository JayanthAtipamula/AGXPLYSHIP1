import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ownerData = localStorage.getItem('ownerCompany');

  const isOwnerLoggedIn = !!ownerData;
  const ownerName = isOwnerLoggedIn ? JSON.parse(ownerData).name : '';

  const handleLogout = () => {
    localStorage.removeItem('ownerCompany');
    if (location.pathname === '/owner-dashboard') {
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            PLYSHIP
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Home
            </Link>
            {isOwnerLoggedIn ? (
              <>
                <Link
                  to="/owner-dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                    {ownerName}
                  </button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/owner-login"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isOwnerLoggedIn ? (
              <>
                <Link
                  to="/owner-dashboard"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="px-3 py-2 text-sm font-medium text-gray-600">
                    {ownerName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/owner-login"
                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}