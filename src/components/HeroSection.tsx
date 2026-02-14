import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plane, Building, Camera, MapPin, Calendar, Users, ChevronDown, ChevronLeft, ChevronRight, Clock, X, Heart, Bell, Filter, Luggage, CreditCard, Timer, SlidersHorizontal } from 'lucide-react';
import BookingModal from './BookingModal';
import DateRangePicker from './DateRangePicker';
import { useLanguage } from '../contexts/LanguageContext';

interface MockCity {
  code: string;
  name: string;
  country: string;
  airport: string;
}

interface SearchResult {
  id: number;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  airline: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  stopCodes: string[];
  baggage: string;
  price: number;
  departDate: string;
  returnDate?: string;
  type: string;
  isDirect: boolean;
  isBusinessClass?: boolean;
  isSponsored?: boolean;
}

const mockCities: MockCity[] = [
  { code: 'BAK', name: 'Bakı', country: 'Azərbaycan', airport: 'Heydər Əliyev Beynəlxalq Hava Limanı' },
  { code: 'IST', name: 'İstanbul', country: 'Türkiyə', airport: 'İstanbul Havalimanı' },
  { code: 'SAW', name: 'İstanbul Sabiha', country: 'Türkiyə', airport: 'Sabiha Gökçen Havalimanı' },
  { code: 'AYT', name: 'Antalya', country: 'Türkiyə', airport: 'Antalya Havalimanı' },
  { code: 'ADB', name: 'İzmir', country: 'Türkiyə', airport: 'Adnan Menderes Havalimanı' },
  { code: 'ESB', name: 'Ankara', country: 'Türkiyə', airport: 'Esenboğa Havalimanı' },
  { code: 'GBJ', name: 'Qəbələ', country: 'Azərbaycan', airport: 'Qəbələ Beynəlxalq Hava Limanı' },
  { code: 'NAJ', name: 'Naxçıvan', country: 'Azərbaycan', airport: 'Naxçıvan Beynəlxalq Hava Limanı' },
  { code: 'GYD', name: 'Gəncə', country: 'Azərbaycan', airport: 'Gəncə Beynəlxalq Hava Limanı' },
  { code: 'DXB', name: 'Dubai', country: 'BƏƏ', airport: 'Dubai Beynəlxalq Hava Limanı' },
  { code: 'MSQ', name: 'Moskva', country: 'Rusiya', airport: 'Şeremetyevo Hava Limanı' },
  { code: 'LHR', name: 'London', country: 'Böyük Britaniya', airport: 'Heathrow Hava Limanı' },
  { code: 'CDG', name: 'Paris', country: 'Fransa', airport: 'Charles de Gaulle Hava Limanı' },
  { code: 'FRA', name: 'Frankfurt', country: 'Almaniya', airport: 'Frankfurt Hava Limanı' },
  { code: 'FCO', name: 'Roma', country: 'İtaliya', airport: 'Fiumicino Hava Limanı' },
  { code: 'TBS', name: 'Tbilisi', country: 'Gürcüstan', airport: 'Tbilisi Beynəlxalq Hava Limanı' },
  { code: 'TEV', name: 'Tehran', country: 'İran', airport: 'İmam Xomeyni Hava Limanı' },
  { code: 'BJV', name: 'Bodrum', country: 'Türkiyə', airport: 'Milas-Bodrum Havalimanı' },
];

const airlineData = [
  { name: 'AZAL', color: '#0066CC' },
  { name: 'Turkish Airlines', color: '#CC0000' },
  { name: 'Pegasus', color: '#FFB800' },
  { name: 'Buta Airways', color: '#00A651' },
  { name: 'Qatar Airways', color: '#5C0632' },
  { name: 'Emirates', color: '#D71A21' },
];

