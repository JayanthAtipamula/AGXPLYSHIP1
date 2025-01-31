import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';
import { AdminLogin } from './pages/AdminLogin';
import { OwnerLogin } from './pages/OwnerLogin';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { DynamicPage } from './pages/DynamicPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && !isLandingPage && <Header />}
      <main className={`flex-grow ${!isAdminRoute && !isLandingPage ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/page/:pageId" element={<DynamicPage />} />
        </Routes>
      </main>
      {!isAdminRoute && !isLandingPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}