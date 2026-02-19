import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, Plane, Globe, Heart, Thermometer, Map, GraduationCap, FileCheck, Car, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const serviceKeyMap: Record<string, { titleKey: string; shortDescKey: string; detailedDescKey: string; featuresKeys: string[]; icon: React.ReactNode; image: string; color: string }> = {
  'otel-bronu': { titleKey: 'services.hotelBooking', shortDescKey: 'services.hotelBookingDesc', detailedDescKey: 'serviceDetail.hotelDetailed', featuresKeys: ['serviceDetail.bestPrice', 'serviceDetail.freeCancellation', 'serviceDetail.support247', 'serviceDetail.fastOnlineBooking'], icon: <Building className="w-10 h-10" />, image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-blue-500 to-blue-600' },
  'aviabiletler': { titleKey: 'services.flightTickets', shortDescKey: 'services.flightTicketsDesc', detailedDescKey: 'serviceDetail.flightDetailed', featuresKeys: ['serviceDetail.affordablePrices', 'serviceDetail.flexibleDates', 'serviceDetail.groupDiscounts', 'serviceDetail.extraBaggage'], icon: <Plane className="w-10 h-10" />, image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-sky-500 to-blue-600' },
  'turpaketler': { titleKey: 'services.tourPackages', shortDescKey: 'services.tourPackagesDesc', detailedDescKey: 'serviceDetail.tourDetailed', featuresKeys: ['serviceDetail.fullPackage', 'serviceDetail.individualGroup', 'serviceDetail.proGuide', 'serviceDetail.everyBudget'], icon: <Globe className="w-10 h-10" />, image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-purple-500 to-indigo-600' },
  'balayi-seyahetleri': { titleKey: 'services.honeymoon', shortDescKey: 'services.honeymoonDesc', detailedDescKey: 'serviceDetail.honeymoonDetailed', featuresKeys: ['serviceDetail.romanticDecor', 'serviceDetail.luxuryRooms', 'serviceDetail.spaServices', 'serviceDetail.specialDinner'], icon: <Heart className="w-10 h-10" />, image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-pink-500 to-rose-600' },
  'mualicevi-turlar': { titleKey: 'services.medicalTours', shortDescKey: 'services.medicalToursDesc', detailedDescKey: 'serviceDetail.medicalDetailed', featuresKeys: ['serviceDetail.doctorAdvice', 'serviceDetail.modernTreatment', 'serviceDetail.comfortConditions', 'serviceDetail.personalProgram'], icon: <Thermometer className="w-10 h-10" />, image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-teal-500 to-emerald-600' },
  'rayon-turlari': { titleKey: 'services.regionalTours', shortDescKey: 'services.regionalToursDesc', detailedDescKey: 'serviceDetail.regionalDetailed', featuresKeys: ['serviceDetail.comfortTransport', 'serviceDetail.proGuide', 'serviceDetail.localCuisine', 'serviceDetail.corporatePackages'], icon: <Map className="w-10 h-10" />, image: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-green-500 to-emerald-600' },
  'mektebli-turlari': { titleKey: 'services.schoolTours', shortDescKey: 'services.schoolToursDesc', detailedDescKey: 'serviceDetail.schoolDetailed', featuresKeys: ['serviceDetail.safeEnvironment', 'serviceDetail.proSupervision', 'serviceDetail.funProgram', 'serviceDetail.educationalContent'], icon: <GraduationCap className="w-10 h-10" />, image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-amber-500 to-orange-600' },
  'viza-desteyi': { titleKey: 'services.visaSupport', shortDescKey: 'services.visaSupportDesc', detailedDescKey: 'serviceDetail.visaDetailed', featuresKeys: ['serviceDetail.docPreparation', 'serviceDetail.interviewPrep', 'serviceDetail.highApproval', 'serviceDetail.allCountries'], icon: <FileCheck className="w-10 h-10" />, image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-indigo-500 to-violet-600' },
  'transfer-xidmeti': { titleKey: 'services.transferService', shortDescKey: 'services.transferServiceDesc', detailedDescKey: 'serviceDetail.transferDetailed', featuresKeys: ['serviceDetail.vipTransfer', 'serviceDetail.proDriver', 'serviceDetail.groupTransfer', 'serviceDetail.service247'], icon: <Car className="w-10 h-10" />, image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-orange-500 to-red-600' },
  'sigorta': { titleKey: 'services.insurance', shortDescKey: 'services.insuranceDesc', detailedDescKey: 'serviceDetail.insuranceDetailed', featuresKeys: ['serviceDetail.medicalInsurance', 'serviceDetail.baggageInsurance', 'serviceDetail.cancellationInsurance', 'serviceDetail.visaInsurance'], icon: <ShieldCheck className="w-10 h-10" />, image: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop', color: 'from-cyan-500 to-blue-600' },
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const service = slug ? serviceKeyMap[slug] : undefined;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('serviceDetail.notFound')}</h1>
          <Link to="/services" className="text-orange-500 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> {t('serviceDetail.backToServices')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative h-[350px] sm:h-[400px] overflow-hidden">
        <img src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="text-white mb-4">{service.icon}</div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">{t(service.titleKey)}</h1>
          <p className="text-lg text-white/90 max-w-2xl">{t(service.shortDescKey)}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('serviceDetail.allServices')}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('serviceDetail.aboutService')}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{t(service.detailedDescKey)}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {service.featuresKeys.map((fKey, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.color}`} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{t(fKey)}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">{t('serviceDetail.interested')}</h3>
          <p className="text-white/90 mb-6">{t('serviceDetail.contactForMore')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+994124411262" className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all">
              <Phone className="w-4 h-4" /> {t('serviceDetail.callUs')}
            </a>
            <a href="https://wa.me/994502424269" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-full font-semibold transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
