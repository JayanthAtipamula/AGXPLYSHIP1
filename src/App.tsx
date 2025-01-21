import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AdminPanel } from './pages/AdminPanel';
import { OwnerLogin } from './pages/OwnerLogin';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { DynamicPage } from './pages/DynamicPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/owner-login" element={<OwnerLogin />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/page/:pageId" element={<DynamicPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}