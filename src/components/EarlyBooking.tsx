import React from 'react';
import { Calendar, Award, Shield, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const benefits = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'En İyi Fiyat Garantisi',
    description: 'Erken rezervasyonla en uygun fiyatları yakalayın'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Ücretsiz İptal',
    description: '7 gün öncesine kadar ücretsiz iptal hakkı'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Güvenli Ödeme',
    description: '256-bit SSL şifreleme ile güvenli ödeme'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '7/24 Destek',
    description: 'Uzman ekibimiz her zaman yanınızda'
  }
];

const EarlyBooking: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="mb-12 lg:mb-0">
            <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              <span>{t('earlyBooking.title')}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              2024 Yazını Şimdiden
              <span className="text-orange-500 block">Planla ve Kazan!</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Erken rezervasyon yaparak hem en iyi otelleri garanti altına alın hem de 
              bütçenizi koruyun. Hayalinizdeki tatil için şimdi harekete geçin!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 text-orange-500">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Erken Rezervasyon Yap
              </button>
              <button className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-orange-500 dark:hover:border-orange-500 px-8 py-3 rounded-full font-semibold transition-all duration-200">
                Kampanyaları İncele
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Erken Rezervasyon"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">%35</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Erken Rezervasyon İndirimi</div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">150K+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Mutlu Müşteri</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyBooking;