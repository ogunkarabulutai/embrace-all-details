import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const reviews = [
  {
    id: 1,
    name: 'Elif Kaya',
    location: 'İstanbul',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    rating: 5,
    review: 'TourAgent ile yaptığım Antalya tatili mükemmeldi! Hem rezervasyon süreci çok kolay hem de önerilen otel beklentilerimin çok üstündeydi. Kesinlikle tekrar tercih edeceğim.',
    hotel: 'Maxx Royal Belek Golf Resort',
    date: '2 hafta önce'
  },
  {
    id: 2,
    name: 'Ahmet Özdemir',
    location: 'Ankara',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    rating: 5,
    review: 'Ailecek gittiğimiz Bodrum tatilinde her detay mükemmeldi. Çocuklar çok eğlendi, biz de dinlendik. Fiyat-performans açısından harika bir tercih oldu.',
    hotel: 'Voyage Belek Golf & Spa',
    date: '1 ay önce'
  },
  {
    id: 3,
    name: 'Zeynep Acar',
    location: 'İzmir',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    rating: 5,
    review: 'Balayımızı planlarken çok endişeliydik ama TourAgent ekibi tüm süreçte bize destek oldu. Romantik ve unutulmaz bir tatil geçirdik. Teşekkürler!',
    hotel: 'Titanic Mardan Palace',
    date: '3 hafta önce'
  }
];

const Reviews: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('reviews.whatTheySay')}
          </p>
          
          {/* Overall Rating */}
          <div className="inline-flex items-center space-x-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl px-8 py-4 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">4.9</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">25,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Mutlu Müşteri Yorumu</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-orange-500 opacity-60" />
              </div>
              
              {/* Review Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{review.review}"
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.location}
                  </p>
                </div>
              </div>
              
              {/* Hotel & Date */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    {review.hotel}
                  </div>
                  <div>{review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Müşteri Memnuniyeti</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Müşteri Desteği</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">500K+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Başarılı Rezervasyon</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Yıl Tecrübe</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;