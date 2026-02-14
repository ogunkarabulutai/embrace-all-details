import React from 'react';
import { Star, MapPin, Wifi, Car, Utensils, Waves, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedHotels: React.FC = () => {
  const { t } = useLanguage();
  
  const hotels = [
    {
      id: 1,
      name: 'Maxx Royal Belek Golf Resort',
      location: 'Antalya, Belek',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 2847,
      stars: 5,
      price: 4200,
      originalPrice: 5600,
      features: ['wifi', 'parking', 'restaurant', 'pool'],
      descKey: 'hotels.maxxRoyalDesc',
      badgeKey: 'hotels.mostPopular',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 2,
      name: 'Titanic Mardan Palace',
      location: 'Antalya, Lara',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 1923,
      stars: 5,
      price: 3800,
      originalPrice: 4900,
      features: ['wifi', 'parking', 'restaurant', 'pool'],
      descKey: 'hotels.titanicDesc',
      badgeKey: 'hotels.new',
      badgeColor: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Voyage Belek Golf & Spa',
      location: 'Antalya, Belek',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 1456,
      stars: 5,
      price: 2900,
      originalPrice: 3400,
      features: ['wifi', 'parking', 'restaurant', 'pool'],
      descKey: 'hotels.voyageDesc',
      badgeKey: 'hotels.discount',
      badgeColor: 'bg-red-500'
    },
    {
      id: 4,
      name: 'Delphin Imperial Lara',
      location: 'Antalya, Lara',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 4.6,
      reviews: 2156,
      stars: 5,
      price: 2400,
      originalPrice: 2800,
      features: ['wifi', 'parking', 'restaurant', 'pool'],
      descKey: 'hotels.delphinDesc',
      badgeKey: 'hotels.mostPopular',
      badgeColor: 'bg-blue-500'
    }
  ];

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'pool':
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('hotels.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('hotels.from')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badge */}
                <div className={`absolute top-4 right-4 ${hotel.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {t(hotel.badgeKey)}
                </div>
                
                {/* Stars */}
                <div className="absolute bottom-4 left-4 flex">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {hotel.name}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">{hotel.location}</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {t(hotel.descKey)}
                </p>

                {/* Features */}
                <div className="flex items-center gap-3 mb-4">
                  {hotel.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400"
                      title={t(`hotels.${feature}`)}
                    >
                      {getFeatureIcon(feature)}
                      <span className="text-xs">{t(`hotels.${feature}`)}</span>
                    </div>
                  ))}
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900 dark:text-white">{hotel.rating}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      ({hotel.reviews} {t('hotels.reviews')})
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        ₺{hotel.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        ₺{hotel.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {t('hotels.perNight')}
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2 group">
                    <span>{t('hotels.bookNow')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <span>{t('hotels.viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
