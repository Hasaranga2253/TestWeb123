import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

const AboutPage = lazy(() =>
  import('../pages/AboutPage').then((module) => ({ default: module.AboutPage })),
);
const ContactPage = lazy(() =>
  import('../pages/ContactPage').then((module) => ({ default: module.ContactPage })),
);
const HomePage = lazy(() => import('../pages/HomePage'));
const NewsUpdatesPage = lazy(() =>
  import('../pages/NewsUpdatesPage').then((module) => ({ default: module.NewsUpdatesPage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const ProgrammeDetailsPage = lazy(() =>
  import('../pages/ProgrammeDetailsPage').then((module) => ({
    default: module.ProgrammeDetailsPage,
  })),
);
const ProgrammesPage = lazy(() =>
  import('../pages/ProgrammesPage').then((module) => ({ default: module.ProgrammesPage })),
);

function PageFallback() {
  return <div className="min-h-[50vh] bg-white" aria-label="Loading page" />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news-updates" element={<NewsUpdatesPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/:programmeSlug" element={<ProgrammeDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
