import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Utensils, ChevronDown, ChevronUp, ArrowLeft, Plane, Calendar, Clock, Users, Shield, Sun } from 'lucide-react';

interface TourResult {
  id: number;
  name: string;
  country: string;
  city: string;
  hotel: string;
  hotelStars: number;
  image: string;
  meals: string;
  nights: number;
  departDate: string;
  returnDate: string;
  airline: string;
  departCity: string;
  price: number;
  originalPrice: number;
  reviewScore: number;
  reviewCount: number;
  reviewLabel: string;
  freeCancellation: boolean;
  includes: string[];
}

const allTours: TourResult[] = [
  {
    id: 1, name: 'Antalya Yay Turu', country: 'Türkiyə', city: 'Antalya', hotel: 'Maxx Royal Belek Golf Resort',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    meals: 'Ultra All Inclusive', nights: 7, departDate: '2026-07-15', returnDate: '2026-07-22',
    airline: 'AZAL', departCity: 'Bakı', price: 1250, originalPrice: 1600,
    reviewScore: 9.4, reviewCount: 2847, reviewLabel: 'Əla', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta']
  },
  {
    id: 2, name: 'İstanbul Mədəniyyət Turu', country: 'Türkiyə', city: 'İstanbul', hotel: 'Four Seasons Bosphorus',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop',
    meals: 'Bed & Breakfast', nights: 4, departDate: '2026-06-10', returnDate: '2026-06-14',
    airline: 'Turkish Airlines', departCity: 'Bakı', price: 890, originalPrice: 1150,
    reviewScore: 9.6, reviewCount: 1245, reviewLabel: 'Əla', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Bələdçi']
  },
  {
    id: 3, name: 'Dubai Lüks Turu', country: 'BƏƏ', city: 'Dubai', hotel: 'Atlantis The Palm',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    meals: 'Half Board', nights: 5, departDate: '2026-03-20', returnDate: '2026-03-25',
    airline: 'Emirates', departCity: 'Bakı', price: 1680, originalPrice: 2100,
    reviewScore: 9.1, reviewCount: 5678, reviewLabel: 'Əla', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta', 'Ekskursiya']
  },
  {
    id: 4, name: 'Misir Piramidalar Turu', country: 'Misir', city: 'Qahirə', hotel: 'Marriott Mena House',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1539768942893-daf53e736571?w=600&h=400&fit=crop',
    meals: 'Full Board', nights: 6, departDate: '2026-04-05', returnDate: '2026-04-11',
    airline: 'AZAL', departCity: 'Bakı', price: 1420, originalPrice: 1800,
    reviewScore: 8.8, reviewCount: 1432, reviewLabel: 'Çox yaxşı', freeCancellation: false,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Bələdçi', 'Ekskursiya']
  },
  {
    id: 5, name: 'Bodrum Sahil Turu', country: 'Türkiyə', city: 'Bodrum', hotel: 'Mandarin Oriental Bodrum',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    meals: 'All Inclusive', nights: 7, departDate: '2026-08-01', returnDate: '2026-08-08',
    airline: 'Pegasus', departCity: 'Bakı', price: 1350, originalPrice: 1750,
    reviewScore: 9.3, reviewCount: 756, reviewLabel: 'Əla', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta']
  },
  {
    id: 6, name: 'Gürcüstan Doğa Turu', country: 'Gürcüstan', city: 'Tbilisi', hotel: 'Rooms Hotel Tbilisi',
    hotelStars: 4, image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop',
    meals: 'Bed & Breakfast', nights: 3, departDate: '2026-05-15', returnDate: '2026-05-18',
    airline: 'Buta Airways', departCity: 'Bakı', price: 520, originalPrice: 680,
    reviewScore: 8.9, reviewCount: 876, reviewLabel: 'Çox yaxşı', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Bələdçi']
  },
  {
    id: 7, name: 'Belek Golf & Spa', country: 'Türkiyə', city: 'Antalya', hotel: 'Voyage Belek Golf & Spa',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    meals: 'All Inclusive', nights: 10, departDate: '2026-07-01', returnDate: '2026-07-11',
    airline: 'AZAL', departCity: 'Bakı', price: 1780, originalPrice: 2300,
    reviewScore: 8.8, reviewCount: 2103, reviewLabel: 'Çox yaxşı', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta', 'Spa']
  },
  {
    id: 8, name: 'Tayland Egzotik Turu', country: 'Tayland', city: 'Phuket', hotel: 'Banyan Tree Phuket',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    meals: 'Half Board', nights: 10, departDate: '2026-02-10', returnDate: '2026-02-20',
    airline: 'Qatar Airways', departCity: 'Bakı', price: 2450, originalPrice: 3100,
    reviewScore: 9.2, reviewCount: 543, reviewLabel: 'Əla', freeCancellation: false,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta', 'Ekskursiya']
  },
  {
    id: 9, name: 'Lara Premium Tur', country: 'Türkiyə', city: 'Antalya', hotel: 'Titanic Mardan Palace',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    meals: 'Ultra All Inclusive', nights: 7, departDate: '2026-06-20', returnDate: '2026-06-27',
    airline: 'Turkish Airlines', departCity: 'Bakı', price: 1550, originalPrice: 2000,
    reviewScore: 9.1, reviewCount: 3421, reviewLabel: 'Əla', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta']
  },
  {
    id: 10, name: 'Maldiv Balayı Turu', country: 'Maldiv', city: 'Malé', hotel: 'Soneva Fushi Resort',
    hotelStars: 5, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop',
    meals: 'Full Board', nights: 7, departDate: '2026-03-01', returnDate: '2026-03-08',
    airline: 'Emirates', departCity: 'Bakı', price: 3200, originalPrice: 4000,
    reviewScore: 9.7, reviewCount: 321, reviewLabel: 'Əla', freeCancellation: true,
    includes: ['Uçuş', 'Transfer', 'Otel', 'Sığorta', 'Spa', 'Ekskursiya']
  },
];

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

const TourSearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchCountry = searchParams.get('country') || '';
  const searchDepartCity = searchParams.get('departCity') || '';
  const searchGuests = parseInt(searchParams.get('guests') || '2');
  const searchNightsMin = parseInt(searchParams.get('nightsMin') || '1');
  const searchNightsMax = parseInt(searchParams.get('nightsMax') || '14');
  const searchDepartFrom = searchParams.get('departFrom') || '';
  const searchDepartTo = searchParams.get('departTo') || '';
  const searchAirline = searchParams.get('airline') || '';

  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterMeals, setFilterMeals] = useState<string[]>([]);
  const [filterStars, setFilterStars] = useState<number[]>([]);
  const [filterPriceMax, setFilterPriceMax] = useState(5000);
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'nights'>('rating');

  const searchFilteredTours = useMemo(() => {
    return allTours.filter(t => {
      if (searchCountry && t.country !== searchCountry) return false;
      if (searchAirline && t.airline !== searchAirline) return false;
      if (t.nights < searchNightsMin || t.nights > searchNightsMax) return false;
      return true;
    });
  }, [searchCountry, searchAirline, searchNightsMin, searchNightsMax]);

  const allMeals = [...new Set(searchFilteredTours.map(t => t.meals))];
  const allCountries = [...new Set(searchFilteredTours.map(t => t.country))];

  const filteredTours = useMemo(() => {
    let results = searchFilteredTours.filter(t => {
      if (filterName && !t.name.toLowerCase().includes(filterName.toLowerCase()) && !t.hotel.toLowerCase().includes(filterName.toLowerCase())) return false;
      if (filterMeals.length > 0 && !filterMeals.includes(t.meals)) return false;
      if (filterStars.length > 0 && !filterStars.includes(t.hotelStars)) return false;
      if (t.price > filterPriceMax) return false;
      if (filterCountry.length > 0 && !filterCountry.includes(t.country)) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'rating': results.sort((a, b) => b.reviewScore - a.reviewScore); break;
      case 'nights': results.sort((a, b) => b.nights - a.nights); break;
    }
    return results;
  }, [searchFilteredTours, filterName, filterMeals, filterStars, filterPriceMax, filterCountry, sortBy]);

  const toggleFilter = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const getReviewColor = (score: number) => {
    if (score >= 9) return 'bg-green-600';
    if (score >= 8) return 'bg-green-500';
    if (score >= 7) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                <ArrowLeft className="w-5 h-5" /> Geri
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <Sun className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-gray-900">Tur Nəticələri</span>
                {searchCountry && <><span>·</span><span className="font-medium">{searchCountry}</span></>}
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">{searchGuests} qonaq</span>
                {searchNightsMin > 0 && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {searchNightsMin}-{searchNightsMax} gecə
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{filteredTours.length} tur tapıldı</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="rating">Reyting üzrə</option>
                <option value="price-asc">Qiymət (aşağıdan)</option>
                <option value="price-desc">Qiymət (yuxarıdan)</option>
                <option value="nights">Gecə sayı</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters */}
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Filterlər</h3>
                <button onClick={() => { setFilterName(''); setFilterMeals([]); setFilterStars([]); setFilterPriceMax(5000); setFilterCountry([]); }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium">Sıfırla</button>
              </div>

              <FilterSection title="Tur / Otel Adı" icon={<span>🔍</span>}>
                <input type="text" value={filterName} onChange={e => setFilterName(e.target.value)}
                  placeholder="Ad ilə axtar..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </FilterSection>

              <FilterSection title="Ölkə" icon={<MapPin className="w-4 h-4" />}>
                <div className="space-y-2">
                  {allCountries.map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={filterCountry.includes(c)} onChange={() => toggleFilter(filterCountry, c, setFilterCountry)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{c}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

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

              <FilterSection title="Otel Ulduzu" icon={<Star className="w-4 h-4" />}>
                <div className="flex gap-2 flex-wrap">
                  {[5, 4, 3].map(star => (
                    <button key={star} onClick={() => setFilterStars(filterStars.includes(star) ? filterStars.filter(s => s !== star) : [...filterStars, star])}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${filterStars.includes(star) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}>
                      {star} <Star className="w-3 h-3 fill-current" />
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Qiymət" icon={<span>💰</span>}>
                <div className="space-y-3">
                  <input type="range" min={0} max={5000} value={filterPriceMax} onChange={e => setFilterPriceMax(Number(e.target.value))}
                    className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0 AZN</span><span>{filterPriceMax} AZN</span>
                  </div>
                </div>
              </FilterSection>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {filteredTours.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">🏖️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tur tapılmadı</h3>
                <p className="text-gray-500 mb-4">Filterləri dəyişdirərək yenidən cəhd edin</p>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Yeni axtarış
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTours.map(tour => (
                  <div key={tour.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-72 lg:w-80 flex-shrink-0 relative overflow-hidden">
                        <img src={tour.image} alt={tour.name}
                          className="w-full h-52 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {tour.freeCancellation && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                            <Shield className="w-3 h-3" /> Pulsuz Ləğv
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          {tour.nights} gecə
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{tour.name}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3.5 h-3.5" /> {tour.city}, {tour.country}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="text-right">
                                <span className="text-xs text-gray-500 block">{tour.reviewLabel}</span>
                                <span className="text-xs text-gray-400">{tour.reviewCount} rəy</span>
                              </div>
                              <span className={`${getReviewColor(tour.reviewScore)} text-white px-2.5 py-1.5 rounded-lg text-sm font-bold min-w-[42px] text-center`}>
                                {tour.reviewScore}
                              </span>
                            </div>
                          </div>

                          {/* Hotel info */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: tour.hotelStars }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{tour.hotel}</span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                              <Utensils className="w-3 h-3" /> {tour.meals}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full font-medium">
                              <Plane className="w-3 h-3" /> {tour.airline}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                              <Calendar className="w-3 h-3" /> {formatDate(tour.departDate)} — {formatDate(tour.returnDate)}
                            </span>
                          </div>

                          {/* Includes */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {tour.includes.map(inc => (
                              <span key={inc} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">
                                ✓ {inc}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price & Book */}
                        <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-400">Nəfər başına</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm text-gray-400 line-through">{tour.originalPrice} AZN</span>
                              <span className="text-2xl font-bold text-gray-900">{tour.price} AZN</span>
                            </div>
                            <p className="text-xs text-green-600 font-medium">
                              {Math.round((1 - tour.price / tour.originalPrice) * 100)}% endirim
                            </p>
                          </div>
                          <button
                            onClick={() => navigate('/checkout', { state: { hotel: { id: tour.id, name: `${tour.name} — ${tour.hotel}`, city: tour.city, district: tour.city, country: tour.country, stars: tour.hotelStars, price: tour.price * searchGuests, originalPrice: tour.originalPrice * searchGuests, image: tour.image, meals: tour.meals, reviewScore: tour.reviewScore, reviewCount: tour.reviewCount, reviewLabel: tour.reviewLabel, freeCancellation: tour.freeCancellation, checkIn: tour.departDate, checkOut: tour.returnDate, nights: tour.nights, adults: searchGuests, children: 0 } } })}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg">
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

export default TourSearchResults;
