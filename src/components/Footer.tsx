import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="text-gray-400 mb-8">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-full transition-colors duration-200 flex items-center">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TourAgent</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              15 ildir sizə ən gözəl tətil təcrübələrini sunmaqdan qürur duyuruq. 
              Xəyalınızdakı tətil sadəcə bir klik uzağınızdadır.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Sürətli Bağlantılar</h4>
            <ul className="space-y-3">
              {[
                'Otellər',
                'Təyyarə Bileti', 
                'Maşın İcarəsi',
                'Aktivitələr',
                'Tur Paketləri',
                'Son Dəqiqə Fürsətləri'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Populyar İstiqamətlər</h4>
            <ul className="space-y-3">
              {[
                'Antalya Otelləri',
                'İstanbul Otelləri',
                'Bodrum Otelləri', 
                'Kapadokya Otelləri',
                'Çeşme Otelləri',
                'Marmaris Otelləri'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Əlaqə</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">+994 12 441 12 62</p>
                  <p className="text-sm text-gray-400">7/24 Müştəri Xidmətləri</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">info@touragent.az</p>
                  <p className="text-sm text-gray-400">Ümumi Məlumat</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Bakı, Azərbaycan</p>
                  <p className="text-sm text-gray-400">Xan Şuşinski 8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-gray-400 text-sm">
              © 2026 TourAgent. Bütün hüquqlar qorunur. &nbsp;|&nbsp; VÖEN: 2007383881
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap space-x-6 text-sm text-gray-400">
              <Link to="/policies" className="hover:text-orange-500 transition-colors duration-200">
                Geri Qaytarma Siyasəti
              </Link>
              <Link to="/policies" onClick={() => setTimeout(() => document.querySelector('[data-testid="policy-tab-privacy"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })), 100)} className="hover:text-orange-500 transition-colors duration-200">
                Məxfilik Siyasəti
              </Link>
              <Link to="/policies" onClick={() => setTimeout(() => document.querySelector('[data-testid="policy-tab-terms"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })), 100)} className="hover:text-orange-500 transition-colors duration-200">
                Şərtlər və Qaydalar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;