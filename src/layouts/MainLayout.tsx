import { Outlet } from 'react-router-dom';
import { BackToTop } from '../components/common/BackToTop';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { WhatsAppButton } from '../components/layout/WhatsAppButton';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <ScrollToTop />
    </div>
  );
}
