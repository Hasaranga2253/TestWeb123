import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AboutPage } from '../pages/AboutPage';

import { ContactPage } from '../pages/ContactPage';
import HomePage from '../pages/HomePage';

import { NotFoundPage } from '../pages/NotFoundPage';

import { ProgrammeDetailsPage } from '../pages/ProgrammeDetailsPage';
import { ProgrammesPage } from '../pages/ProgrammesPage';


export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/programmes/:programmeSlug" element={<ProgrammeDetailsPage />} />
        
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
