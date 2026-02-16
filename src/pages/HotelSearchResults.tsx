import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Utensils, Bed, ChevronDown, ChevronUp, X, ArrowLeft, Wifi, Waves, Dumbbell, Coffee, Wind, Tv, Bath, Shield } from 'lucide-react';

// Mock hotel data with images
interface HotelResult {
  id: number;
  name: string;
  city: string;
  district: string;
  country: string;
  stars: number;
  price: number;
  originalPrice: number;
  image: string;
  meals: string;
  beds: string;
  reviewScore: number;
  reviewCount: number;
  reviewLabel: string;
  freeCancellation: boolean;
  roomFeatures: string[];
}

const allHotels: HotelResult[] = [
  {
    id: 1, name: 'Maxx Royal Belek Golf Resort', city: 'Antalya', district: 'Belek', country: 'Türkiye',
    stars: 5, price: 450, originalPrice: 580, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    meals: 'Ultra All Inclusive', beds: '1 Bed', reviewScore: 9.4, reviewCount: 2847, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Air Conditioning', 'TV', 'Mini Bar']
  },
  {
    id: 2, name: 'Titanic Mardan Palace', city: 'Antalya', district: 'Lara', country: 'Türkiye',
    stars: 5, price: 520, originalPrice: 690, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    meals: 'All Inclusive', beds: '2 Beds', reviewScore: 9.1, reviewCount: 3421, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Gym', 'Air Conditioning', 'TV', 'Bathtub']
  },
  {
    id: 3, name: 'Rixos Premium Belek', city: 'Antalya', district: 'Belek', country: 'Türkiye',
    stars: 5, price: 380, originalPrice: 490, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
    meals: 'Ultra All Inclusive', beds: '1 Bed', reviewScore: 9.2, reviewCount: 1956, reviewLabel: 'Əla',
    freeCancellation: false, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Gym', 'TV', 'Mini Bar']
  },
  {
    id: 4, name: 'Voyage Belek Golf & Spa', city: 'Antalya', district: 'Belek', country: 'Türkiye',
    stars: 5, price: 310, originalPrice: 420, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    meals: 'All Inclusive', beds: '1 Bed', reviewScore: 8.8, reviewCount: 2103, reviewLabel: 'Çox yaxşı',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Air Conditioning', 'TV']
  },
  {
    id: 5, name: 'Four Seasons Bosphorus', city: 'İstanbul', district: 'Beşiktaş', country: 'Türkiye',
    stars: 5, price: 680, originalPrice: 850, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
    meals: 'Bed & Breakfast', beds: '1 Bed', reviewScore: 9.6, reviewCount: 1245, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Gym', 'TV', 'Bathtub', 'Mini Bar']
  },
  {
    id: 6, name: 'Çırağan Palace Kempinski', city: 'İstanbul', district: 'Beşiktaş', country: 'Türkiye',
    stars: 5, price: 720, originalPrice: 900, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    meals: 'Bed & Breakfast', beds: '2 Beds', reviewScore: 9.5, reviewCount: 987, reviewLabel: 'Əla',
    freeCancellation: false, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'TV', 'Bathtub', 'Mini Bar']
  },
  {
    id: 7, name: 'Mandarin Oriental Bodrum', city: 'Bodrum', district: 'Yalıkavak', country: 'Türkiye',
    stars: 5, price: 590, originalPrice: 750, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    meals: 'Half Board', beds: '1 Bed', reviewScore: 9.3, reviewCount: 756, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Air Conditioning', 'TV', 'Mini Bar']
  },
  {
    id: 8, name: 'Four Seasons Baku', city: 'Bakı', district: 'Səbail', country: 'Azərbaycan',
    stars: 5, price: 350, originalPrice: 450, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop',
    meals: 'Bed & Breakfast', beds: '2 Beds', reviewScore: 9.4, reviewCount: 1432, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Gym', 'TV', 'Bathtub']
  },
  {
    id: 9, name: 'Fairmont Baku', city: 'Bakı', district: 'Səbail', country: 'Azərbaycan',
    stars: 5, price: 280, originalPrice: 380, image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop',
    meals: 'Room Only', beds: '2 Beds', reviewScore: 9.0, reviewCount: 1876, reviewLabel: 'Əla',
    freeCancellation: false, roomFeatures: ['Wi-Fi', 'Pool', 'Gym', 'Air Conditioning', 'TV']
  },
  {
    id: 10, name: 'Hilton Baku', city: 'Bakı', district: 'Xətai', country: 'Azərbaycan',
    stars: 5, price: 220, originalPrice: 300, image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&h=400&fit=crop',
    meals: 'Half Board', beds: '1 Bed', reviewScore: 8.6, reviewCount: 2345, reviewLabel: 'Çox yaxşı',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Gym', 'Air Conditioning', 'TV']
  },
  {
    id: 11, name: 'Delphin Imperial Lara', city: 'Antalya', district: 'Lara', country: 'Türkiye',
    stars: 5, price: 340, originalPrice: 450, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
    meals: 'Ultra All Inclusive', beds: '1 Bed', reviewScore: 8.9, reviewCount: 3102, reviewLabel: 'Çox yaxşı',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Air Conditioning', 'TV', 'Mini Bar']
  },
  {
    id: 12, name: 'Granada Luxury Belek', city: 'Antalya', district: 'Belek', country: 'Türkiye',
    stars: 5, price: 290, originalPrice: 400, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop',
    meals: 'All Inclusive', beds: '3 Beds', reviewScore: 8.7, reviewCount: 1654, reviewLabel: 'Çox yaxşı',
    freeCancellation: false, roomFeatures: ['Wi-Fi', 'Pool', 'Air Conditioning', 'TV']
  },
  {
    id: 13, name: 'Burj Al Arab', city: 'Dubai', district: 'Jumeirah Beach', country: 'BƏƏ',
    stars: 5, price: 1200, originalPrice: 1500, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    meals: 'Full Board', beds: '2 Beds', reviewScore: 9.8, reviewCount: 4521, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Gym', 'TV', 'Bathtub', 'Mini Bar']
  },
  {
    id: 14, name: 'Atlantis The Palm', city: 'Dubai', district: 'Palm Jumeirah', country: 'BƏƏ',
    stars: 5, price: 550, originalPrice: 720, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop',
    meals: 'Half Board', beds: '1 Bed', reviewScore: 9.1, reviewCount: 5678, reviewLabel: 'Əla',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Pool', 'Spa', 'Gym', 'TV', 'Bathtub']
  },
  {
    id: 15, name: 'Rooms Hotel Tbilisi', city: 'Tbilisi', district: 'Köhnə Tbilisi', country: 'Gürcüstan',
    stars: 4, price: 150, originalPrice: 200, image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop',
    meals: 'Bed & Breakfast', beds: '1 Bed', reviewScore: 8.9, reviewCount: 876, reviewLabel: 'Çox yaxşı',
    freeCancellation: true, roomFeatures: ['Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar']
  },
  {
    id: 16, name: 'Qafqaz Riverside Hotel', city: 'Qəbələ', district: 'Qəbələ Mərkəz', country: 'Azərbaycan',
    stars: 4, price: 120, originalPrice: 170, image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&h=400&fit=crop',
    meals: 'All Inclusive', beds: '1 Bed', reviewScore: 8.3, reviewCount: 654, reviewLabel: 'Çox yaxşı',
    freeCancellation: false, roomFeatures: ['Wi-Fi', 'Pool', 'Air Conditioning', 'TV']
  },
];

