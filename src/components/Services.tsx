import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award, Clock, Users, Building, Plane, Globe, Heart, Thermometer, Map, GraduationCap, FileCheck, Car, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const serviceSlugs: Record<number, string> = {
  1: 'otel-bronu',
  2: 'aviabiletler',
  3: 'turpaketler',
  4: 'balayi-seyahetleri',
  5: 'mualicevi-turlar',
  6: 'rayon-turlari',
  7: 'mektebli-turlari',
  8: 'viza-desteyi',
  9: 'transfer-xidmeti',
  10: 'sigorta',
};

const serviceKeys = [
  { id: 1, titleKey: 'services.hotelBooking', descKey: 'services.hotelBookingDesc', icon: <Building className="w-8 h-8" />, image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-blue-500 to-blue-600' },
  { id: 2, titleKey: 'services.flightTickets', descKey: 'services.flightTicketsDesc', icon: <Plane className="w-8 h-8" />, image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-sky-500 to-blue-600' },
  { id: 3, titleKey: 'services.tourPackages', descKey: 'services.tourPackagesDesc', icon: <Globe className="w-8 h-8" />, image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-purple-500 to-indigo-600' },
  { id: 4, titleKey: 'services.honeymoon', descKey: 'services.honeymoonDesc', icon: <Heart className="w-8 h-8" />, image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-pink-500 to-rose-600' },
  { id: 5, titleKey: 'services.medicalTours', descKey: 'services.medicalToursDesc', icon: <Thermometer className="w-8 h-8" />, image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-teal-500 to-emerald-600' },
  { id: 6, titleKey: 'services.regionalTours', descKey: 'services.regionalToursDesc', icon: <Map className="w-8 h-8" />, image: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-green-500 to-emerald-600' },
  { id: 7, titleKey: 'services.schoolTours', descKey: 'services.schoolToursDesc', icon: <GraduationCap className="w-8 h-8" />, image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-amber-500 to-orange-600' },
  { id: 8, titleKey: 'services.visaSupport', descKey: 'services.visaSupportDesc', icon: <FileCheck className="w-8 h-8" />, image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-indigo-500 to-violet-600' },
  { id: 9, titleKey: 'services.transferService', descKey: 'services.transferServiceDesc', icon: <Car className="w-8 h-8" />, image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-orange-500 to-red-600' },
  { id: 10, titleKey: 'services.insurance', descKey: 'services.insuranceDesc', icon: <ShieldCheck className="w-8 h-8" />, image: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', color: 'from-cyan-500 to-blue-600' },
];

const Services: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const whyChooseUs = [
    { icon: <Shield className="w-6 h-6" />, titleKey: 'services.securePayment', descKey: 'services.securePaymentDesc' },
    { icon: <Award className="w-6 h-6" />, titleKey: 'services.bestPrice', descKey: 'services.bestPriceDesc' },
    { icon: <Clock className="w-6 h-6" />, titleKey: 'services.support247', descKey: 'services.support247Desc' },
    { icon: <Users className="w-6 h-6" />, titleKey: 'services.customers5000', descKey: 'services.customers5000Desc' },
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('services.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
          
          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">5000+</div>
              <div className="text-white/80 text-sm mt-1">{t('services.happyCustomers')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-white/80 text-sm mt-1">{t('services.serviceTypes')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm mt-1">{t('services.countries')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">7/24</div>
              <div className="text-white/80 text-sm mt-1">{t('services.customerSupport')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.comprehensiveRange')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.comprehensiveDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((service, index) => (
              <div
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className="group bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                  <div className="absolute top-4 left-4 text-white">{service.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-200">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t(service.descKey)}</p>
                  <button onClick={() => navigate(`/services/${serviceSlugs[service.id]}`)} className="group/btn w-full bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 text-gray-900 dark:text-white hover:text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>{t('services.viewDetails')}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.whyChooseUsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t(item.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{t('services.ctaTitle')}</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">{t('services.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+994124411262" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              {t('services.contactUs')}
            </a>
            <a href="https://wa.me/994502424269" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200">
              WhatsApp: +994 50 242 42 69
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
