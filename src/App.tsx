import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Policies from './components/Policies';
import Checkout from './pages/Checkout';

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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/checkout" element={<Checkout />} />
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
