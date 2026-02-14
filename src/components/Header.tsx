import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Moon, Sun, Menu, X, HelpCircle, User, Phone, MessageCircle, Settings, Info, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onOpenAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                {/* Light mode logo (black) */}
                <img 
                  src="/travele-logo.png" 
                  alt="TourAgent Logo" 
                  className="h-12 w-auto object-contain block dark:hidden"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                />
                {/* Dark mode logo (white) */}
                <img 
                  src="/travele-logo-white.png" 
                  alt="TourAgent Logo" 
                  className="h-12 w-auto object-contain hidden dark:block"
                />
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Services Button */}
            <Link 
              to="/services"
              className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline">{t('header.services')}</span>
            </Link>

            {/* About Us Button */}
            <Link 
              to="/about"
              data-testid="about-us-link"
              className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Info className="w-5 h-5" />
              <span className="hidden md:inline">Haqqımızda</span>
            </Link>

            {/* Help Button */}
            <div className="relative">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden md:inline">{t('header.help')}</span>
              </button>
              
              {showHelp && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t('header.contact')}</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+994124411262"
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <Phone className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">+994 12 441 12 62</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{t('header.customerService')}</div>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/994502424269"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{t('header.whatsapp')}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">+994 50 242 42 69</div>
                      </div>
                    </a>
                    <a
                      href="mailto:info@touragent.az"
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">info@touragent.az</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">E-poçt</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Account Button */}
            <div className="relative">
              <button
                onClick={() => setShowAccount(!showAccount)}
                className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Hesabım</span>
              </button>
              
              {showAccount && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50">
                  <button
                    onClick={() => {
                      setShowAccount(false);
                      onOpenAuth('login');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white"
                  >
                    Daxil ol
                  </button>
                  <button
                    onClick={() => {
                      setShowAccount(false);
                      onOpenAuth('register');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white"
                  >
                    Qeydiyyat
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Nereye gitmek istiyorsunuz?"
                className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none flex-1"
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1 flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tarih"
                  className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none flex-1"
                />
              </div>
              
              <div className="flex-1 flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                <Users className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Misafir"
                  className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none flex-1"
                />
              </div>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Ara</span>
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showHelp || showAccount) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowHelp(false);
            setShowAccount(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;