// Filter section collapse component
const FilterSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
        <span className="flex items-center gap-2">{icon}{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

const HotelSearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchCountry = searchParams.get('country') || '';
  const searchCity = searchParams.get('city') || '';
  const searchHotel = searchParams.get('hotel') || '';
  const searchCheckIn = searchParams.get('checkIn') || '';
  const searchCheckOut = searchParams.get('checkOut') || '';
  const searchNights = parseInt(searchParams.get('nights') || '0');
  const searchAdults = parseInt(searchParams.get('adults') || '2');
  const searchChildren = parseInt(searchParams.get('children') || '0');
  const searchFreeCancellation = searchParams.get('freeCancellation') === 'true';

  // Filter states
  const [filterHotelName, setFilterHotelName] = useState('');
  const [filterMeals, setFilterMeals] = useState<string[]>([]);
  const [filterStars, setFilterStars] = useState<number[]>([]);
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(2000);
  const [filterBeds, setFilterBeds] = useState<string[]>([]);
  const [filterRoomFeatures, setFilterRoomFeatures] = useState<string[]>([]);
  const [filterDistricts, setFilterDistricts] = useState<string[]>([]);
  const [filterReviewMin, setFilterReviewMin] = useState(0);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'stars'>('rating');

  // Pre-filter by search params
  const searchFilteredHotels = useMemo(() => {
    return allHotels.filter(h => {
      if (searchCountry && h.country !== searchCountry) return false;
      if (searchCity && h.city !== searchCity) return false;
      if (searchHotel && h.name !== searchHotel) return false;
      if (searchFreeCancellation && !h.freeCancellation) return false;
      return true;
    });
  }, [searchCountry, searchCity, searchHotel, searchFreeCancellation]);

  // Fixed filter options
  const allMeals = ['All Inclusive', 'Ultra All Inclusive', 'Half Board', 'Full Board', 'Bed & Breakfast', 'Room Only'];
  const allBeds = ['1 Bed', '2 Beds', '3 Beds', '4 Beds'];
  const allDistricts = [...new Set(searchFilteredHotels.map(h => h.district))];
  const allRoomFeatures = [...new Set(searchFilteredHotels.flatMap(h => h.roomFeatures))];

  // Apply sidebar filters
  const filteredHotels = useMemo(() => {
    let results = searchFilteredHotels.filter(h => {
      if (filterHotelName && !h.name.toLowerCase().includes(filterHotelName.toLowerCase())) return false;
      if (filterMeals.length > 0 && !filterMeals.includes(h.meals)) return false;
      if (filterStars.length > 0 && !filterStars.includes(h.stars)) return false;
      if (h.price < filterPriceMin || h.price > filterPriceMax) return false;
      if (filterBeds.length > 0 && !filterBeds.includes(h.beds)) return false;
      if (filterRoomFeatures.length > 0 && !filterRoomFeatures.every(f => h.roomFeatures.includes(f))) return false;
      if (filterDistricts.length > 0 && !filterDistricts.includes(h.district)) return false;
      if (filterReviewMin > 0 && h.reviewScore < filterReviewMin) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'rating': results.sort((a, b) => b.reviewScore - a.reviewScore); break;
      case 'stars': results.sort((a, b) => b.stars - a.stars); break;
    }
    return results;
  }, [searchFilteredHotels, filterHotelName, filterMeals, filterStars, filterPriceMin, filterPriceMax, filterBeds, filterRoomFeatures, filterDistricts, filterReviewMin, sortBy]);

  const toggleFilter = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };
  const toggleStarFilter = (star: number) => {
    setFilterStars(filterStars.includes(star) ? filterStars.filter(s => s !== star) : [...filterStars, star]);
  };

  const getReviewColor = (score: number) => {
    if (score >= 9) return 'bg-green-600';
    if (score >= 8) return 'bg-green-500';
    if (score >= 7) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const roomFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'Wi-Fi': return <Wifi className="w-3.5 h-3.5" />;
      case 'Pool': return <Waves className="w-3.5 h-3.5" />;
      case 'Gym': return <Dumbbell className="w-3.5 h-3.5" />;
      case 'Spa': return <Coffee className="w-3.5 h-3.5" />;
      case 'Air Conditioning': return <Wind className="w-3.5 h-3.5" />;
      case 'TV': return <Tv className="w-3.5 h-3.5" />;
      case 'Bathtub': return <Bath className="w-3.5 h-3.5" />;
      case 'Mini Bar': return <Coffee className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Top bar summary */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Geri
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <span className="font-semibold text-gray-900">{searchCountry}</span>
                {searchCity && <><span>›</span><span className="font-medium">{searchCity}</span></>}
                {searchCheckIn && <><span className="text-gray-400">|</span><span>{searchCheckIn}</span><span>→</span><span>{searchCheckOut}</span></>}
                {searchNights > 0 && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">{searchNights} gecə</span>}
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">{searchAdults} böyük{searchChildren > 0 ? `, ${searchChildren} uşaq` : ''}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{filteredHotels.length} otel tapıldı</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="rating">Reyting üzrə</option>
                <option value="price-asc">Qiymət (aşağıdan)</option>
                <option value="price-desc">Qiymət (yuxarıdan)</option>
                <option value="stars">Ulduz üzrə</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Filterlər</h3>
                <button onClick={() => { setFilterHotelName(''); setFilterMeals([]); setFilterStars([]); setFilterPriceMin(0); setFilterPriceMax(2000); setFilterBeds([]); setFilterRoomFeatures([]); setFilterDistricts([]); setFilterReviewMin(0); }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium">Sıfırla</button>
              </div>

              {/* Hotel Name Filter */}
              <FilterSection title="Otel Adı" icon={<span>🏨</span>}>
                <input type="text" value={filterHotelName} onChange={e => setFilterHotelName(e.target.value)}
                  placeholder="Otel adı ilə axtar..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </FilterSection>

              {/* Meals Filter */}
              <FilterSection title="Yemək" icon={<Utensils className="w-4 h-4" />}>
                <div className="space-y-2">
                  {allMeals.map(meal => (
                    <label key={meal} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={filterMeals.includes(meal)} onChange={() => toggleFilter(filterMeals, meal, setFilterMeals)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{meal}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Star Rating Filter */}
              <FilterSection title="Ulduz Reytinqi" icon={<Star className="w-4 h-4" />}>
                <div className="flex gap-2 flex-wrap">
                  {[5, 4, 3].map(star => (
                    <button key={star} onClick={() => toggleStarFilter(star)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${filterStars.includes(star) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}>
                      {star} <Star className="w-3 h-3 fill-current" />
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Price Filter */}
              <FilterSection title="Qiymət" icon={<span>💰</span>}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="number" value={filterPriceMin} onChange={e => setFilterPriceMin(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Min" />
                    <span className="text-gray-400">—</span>
                    <input type="number" value={filterPriceMax} onChange={e => setFilterPriceMax(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Max" />
                  </div>
                  <input type="range" min={0} max={2000} value={filterPriceMax} onChange={e => setFilterPriceMax(Number(e.target.value))}
                    className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0 AZN</span><span>{filterPriceMax} AZN</span>
                  </div>
                </div>
              </FilterSection>



              {/* Districts Filter */}
              <FilterSection title="İlçə" icon={<MapPin className="w-4 h-4" />} defaultOpen={false}>
                <div className="space-y-2">
                  {allDistricts.map(d => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={filterDistricts.includes(d)} onChange={() => toggleFilter(filterDistricts, d, setFilterDistricts)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{d}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Review Rating Filter */}
              <FilterSection title="Rəy Reytinqi" icon={<span>⭐</span>} defaultOpen={false}>
                <div className="space-y-2">
                  {[9, 8, 7, 6].map(min => (
                    <button key={min} onClick={() => setFilterReviewMin(filterReviewMin === min ? 0 : min)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterReviewMin === min ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                      {min}+ {min >= 9 ? 'Əla' : min >= 8 ? 'Çox yaxşı' : min >= 7 ? 'Yaxşı' : 'Məqbul'}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>

          {/* Hotel Results */}
          <div className="flex-1 min-w-0">
            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Otel tapılmadı</h3>
                <p className="text-gray-500 mb-4">Filterləri dəyişdirərək yenidən cəhd edin</p>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Yeni axtarış
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-72 lg:w-80 flex-shrink-0 relative overflow-hidden">
                        <img src={hotel.image} alt={hotel.name}
                          className="w-full h-52 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {hotel.freeCancellation && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                            <Shield className="w-3 h-3" /> Pulsuz Ləğv
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                          {hotel.stars} <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{hotel.name}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3.5 h-3.5" /> {hotel.district}, {hotel.city}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="text-right">
                                <span className="text-xs text-gray-500 block">{hotel.reviewLabel}</span>
                                <span className="text-xs text-gray-400">{hotel.reviewCount} rəy</span>
                              </div>
                              <span className={`${getReviewColor(hotel.reviewScore)} text-white px-2.5 py-1.5 rounded-lg text-sm font-bold min-w-[42px] text-center`}>
                                {hotel.reviewScore}
                              </span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                              <Utensils className="w-3 h-3" /> {hotel.meals}
                            </span>
                          </div>

                        </div>

                        {/* Price & Book */}
                        <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
                          <div>
                            {searchNights > 0 && <p className="text-xs text-gray-400">{searchNights} gecə, {searchAdults} nəfər</p>}
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm text-gray-400 line-through">{hotel.originalPrice} AZN</span>
                              <span className="text-2xl font-bold text-gray-900">{hotel.price} AZN</span>
                            </div>
                            <p className="text-xs text-green-600 font-medium">
                              {Math.round((1 - hotel.price / hotel.originalPrice) * 100)}% endirim
                            </p>
                          </div>
                          <button
                            onClick={() => navigate('/checkout')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg">
                            Rezerv et
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchResults;
