/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import AppLayout from './components/layout/AppLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Directory from './pages/Directory';
import SinDetail from './pages/SinDetail';
import SosMode from './pages/SosMode';
import TaubatGuide from './pages/TaubatGuide';
import Journey from './pages/Journey';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import SubscriptionView from './pages/SubscriptionView';
import Doa from './pages/Doa';
import Dzikir from './pages/Dzikir';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CMSView from './pages/admin/CMSView';
import UserManagementView from './pages/admin/UserManagementView';
import ConfettiCelebration from './components/ui/Confetti';

export default function App() {
  const { theme } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <HashRouter>
      <ConfettiCelebration />
      <Routes>
        {/* Landing & Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sos" element={<SosMode />} />
        <Route path="/taubat" element={<TaubatGuide />} />

        {/* Admin Console Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN', 'CONTENT_ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="cms" element={<CMSView />} />
          <Route path="users" element={<UserManagementView />} />
          <Route path="settings" element={<div className="p-8">Platform Settings (Coming Soon)</div>} />
        </Route>

        {/* User Application Routes */}
        <Route element={<AppLayout />}>
          <Route path="/app" element={<Home />} />
          <Route path="/beranda" element={<Home />} />
          <Route path="/direktori" element={<Directory />} />
          <Route path="/dosa/:id" element={<SinDetail />} />
          <Route path="/perjalanan" element={<Journey />} />
          <Route path="/jurnal" element={<Journal />} />
          <Route path="/doa" element={<Doa />} />
          <Route path="/dzikir" element={<Dzikir />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/premium" element={<SubscriptionView />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