const generateMockResults = (fromCode: string, toCode: string, departDate: string, returnDate: string, tripType: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const possibleStopCodes = ['DXB', 'DOH', 'IST', 'AYT', 'FRA', 'MSQ'];

  for (let i = 0; i < 8; i++) {
    const airline = airlineData[i % airlineData.length];
    const departHour = 1 + Math.floor(Math.random() * 22);
    const departMinute = Math.floor(Math.random() * 60);
    const durationHours = 2 + Math.floor(Math.random() * 20);
    const durationMinutes = Math.floor(Math.random() * 50) + 5;
    const arriveHour = (departHour + durationHours) % 24;
    const arriveMinute = Math.floor(Math.random() * 60);
    const isDirect = i % 3 === 1;
    const stops = isDirect ? 0 : (i % 4 === 3 ? 2 : 1);
    const stopCodeList: string[] = [];
    if (!isDirect) {
      for (let s = 0; s < stops; s++) {
        const sc = possibleStopCodes.filter(c => c !== fromCode && c !== toCode)[s % possibleStopCodes.length];
        stopCodeList.push(sc);
      }
    }
    const bagWeight = isDirect ? 40 : 30;
    const basePrice = isDirect ? 15000 + Math.floor(Math.random() * 270000) : 5000 + Math.floor(Math.random() * 50000);

    results.push({
      id: i + 1,
      from: mockCities.find(c => c.code === fromCode)?.name || fromCode,
      fromCode,
      to: mockCities.find(c => c.code === toCode)?.name || toCode,
      toCode,
      airline: airline.name,
      departTime: `${String(departHour).padStart(2, '0')}:${String(departMinute).padStart(2, '0')}`,
      arriveTime: `${String(arriveHour).padStart(2, '0')}:${String(arriveMinute).padStart(2, '0')}`,
      duration: `${durationHours}sa ${durationMinutes}dk`,
      stops,
      stopCodes: stopCodeList,
      baggage: `1x${bagWeight} kg`,
      price: Math.floor(basePrice),
      departDate: departDate || '2026-03-15',
      returnDate: tripType === 'roundtrip' ? (returnDate || '2026-03-22') : undefined,
      type: tripType === 'roundtrip' ? 'Gedış - Qayıdış' : 'Tək istiqamət',
      isDirect,
      isBusinessClass: i === 1,
      isSponsored: i === 0,
    });
  }

  return results.sort((a, b) => a.price - b.price);
};

const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US');
};

