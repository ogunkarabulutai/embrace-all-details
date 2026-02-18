import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PopularDestinations from './components/PopularDestinations';
import FeaturedHotels from './components/FeaturedHotels';
import Campaigns from './components/Campaigns';
import EarlyBooking from './components/EarlyBooking';
import BlogSection from './components/BlogSection';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Checkout from './pages/Checkout';
import HotelSearchResults from './pages/HotelSearchResults';
import ServiceDetail from './pages/ServiceDetail';
import TourSearchResults from './pages/TourSearchResults';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onOpenAuth={openAuthModal} />
          
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <PopularDestinations />
                <FeaturedHotels />
                <Campaigns />
                <EarlyBooking />
                <BlogSection />
                <Reviews />
              </>
            } />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/hotel-results" element={<HotelSearchResults />} />
            <Route path="/tour-results" element={<TourSearchResults />} />
          </Routes>
          
          <Footer />
          <AuthModal 
            isOpen={authModal.isOpen} 
            onClose={closeAuthModal} 
            initialMode={authModal.mode}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
