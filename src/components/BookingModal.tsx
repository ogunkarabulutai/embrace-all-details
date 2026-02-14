import React, { useState } from 'react';
import { X, MapPin, Calendar, Users, Search, ChevronDown, Star, Wifi, Car, Utensils, Waves, ArrowRight, Heart, Award } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  stars: number;
  price: number;
  originalPrice?: number;
  features: string[];
  description: string;
  badge?: string;
  discount?: number;
}

const mockHotels: Hotel[] = [
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
    features: ['Wifi', 'Parkinq', 'Restoran', 'Hovuz'],
    description: 'Lüks qolf kurortu ilə unudulmaz tətil təcrübəsi',
    badge: 'Ən Populyar',
    discount: 25
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
    features: ['Wifi', 'Parkinq', 'Restoran', 'Hovuz'],
    description: 'Möhtəşəm saray memarlığı və lüks xidmət',
    badge: 'Yeni',
    discount: 22
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
    features: ['Wifi', 'Parkinq', 'Restoran', 'Hovuz'],
    description: 'Qolf və spa ilə mükəmməl kombinasiya',
    badge: 'Endirim',
    discount: 15
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
    features: ['Wifi', 'Parkinq', 'Restoran', 'Hovuz'],
    description: 'Ailəyə uyğun lüks tətil kompleksi',
    badge: 'Ailəyə Uyğun',
    discount: 14
  },
  {
    id: 5,
    name: 'Rixos Premium Belek',
    location: 'Antalya, Belek',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 1789,
    stars: 5,
    price: 3600,
    originalPrice: 4200,
    features: ['Wifi', 'Parkinq', 'Restoran', 'Hovuz'],
    description: 'Ultra lüks all-inclusive təcrübəsi',
    badge: 'Premium',
    discount: 14
  },
  {
    id: 6,
    name: 'Granada Luxury Belek',
    location: 'Antalya, Belek',
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    rating: 4.5,
    reviews: 1234,
    stars: 5,
    price: 2200,
    originalPrice: 2600,
    features: ['Wifi', 'Parkinq', 'Restoran', 'Hovuz'],
    description: 'Şık dizayn və rahat qalma',
    badge: 'Dəyərli',
    discount: 15
  }
];

const destinations = [
  'Antalya', 'Bodrum', 'İstanbul', 'Kapadokya', 'Çeşme', 'Marmaris', 'Fethiye', 'Kuşadası'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Calculate nights dynamically
  const calculateNights = (checkInDate: string, checkOutDate: string): number => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    return daysDifference > 0 ? daysDifference : 0;
  };

  const nights = calculateNights(checkIn, checkOut);

  const popularSearches = [
    'Erken Rezervasyon Otelleri',
    'Son Yaz Fırsatları', 
    'Yılbaşı Otelleri'
  ];

  const handleSearch = async () => {
    if (!destination || !checkIn || !checkOut) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    if (nights <= 0) {
      alert('Çıkış tarihi giriş tarihinden sonra olmalıdır');
      return;
    }
    setIsSearching(true);
    setHasSearched(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Filter hotels based on destination
    const filteredHotels = mockHotels.filter(hotel => 
      hotel.location.toLowerCase().includes(destination.toLowerCase())
    );

    setSearchResults(filteredHotels.length > 0 ? filteredHotels : mockHotels);
    setIsSearching(false);
    setHasSearched(true);
  };

  const handlePopularSearch = (search: string) => {
    setDestination('Antalya');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const weekLater = new Date(today);
    weekLater.setDate(today.getDate() + 8);
    
    setCheckIn(tomorrow.toISOString().split('T')[0]);
    setCheckOut(weekLater.toISOString().split('T')[0]);
    handleSearch();
  };

  const toggleFavorite = (hotelId: number) => {
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'Wifi':
        return <Wifi className="w-4 h-4" />;
      case 'Otopark':
        return <Car className="w-4 h-4" />;
      case 'Restoran':
        return <Utensils className="w-4 h-4" />;
      case 'Havuz':
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'En Popüler':
        return 'bg-orange-500 text-white';
      case 'Yeni':
        return 'bg-green-500 text-white';
      case 'İndirim':
        return 'bg-red-500 text-white';
      case 'Aile Dostu':
        return 'bg-blue-500 text-white';
      case 'Premium':
        return 'bg-purple-500 text-white';
      case 'Değerli':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tatilini Planla
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Destination */}
              <div className="lg:col-span-4 relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nereye gitmek istersin?
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setShowDestinations(true)}
                    placeholder="Nereye gitmek istersin?"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {showDestinations && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                      {destinations.map((dest) => (
                        <button
                          key={dest}
                          onClick={() => {
                            setDestination(dest);
                            setShowDestinations(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Check-in Date */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Giriş Tarihi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Çıkış Tarihi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Nights */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gece
                </label>
                <div className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-center font-medium">
                  🌙 {nights}
                </div>
              </div>

              {/* Guests */}
              <div className="lg:col-span-2 relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Misafir
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    onClick={() => setShowGuests(!showGuests)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white flex items-center justify-between"
                  >
                    <span>{adults + children} Misafir</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showGuests && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-20 p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 dark:text-white">Yetişkin</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-gray-900 dark:text-white">{adults}</span>
                            <button
                              onClick={() => setAdults(Math.min(4, adults + 1))}
                              className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 dark:text-white">Çocuk</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-gray-900 dark:text-white">{children}</span>
                            <button
                              onClick={() => setChildren(Math.min(3, children + 1))}
                              className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">👤 {adults} 👶 {children}</div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1 flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          {!hasSearched && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Populyar Axtarışlar:
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearch(search)}
                    className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                  >
                    <span>{search}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {hasSearched && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {searchResults.length} otel tapıldı
                </h3>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setSearchResults([]);
                    setDestination('');
                    setCheckIn('');
                    setCheckOut('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Yeni Axtarış
                </button>
              </div>

              <div className="space-y-6">
                {searchResults.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Image */}
                      <div className="relative lg:w-80 h-64 lg:h-auto overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          {hotel.badge && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(hotel.badge)}`}>
                              {hotel.badge}
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button
                            onClick={() => toggleFavorite(hotel.id)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                              favorites.includes(hotel.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 text-gray-600 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(hotel.id) ? 'fill-current' : ''}`} />
                          </button>
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-900">{hotel.rating}</span>
                          </div>
                        </div>
                        {hotel.discount && (
                          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            %{hotel.discount} İndirim
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-1 mb-2">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-200">
                            {hotel.name}
                          </h3>

                          <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{hotel.location}</span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                            {hotel.description}
                          </p>

                          <div className="flex items-center space-x-4 mb-4">
                            {hotel.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                                {getFeatureIcon(feature)}
                                <span className="text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-gray-900 dark:text-white">{hotel.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({hotel.reviews.toLocaleString()} değerlendirme)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {hotel.originalPrice && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ₺{hotel.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ₺{hotel.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">/gece</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {nights} gece toplam: ₺{(hotel.price * nights).toLocaleString()}
                            </span>
                          </div>

                          <button className="group/btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            <span>Rezervasyon Yap</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              En iyi fiyatları bulmak için 1000+ oteli karşılaştırıyoruz
            </div>
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;