interface FilterSectionProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ icon, label, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-100">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-1 text-left hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <span className="text-gray-500">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && children && <div className="pb-3 px-1">{children}</div>}
  </div>
);

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('oneway');
  const [showHotels, setShowHotels] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    fromCode: '',
    toCode: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'more'>('cheapest');
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({ airports: true });
  const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredFromCities = mockCities.filter(city =>
    city.name.toLowerCase().includes(fromFilter.toLowerCase()) ||
    city.code.toLowerCase().includes(fromFilter.toLowerCase()) ||
    city.country.toLowerCase().includes(fromFilter.toLowerCase())
  );

  const filteredToCities = mockCities.filter(city =>
    city.name.toLowerCase().includes(toFilter.toLowerCase()) ||
    city.code.toLowerCase().includes(toFilter.toLowerCase()) ||
    city.country.toLowerCase().includes(toFilter.toLowerCase())
  );

  const handleSearch = async () => {
    if (!formData.from || !formData.to) return;
    setIsSearching(true);
    setHasSearched(false);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const results = generateMockResults(formData.fromCode, formData.toCode, formData.departDate, formData.returnDate, tripType);
    setSearchResults(results);
    setIsSearching(false);
    setHasSearched(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const closeResults = () => {
    setHasSearched(false);
    setSearchResults([]);
  };

  const toggleFilter = (key: string) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDetail = (id: number) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedResults = [...searchResults].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'fastest') {
      const aDur = parseInt(a.duration);
      const bDur = parseInt(b.duration);
      return aDur - bDur;
    }
    return 0;
  });

  const prevDayPrice = searchResults.length > 0 ? formatPrice(Math.floor(searchResults[0].price * 0.92)) : '0';
  const nextDayPrice = searchResults.length > 0 ? formatPrice(Math.floor(searchResults[0].price * 0.85)) : '0';
  const currentDate = formData.departDate
    ? new Date(formData.departDate).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' })
    : '15 Fev 2026, Baz';

  return (
    <>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 leading-tight">
            {t('hero.title')}
          </h1>

          <div className="mt-16 w-full mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Tabs */}
              <div className="flex flex-wrap justify-center mb-6 border-b border-gray-200">
                <button data-testid="tab-flight" onClick={() => setActiveTab('flight')}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'flight' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
                  <Plane className="w-5 h-5" /><span>{t('hero.flight')}</span>
                </button>
                <button data-testid="tab-hotel" onClick={() => setActiveTab('hotel')}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'hotel' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
                  <Building className="w-5 h-5" /><span>{t('hero.hotel')}</span>
                </button>
                <button data-testid="tab-tour" onClick={() => setActiveTab('tour')}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'tour' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
                  <Camera className="w-5 h-5" /><span>{t('hero.tour')}</span>
                </button>
              </div>

              {/* Trip Type */}
              {activeTab === 'flight' && (
                <div className="flex items-center space-x-6 mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="tripType" value="oneway" checked={tripType === 'oneway'} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 font-medium">{t('hero.oneWay')}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="tripType" value="roundtrip" checked={tripType === 'roundtrip'} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 font-medium">{t('hero.roundTrip')}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="tripType" value="multicity" checked={tripType === 'multicity'} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 font-medium">{t('hero.multiCity')}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer ml-8">
                    <input type="checkbox" checked={showHotels} onChange={(e) => setShowHotels(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-gray-700">{t('hero.nonStop')}</span>
                  </label>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* From */}
                <div className="lg:col-span-2" ref={fromRef}>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"><MapPin className="w-5 h-5" /></div>
                    <input data-testid="input-from" type="text" placeholder={t('hero.from')} value={formData.from}
                      onChange={(e) => { handleInputChange('from', e.target.value); setFromFilter(e.target.value); setShowFromDropdown(true); }}
                      onFocus={() => { setShowFromDropdown(true); setFromFilter(formData.from); }}
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                    />
                    {showFromDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                        {filteredFromCities.map((city) => (
                          <button key={city.code} data-testid={`from-city-${city.code}`}
                            onClick={() => { handleInputChange('from', city.name); handleInputChange('fromCode', city.code); setFromFilter(city.name); setShowFromDropdown(false); }}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-3 border-b border-gray-50 last:border-b-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><Plane className="w-5 h-5 text-blue-600" /></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">{city.name}</span>
                                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{city.code}</span>
                              </div>
                              <div className="text-xs text-gray-500 truncate">{city.airport}</div>
                              <div className="text-xs text-gray-400">{city.country}</div>
                            </div>
                          </button>
                        ))}
                        {filteredFromCities.length === 0 && <div className="px-4 py-6 text-center text-gray-500 text-sm">Nəticə tapılmadı</div>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Swap */}
                <div className="lg:col-span-1 flex items-center justify-center">
                  <button data-testid="swap-button" onClick={() => {
                    const tempName = formData.from; const tempCode = formData.fromCode;
                    setFormData(prev => ({ ...prev, from: prev.to, fromCode: prev.toCode, to: tempName, toCode: tempCode }));
                    setFromFilter(formData.to); setToFilter(tempName);
                  }} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* To */}
                <div className="lg:col-span-2" ref={toRef}>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"><MapPin className="w-5 h-5" /></div>
                    <input data-testid="input-to" type="text" placeholder={t('hero.to')} value={formData.to}
                      onChange={(e) => { handleInputChange('to', e.target.value); setToFilter(e.target.value); setShowToDropdown(true); }}
                      onFocus={() => { setShowToDropdown(true); setToFilter(formData.to); }}
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                    />
                    {showToDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                        {filteredToCities.map((city) => (
                          <button key={city.code} data-testid={`to-city-${city.code}`}
                            onClick={() => { handleInputChange('to', city.name); handleInputChange('toCode', city.code); setToFilter(city.name); setShowToDropdown(false); }}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-3 border-b border-gray-50 last:border-b-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><Plane className="w-5 h-5 text-blue-600" /></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">{city.name}</span>
                                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{city.code}</span>
                              </div>
                              <div className="text-xs text-gray-500 truncate">{city.airport}</div>
                              <div className="text-xs text-gray-400">{city.country}</div>
                            </div>
                          </button>
                        ))}
                        {filteredToCities.length === 0 && <div className="px-4 py-6 text-center text-gray-500 text-sm">Nəticə tapılmadı</div>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Departure Date */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Calendar className="w-5 h-5" /></div>
                    <input data-testid="input-depart-date" type="date" value={formData.departDate}
                      onChange={(e) => handleInputChange('departDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium cursor-pointer"
                    />
                    <div className="absolute left-10 top-1 text-xs text-gray-500 font-medium">{t('hero.departDate')}</div>
                  </div>
                </div>

                {/* Return Date */}
                {tripType === 'roundtrip' ? (
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Calendar className="w-5 h-5" /></div>
                      <input type="date" value={formData.returnDate} onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium" />
                      <div className="absolute left-10 top-1 text-xs text-gray-500 font-medium">{t('hero.addReturn')}</div>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-2">
                    <button onClick={() => setTripType('roundtrip')} className="w-full h-full flex items-center justify-center space-x-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-100 transition-colors duration-200 font-medium">
                      <span>+</span><span>Qayıdış əlavə et</span>
                    </button>
                  </div>
                )}

                {/* Passengers */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Users className="w-5 h-5" /></div>
                    <select value={formData.passengers} onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium appearance-none">
                      {[1, 2, 3, 4, 5, 6].map(num => (<option key={num} value={num}>{num} Sərnişin / Ekonom</option>))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"><ChevronDown className="w-5 h-5" /></div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-3">
                  <button data-testid="search-button" onClick={handleSearch} disabled={isSearching || !formData.from || !formData.to}
                    className="w-full h-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center px-4">
                    {isSearching ? (
                      <div className="flex items-center space-x-2"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Axtarılır...</span></div>
                    ) : (
                      <><span className="lg:inline">{t('hero.findCheapTicket')}</span><ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-600 text-sm">{t('hero.listHotels')}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===================== SEARCH RESULTS ===================== */}
      {hasSearched && sortedResults.length > 0 && (
        <section ref={resultsRef} data-testid="search-results" className="bg-[#f0f3f8] dark:bg-gray-800 py-0">
          {/* Date Navigation Bar */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
              <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span>Əvvəlki gün <strong>${prevDayPrice}</strong></span>
              </button>
              <span className="text-base font-semibold text-gray-800">{currentDate}</span>
              <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors">
                <span>Sonrakı gün <strong>${nextDayPrice}</strong></span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-6">

              {/* ========== LEFT SIDEBAR ========== */}
              <div className="w-72 flex-shrink-0 hidden lg:block">
                {/* Favorites */}
                <button className="w-full flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Axtarışı Favorilərə Əlavə Et</span>
                </button>

                {/* Price Alert */}
                <button className="w-full flex items-center justify-between bg-white border-2 border-green-500 rounded-lg px-4 py-3 mb-4 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span>Qiymət Siqnalı yarat</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900 text-sm">Filtr</span>
                    <button className="text-blue-600 text-xs font-medium hover:underline">Təmizlə</button>
                  </div>

                  <div className="px-3">
                    <FilterSection icon={<Filter className="w-4 h-4" />} label="Ötürmə" isOpen={!!openFilters.stops} onToggle={() => toggleFilter('stops')}>
                      <div className="space-y-2 pl-7">
                        <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span>Ötürməsiz</span></label>
                        <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span>1 Ötürmə</span></label>
                        <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded border-gray-300 text-blue-600" /><span>2+ Ötürmə</span></label>
                      </div>
                    </FilterSection>

                    <FilterSection icon={<Luggage className="w-4 h-4" />} label="Baqaj" isOpen={!!openFilters.baggage} onToggle={() => toggleFilter('baggage')} />
                    <FilterSection icon={<CreditCard className="w-4 h-4" />} label="Bilet qiyməti" isOpen={!!openFilters.price} onToggle={() => toggleFilter('price')} />
                    <FilterSection icon={<Clock className="w-4 h-4" />} label="Uçuş / eniş saatları" isOpen={!!openFilters.times} onToggle={() => toggleFilter('times')} />
                    <FilterSection icon={<Timer className="w-4 h-4" />} label="Uçuş müddəti" isOpen={!!openFilters.duration} onToggle={() => toggleFilter('duration')} />

                    <FilterSection icon={<Plane className="w-4 h-4" />} label="Aviaşirkətlər" isOpen={!!openFilters.airlines} onToggle={() => toggleFilter('airlines')}>
                      <div className="space-y-2 pl-7">
                        {airlineData.map(a => (
                          <label key={a.name} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span>{a.name}</span>
                          </label>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection icon={<SlidersHorizontal className="w-4 h-4" />} label="Hava limanları" isOpen={!!openFilters.airports} onToggle={() => toggleFilter('airports')}>
                      <div className="space-y-1 pl-7">
                        <div className="flex justify-between text-xs mb-2">
                          <button className="text-blue-600 hover:underline font-medium">Hamısını seç</button>
                          <button className="text-gray-400 hover:underline">Heç birini seçmə</button>
                        </div>
                        {[
                          `${formData.from} - ${mockCities.find(c => c.code === formData.fromCode)?.airport?.slice(0, 28) || 'Havalimanı'}`,
                          `${formData.to} - ${mockCities.find(c => c.code === formData.toCode)?.airport?.slice(0, 28) || 'Havalimanı'}`,
                        ].map((ap, i) => (
                          <label key={i} className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer py-1">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span className="truncate">{ap}</span>
                          </label>
                        ))}
                      </div>
                    </FilterSection>
                  </div>
                </div>
              </div>

              {/* ========== MAIN RESULTS ========== */}
              <div className="flex-1 min-w-0">
                {/* Sort Tabs + Close */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <button onClick={() => setSortBy('cheapest')} data-testid="sort-cheapest"
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${sortBy === 'cheapest' ? 'bg-[#1a3c5e] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                      {sortBy === 'cheapest' && <span className="mr-1">&#10003;</span>}Ən ucuz
                    </button>
                    <button onClick={() => setSortBy('fastest')} data-testid="sort-fastest"
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${sortBy === 'fastest' ? 'bg-[#1a3c5e] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                      Ən sürətli
                    </button>
                    <button onClick={() => setSortBy('more')}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1 ${sortBy === 'more' ? 'bg-[#1a3c5e] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                      <SlidersHorizontal className="w-3.5 h-3.5" /><span>Daha çox</span>
                    </button>
                  </div>
                  <button data-testid="close-results" onClick={closeResults} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  <div className="col-span-3">Aviaşirkət</div>
                  <div className="col-span-2">Uçuş Detalı</div>
                  <div className="col-span-3">Uçuş</div>
                  <div className="col-span-2 text-right">Qiymət</div>
                  <div className="col-span-2"></div>
                </div>

                {/* Flight Cards */}
                <div className="space-y-3">
                  {sortedResults.map((result) => (
                    <div key={result.id} data-testid={`flight-result-${result.id}`} className="relative">
                      {/* Direct flight banner */}
                      {result.isDirect && (
                        <div className="flex items-center">
                          <div className="bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-t-lg flex items-center space-x-1.5">
                            <Plane className="w-3.5 h-3.5" />
                            <span>Birbaşa uçun, vaxt qazanın!</span>
                          </div>
                          {result.isBusinessClass && (
                            <div className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-t-lg ml-0 flex items-center space-x-1">
                              <Plane className="w-3 h-3" />
                              <span>Business Class</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className={`bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow ${result.isDirect ? 'border-blue-200 rounded-tl-none' : 'border-gray-200'} ${result.isSponsored ? 'border-blue-300 shadow-sm' : ''}`}>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
                          {/* Airline + Route */}
                          <div className="col-span-3 p-5 border-r border-gray-100">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: airlineData.find(a => a.name === result.airline)?.color || '#333' }}>
                                <Plane className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{result.airline}</span>
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                              {result.fromCode}
                              {result.stopCodes.length > 0 && result.stopCodes.map((sc, i) => (
                                <span key={i}> &rsaquo; {sc}</span>
                              ))}
                              <span> &rsaquo; {result.toCode}</span>
                            </div>
                            <div className={`text-xs font-semibold mt-1 ${result.isDirect ? 'text-green-600' : 'text-red-500'}`}>
                              {result.isDirect ? 'Birbaşa Uçuş' : `${result.stops} Ötürmə`}
                            </div>
                          </div>

                          {/* Baggage */}
                          <div className="col-span-2 p-5 border-r border-gray-100">
                            <div className="flex items-center space-x-1.5 text-sm text-gray-600">
                              <Luggage className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{result.baggage}</span>
                            </div>
                          </div>

                          {/* Times */}
                          <div className="col-span-3 p-5 border-r border-gray-100">
                            <div className="flex items-center justify-center space-x-1 relative">
                              <Plane className="w-4 h-4 text-gray-300 absolute -top-4 left-1/2 -translate-x-1/2" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-gray-900">{result.departTime}</span>
                              <span className="text-gray-400">&rarr;</span>
                              <span className="text-xl font-bold text-gray-900">{result.arriveTime}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{result.duration}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-span-2 p-5 text-right">
                            <div className="text-2xl font-bold text-gray-900">${formatPrice(result.price)}</div>
                          </div>

                          {/* Select Button */}
                          <div className="col-span-2 p-5 flex items-center justify-center">
                            <button data-testid={`select-flight-${result.id}`}
                              onClick={() => navigate('/checkout', { state: { flight: result } })}
                              className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center space-x-1">
                              <span>Seç</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Detail Toggle + Sponsor */}
                        <div className="flex items-center justify-between px-5 pb-3 pt-0">
                          <button onClick={() => toggleDetail(result.id)} className="text-blue-600 text-xs font-medium hover:underline flex items-center space-x-1">
                            <span>Ətraflı</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${expandedDetails[result.id] ? 'rotate-180' : ''}`} />
                          </button>
                          {result.isSponsored && (
                            <span className="text-[10px] text-gray-400 italic">*Sponsorlu Reklam</span>
                          )}
                        </div>

                        {/* Expanded Detail */}
                        {expandedDetails[result.id] && (
                          <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
                            <div className="py-3 space-y-2">
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span className="font-semibold">{result.departTime}</span>
                                <span>{formData.from} ({result.fromCode})</span>
                              </div>
                              <div className="ml-3 pl-4 border-l-2 border-dashed border-gray-300 py-2 text-xs text-gray-500">
                                Uçuş müddəti: {result.duration} &middot; {result.airline} &middot; Baqaj: {result.baggage}
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span className="font-semibold">{result.arriveTime}</span>
                                <span>{formData.to} ({result.toCode})</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Flight Deals Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Plane className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('deals.title')}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/20 px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Yeni İl Fürsətləri</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Xarici</button>
              <button className="text-gray-600 hover:text-gray-700 font-medium">Daxili</button>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                <span>Hamısını gör</span><ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { route: 'Bakı - İstanbul', dates: '9 Dekabr - 14 Dekabr', type: 'Gedış - Qayıdış', airline: 'AZAL', originalPrice: '$285', price: '$199', discount: '%28', image: 'https://images.pexels.com/photos/1717859/pexels-photo-1717859.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop' },
              { route: 'Bakı - Dubai', dates: '5 Dekabr', type: 'Tək istiqamət', airline: 'Emirates', originalPrice: '$115', price: '$79', discount: '%28', image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop' },
              { route: 'Bakı - Moskva', dates: '26 Noyabr - 1 Dekabr', type: 'Gedış - Qayıdış', airline: 'AZAL', originalPrice: '$289', price: '$205', discount: '%28', image: 'https://images.pexels.com/photos/1548024/pexels-photo-1548024.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop' },
              { route: 'Bakı - Antalya', dates: '4 Dekabr', type: 'Tək istiqamət', airline: 'Turkish Airlines', originalPrice: '$129', price: '$89', discount: '%29', image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop' },
            ].map((flight, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="relative h-48 overflow-hidden">
                  <img src={flight.image} alt={flight.route} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{flight.route}</div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">{flight.discount}</div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{flight.dates}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{flight.type}</div>
                  <div className="flex items-center space-x-2 mb-3"><Plane className="w-4 h-4 text-orange-500" /><span className="text-sm font-medium text-gray-900 dark:text-white">{flight.airline}</span></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">55 dəq əvvəl əlavə edildi</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-through">{flight.originalPrice}*</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{flight.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">* Son bir ayın orta qiymətidir.</div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DateRangePicker
        isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)}
        onSelectDates={(checkIn, checkOut) => { setFormData(prev => ({ ...prev, departDate: checkIn, returnDate: checkOut })); }}
        initialCheckIn={formData.departDate} initialCheckOut={formData.returnDate}
      />
    </>
  );
};

export default HeroSection;
