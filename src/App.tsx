import React, {useEffect, useMemo, useState} from 'react';
import BackgroundShader from './components/BackgroundShader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DocsPage from './components/DocsPage';
import ContactPage from './components/ContactPage';
import DemoPage from './components/DemoPage';
import FooterBar from './components/FooterBar';
import SuccessModal from './components/SuccessModal';
import Dashboard from './pages/Dashboard';

type Page = 'home' | 'docs' | 'contact' | 'demo' | 'dashboard';

export default function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const triggerSuccess = (message?: string) => {
    if (message) setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
    if (path === 'dashboard' || path.startsWith('dashboard/') || hash === 'dashboard') return 'dashboard';
    if (hash === 'docs' || hash === 'contact' || hash === 'demo') return hash;
    return 'home';
  };

  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, []);

  const activeItem = useMemo(() => {
    if (page === 'docs') return 'Docs';
    if (page === 'contact') return 'Contact';
    if (page === 'demo') return 'Demo';
    return 'Home';
  }, [page]);

  const navigateTo = (nextPage: 'home' | 'docs' | 'contact' | 'demo') => {
    if (page === 'dashboard' && window.location.pathname === '/dashboard') {
      window.history.pushState(null, '', `/#${nextPage === 'home' ? 'home' : nextPage}`);
      setPage(nextPage);
      return;
    }

    window.location.hash = nextPage === 'home' ? 'home' : nextPage;
    setPage(nextPage);
  };

  const currentPage = useMemo(() => {
    if (page === 'dashboard') return <Dashboard />;
    if (page === 'docs') return <DocsPage />;
    if (page === 'contact') return <ContactPage onSuccess={triggerSuccess} />;
    if (page === 'demo') return <DemoPage onSuccess={triggerSuccess} />;
    return <Hero onSuccess={triggerSuccess} />;
  }, [page, triggerSuccess]);

  return (
    <div className="hero-atmosphere relative flex min-h-[100svh] w-full flex-col overflow-x-hidden font-sans text-white">
      <BackgroundShader />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-70"></div>
      <div className="hero-glow hero-glow-top absolute inset-x-0 top-0 h-64 sm:h-72 md:h-80"></div>
      <div className="hero-glow hero-glow-bottom absolute left-1/2 top-[62%] h-[260px] w-[260px] -translate-x-1/2 sm:top-[60%] sm:h-[320px] sm:w-[320px] md:top-[58%] md:h-[380px] md:w-[380px]"></div>
      {page !== 'dashboard' ? <Navbar activeItem={activeItem} onNavigate={navigateTo} /> : null}
      <main className="relative z-10 flex w-full flex-1 flex-col items-center">
        {currentPage}
      </main>
      {page !== 'dashboard' ? (
        <div className="relative z-10">
          <FooterBar />
        </div>
      ) : null}

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        message={successMessage}
      />
    </div>
  );
}
