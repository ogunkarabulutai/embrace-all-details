import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const destinations = [
  {
    id: 1,
    name: 'Antalya',
    country: 'Türkiye',
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.8,
    hotels: 250,
    startingPrice: 1299
  },
  {
    id: 2,
    name: 'Bodrum',
    country: 'Türkiye', 
    image: 'https://images.pexels.com/photos/1548024/pexels-photo-1548024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.7,
    hotels: 180,
    startingPrice: 1599
  },
  {
    id: 3,
    name: 'Kapadokya',
    country: 'Türkiye',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.9,
    hotels: 120,
    startingPrice: 899
  },
  {
    id: 4,
    name: 'İstanbul',
    country: 'Türkiye',
    image: 'https://images.pexels.com/photos/1717859/pexels-photo-1717859.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.6,
    hotels: 300,
    startingPrice: 799
  }
];

const PopularDestinations: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('destinations.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            En çok tercih edilen destinasyonları keşfedin ve unutulmaz anılar biriktirin
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-900">{destination.rating}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{destination.country}</span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {destination.hotels} otel seçeneği
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">En düşük</span>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                      ₺{destination.startingPrice.toLocaleString()}
                    </div>
                  </div>
                  
                  <button className="group/btn flex items-center space-x-1 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200">
                    <span>Keşfet</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 px-8 py-3 rounded-full font-medium transition-all duration-200 inline-flex items-center space-x-2">
            <span>{t('destinations.exploreAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;