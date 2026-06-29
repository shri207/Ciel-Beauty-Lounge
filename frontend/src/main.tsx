import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Admin imports
import AdminLayout from './components/admin/AdminLayout.tsx';
import Login from './components/admin/Login.tsx';
import Dashboard from './components/admin/Dashboard.tsx';
import Appointments from './components/admin/Appointments.tsx';
import ServicesAdmin from './components/admin/Services.tsx';
import PackagesAdmin from './components/admin/Packages.tsx';
import GalleryAdmin from './components/admin/Gallery.tsx';
import TestimonialsAdmin from './components/admin/Testimonials.tsx';
import SettingsAdmin from './components/admin/Settings.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="packages" element={<PackagesAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
