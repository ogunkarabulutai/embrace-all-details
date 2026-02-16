import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plane, Building, Camera, MapPin, Calendar, Users, ChevronDown, ChevronLeft, ChevronRight, Clock, X, Heart, Bell, Filter, Luggage, CreditCard, Timer, SlidersHorizontal } from 'lucide-react';
import BookingModal from './BookingModal';
import DateRangePicker from './DateRangePicker';
import HotelSearchForm from './HotelSearchForm';
import AirportSelector, { airports } from './AirportSelector';
import type { Airport } from './AirportSelector';
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
  fromAirport: string;
  to: string;
  toCode: string;
  toAirport: string;
  airline: string;
  flightCode: string;
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
  cabinClass: string;
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

    const flightCodePrefix = airline.name.substring(0, 2).toUpperCase();
    const flightCodeNum = 100 + Math.floor(Math.random() * 900);

    results.push({
      id: i + 1,
      from: mockCities.find(c => c.code === fromCode)?.name || fromCode,
      fromCode,
      fromAirport: mockCities.find(c => c.code === fromCode)?.airport || fromCode,
      to: mockCities.find(c => c.code === toCode)?.name || toCode,
      toCode,
      toAirport: mockCities.find(c => c.code === toCode)?.airport || toCode,
      airline: airline.name,
      flightCode: `${flightCodePrefix}-${flightCodeNum}`,
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
      cabinClass: i === 1 ? 'business' : 'economy',
    });
  }

  return results.sort((a, b) => a.price - b.price);
};

const getStopCity = (code: string) => mockCities.find(c => c.code === code);

const renderFlightTimeline = (result: SearchResult, dateLabel: string, isReturn = false) => {
  const from = isReturn ? result.to : result.from;
  const fromCode = isReturn ? result.toCode : result.fromCode;
  const fromAirport = isReturn ? result.toAirport : result.fromAirport;
  const to = isReturn ? result.from : result.to;
  const toCode = isReturn ? result.fromCode : result.toCode;
  const toAirport = isReturn ? result.fromAirport : result.toAirport;

  if (result.stops === 0) {
    return (
      <div className="relative pl-5 space-y-0">
        <div className="flex items-start relative">
          <div className="absolute left-[-14px] top-1.5 w-3 h-3 rounded-full bg-yellow-400 z-10" />
          <div className="pb-6">
            <div className="text-sm font-bold text-gray-900">{result.departTime}  {from}</div>
            <div className="text-xs text-gray-500">{dateLabel}</div>
            <div className="text-xs text-gray-500">{fromAirport}, {fromCode}</div>
          </div>
        </div>
        <div className="absolute left-[-8px] top-5 bottom-5 w-0.5 bg-yellow-300" />
        <div className="pl-2 pb-6"><span className="text-xs text-gray-500">{result.duration}</span></div>
        <div className="flex items-start relative">
          <div className="absolute left-[-14px] top-1.5 w-3 h-3 rounded-full bg-yellow-400 z-10" />
          <div>
            <div className="text-sm font-bold text-gray-900">{result.arriveTime}  {to}</div>
            <div className="text-xs text-gray-500">{dateLabel}</div>
            <div className="text-xs text-gray-500">{toAirport}, {toCode}</div>
          </div>
        </div>
      </div>
    );
  }

  // Multi-leg with stops
  const legs: { fromCity: string; fromAirport: string; fromCode: string; toCity: string; toAirport: string; toCode: string; departTime: string; arriveTime: string; duration: string; flightCode: string }[] = [];
  const totalMinutes = parseInt(result.duration);
  const durationParts = result.duration.match(/(\d+)sa\s*(\d+)dk/);
  const totalMins = durationParts ? parseInt(durationParts[1]) * 60 + parseInt(durationParts[2]) : 180;
  const stopoverMins = 60 + Math.floor(Math.random() * 90); // 1-2.5h stopover
  const flightMinsPerLeg = Math.floor((totalMins - stopoverMins * result.stops) / (result.stops + 1));

  let currentDepartTime = result.departTime;
  const prefix = result.flightCode.split('-')[0];

  for (let i = 0; i <= result.stops; i++) {
    const legFrom = i === 0 ? { name: from, airport: fromAirport, code: fromCode } : { name: getStopCity(result.stopCodes[i - 1])?.name || result.stopCodes[i - 1], airport: getStopCity(result.stopCodes[i - 1])?.airport || 'Hava Limanı', code: result.stopCodes[i - 1] };
    const legTo = i === result.stops ? { name: to, airport: toAirport, code: toCode } : { name: getStopCity(result.stopCodes[i])?.name || result.stopCodes[i], airport: getStopCity(result.stopCodes[i])?.airport || 'Hava Limanı', code: result.stopCodes[i] };

    const [dH, dM] = currentDepartTime.split(':').map(Number);
    const arrMins = dH * 60 + dM + flightMinsPerLeg;
    const arrH = Math.floor(arrMins / 60) % 24;
    const arrM = arrMins % 60;
    const arriveTime = `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`;

    const legH = Math.floor(flightMinsPerLeg / 60);
    const legM = flightMinsPerLeg % 60;

    legs.push({
      fromCity: legFrom.name, fromAirport: legFrom.airport, fromCode: legFrom.code,
      toCity: legTo.name, toAirport: legTo.airport, toCode: legTo.code,
      departTime: currentDepartTime, arriveTime,
      duration: `${legH}sa ${legM}dk`,
      flightCode: `${prefix}-${100 + Math.floor(Math.random() * 900)}`,
    });

    // Next leg departs after stopover
    const nextDepartMins = arrMins + stopoverMins;
    const nextH = Math.floor(nextDepartMins / 60) % 24;
    const nextM = nextDepartMins % 60;
    currentDepartTime = `${String(nextH).padStart(2, '0')}:${String(nextM).padStart(2, '0')}`;
  }

  return (
    <div className="space-y-0">
      {legs.map((leg, idx) => (
        <div key={idx}>
          {idx > 0 && (
            <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 my-3 flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">
                {Math.floor(stopoverMins / 60)}sa {stopoverMins % 60}dk aktarma · {getStopCity(result.stopCodes[idx - 1])?.name || result.stopCodes[idx - 1]}
              </span>
            </div>
          )}
          <div className="mb-2">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-5 h-5 rounded bg-gray-600 flex items-center justify-center text-white text-[8px] font-bold">{prefix}</div>
              <span className="text-xs font-semibold text-gray-700">Uçuş {leg.flightCode}</span>
            </div>
          </div>
          <div className="relative pl-5 space-y-0">
            <div className="flex items-start relative">
              <div className="absolute left-[-14px] top-1.5 w-3 h-3 rounded-full bg-yellow-400 z-10" />
              <div className="pb-5">
                <div className="text-sm font-bold text-gray-900">{leg.departTime}  {leg.fromCity}</div>
                <div className="text-xs text-gray-500">{dateLabel}</div>
                <div className="text-xs text-gray-500">{leg.fromAirport}, {leg.fromCode}</div>
              </div>
            </div>
            <div className="absolute left-[-8px] top-5 bottom-5 w-0.5 bg-yellow-300" />
            <div className="pl-2 pb-5"><span className="text-xs text-gray-500">{leg.duration}</span></div>
            <div className="flex items-start relative">
              <div className="absolute left-[-14px] top-1.5 w-3 h-3 rounded-full bg-yellow-400 z-10" />
              <div>
                <div className="text-sm font-bold text-gray-900">{leg.arriveTime}  {leg.toCity}</div>
                <div className="text-xs text-gray-500">{dateLabel}</div>
                <div className="text-xs text-gray-500">{leg.toAirport}, {leg.toCode}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
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
    class: 'economy',
    cabinClass: 'economy'
  });

  const [showFromDropdown, setShowFromDropdown] = useState(false); // kept for swap logic
  const [showToDropdown, setShowToDropdown] = useState(false); // kept for swap logic
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'more'>('cheapest');
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({ airports: true });

  // Flight passenger state (hotel-style)
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState<{ age: number }[]>([]);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState('');
  const [showAirlineDropdown, setShowAirlineDropdown] = useState(false);
  const [airlineFilter, setAirlineFilter] = useState('');
  const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});
  const [selectedOutbound, setSelectedOutbound] = useState<Record<string, number>>({});
  const [selectedReturn, setSelectedReturn] = useState<Record<string, number>>({});
  const [departTimeRange, setDepartTimeRange] = useState<[number, number]>([0, 1439]); // minutes from midnight
  const [arriveTimeRange, setArriveTimeRange] = useState<[number, number]>([0, 1439]);
  const [returnDepartTimeRange, setReturnDepartTimeRange] = useState<[number, number]>([0, 1439]);
  const [returnArriveTimeRange, setReturnArriveTimeRange] = useState<[number, number]>([0, 1439]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [stopsFilter, setStopsFilter] = useState<'all' | 'oneStop'>('all');

  // Tour country searchable dropdown state
  const [tourCountry, setTourCountry] = useState('');
  const [tourCountryFilter, setTourCountryFilter] = useState('');
  const [showTourCountryDropdown, setShowTourCountryDropdown] = useState(false);

  const tourCountries = [
    { value: 'turkey', label: 'Türkiyə' },
    { value: 'egypt', label: 'Misir' },
    { value: 'uae', label: 'BƏƏ' },
    { value: 'georgia', label: 'Gürcüstan' },
    { value: 'thailand', label: 'Tayland' },
    { value: 'maldives', label: 'Maldiv' },
    { value: 'greece', label: 'Yunanıstan' },
    { value: 'spain', label: 'İspaniya' },
    { value: 'italy', label: 'İtaliya' },
    { value: 'montenegro', label: 'Monteneqro' },
  ];

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);
  const airlineRef = useRef<HTMLDivElement>(null);
  const tourCountryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
      if (airlineRef.current && !airlineRef.current.contains(event.target as Node)) {
        setShowAirlineDropdown(false);
      }
      if (tourCountryRef.current && !tourCountryRef.current.contains(event.target as Node)) {
        setShowTourCountryDropdown(false);
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
    const maxP = Math.max(...results.map(r => r.price));
    setPriceRange([0, maxP]);
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

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const minutesToTime = (m: number) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  };

  const filteredByTime = searchResults.filter((r) => {
    const dep = timeToMinutes(r.departTime);
    const arr = timeToMinutes(r.arriveTime);
    if (stopsFilter === 'oneStop' && r.stops !== 1) return false;
    return dep >= departTimeRange[0] && dep <= departTimeRange[1] &&
           arr >= arriveTimeRange[0] && arr <= arriveTimeRange[1] &&
           r.price >= priceRange[0] && r.price <= priceRange[1];
  });

  const filteredReturnFlights = searchResults.filter((r) => {
    const dep = timeToMinutes(r.departTime);
    const arr = timeToMinutes(r.arriveTime);
    if (stopsFilter === 'oneStop' && r.stops !== 1) return false;
    return dep >= returnDepartTimeRange[0] && dep <= returnDepartTimeRange[1] &&
           arr >= returnArriveTimeRange[0] && arr <= returnArriveTimeRange[1] &&
           r.price >= priceRange[0] && r.price <= priceRange[1];
  });

  const sortedResults = [...filteredByTime].sort((a, b) => {
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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-visible">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
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

              {/* Trip Type & Cabin Class */}
              {activeTab === 'flight' && (
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="tripType" value="oneway" checked={tripType === 'oneway'} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="text-gray-700 font-medium">{t('hero.oneWay')}</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="tripType" value="roundtrip" checked={tripType === 'roundtrip'} onChange={(e) => setTripType(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="text-gray-700 font-medium">{t('hero.roundTrip')}</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    {[
                      { value: 'economy', label: 'Ekonom' },
                      { value: 'premium', label: 'Premium' },
                      { value: 'business', label: 'Biznes' },
                      { value: 'first', label: 'Birinci' },
                    ].map((cabin) => (
                      <button
                        key={cabin.value}
                        onClick={() => handleInputChange('cabinClass', cabin.value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                          formData.cabinClass === cabin.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cabin.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hotel Tab */}
              {activeTab === 'hotel' && (
                <HotelSearchForm />
              )}

              {/* Tour Tab */}
              {activeTab === 'tour' && (
                <div className="space-y-4">
                  {/* Row 1: Departure Town, State, Airlines, Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Departure Town */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Çıxış Şəhəri / Departure Town</label>
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input type="text" placeholder="Şəhər seçin" className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium" />
                    </div>
                    {/* State */}
                    <div className="relative" ref={tourCountryRef}>
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Ölkə / State</label>
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input
                        type="text"
                        value={tourCountryFilter}
                        placeholder="Ölkə seçin"
                        onChange={(e) => { setTourCountryFilter(e.target.value); setShowTourCountryDropdown(true); if (!e.target.value) setTourCountry(''); }}
                        onFocus={() => setShowTourCountryDropdown(true)}
                        className="w-full pl-10 pr-10 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium"
                      />
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${showTourCountryDropdown ? 'rotate-180' : ''}`} />
                      {showTourCountryDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-52 overflow-y-auto">
                          {tourCountries.filter(c => c.label.toLowerCase().includes(tourCountryFilter.toLowerCase())).map(country => (
                            <button key={country.value} onClick={() => { setTourCountry(country.value); setTourCountryFilter(country.label); setShowTourCountryDropdown(false); }}
                              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm border-b border-gray-50 ${tourCountry === country.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'}`}>
                              {country.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Airlines */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Aviaşirkət / Airlines</label>
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <select className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium appearance-none">
                        <option value="">Hamısı</option>
                        {airlineData.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                      </select>
                    </div>
                    {/* Guests */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Qonaqlar / Guests</label>
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <select className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium appearance-none">
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Qonaq</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Departure From, Departure To, Nights From, Nights To, Search */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                    {/* Departure From */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Gediş / Departure From</label>
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input type="date" className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium cursor-pointer" />
                    </div>
                    {/* Departure To */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Gediş Son / Departure To</label>
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input type="date" className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium cursor-pointer" />
                    </div>
                    {/* Nights From */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Gecə (Min) / Nights From</label>
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <select className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium appearance-none">
                        {Array.from({length: 14}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} gecə</option>)}
                      </select>
                    </div>
                    {/* Nights To */}
                    <div className="relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Gecə (Max) / Nights To</label>
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <select className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium appearance-none">
                        {Array.from({length: 14}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} gecə</option>)}
                      </select>
                    </div>
                    {/* Search Button */}
                    <div>
                      <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                        <span>Tur Axtar</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Flight Form Fields */}
              {activeTab === 'flight' && (
              <>
              {/* Row 1: From, Swap, To, Dates */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_1fr_1fr] gap-3 items-end">
                {/* From */}
                <div>
                  <AirportSelector
                    label="Haradan / From"
                    placeholder={t('hero.from')}
                    value={formData.from}
                    testId="input-from"
                    onSelect={(airport: Airport) => {
                      const isSingle = airport.code && !airport.code.includes(',');
                      const displayValue = isSingle ? `${airport.city} (${airport.code})` : airport.name;
                      handleInputChange('from', displayValue);
                      handleInputChange('fromCode', airport.code);
                      setFromFilter(airport.code ? airport.city : airport.country);
                    }}
                  />
                </div>

                {/* Swap */}
                <div className="flex items-end justify-center pb-3">
                  <button data-testid="swap-button" onClick={() => {
                    const tempName = formData.from; const tempCode = formData.fromCode;
                    setFormData(prev => ({ ...prev, from: prev.to, fromCode: prev.toCode, to: tempName, toCode: tempCode }));
                    setFromFilter(formData.to); setToFilter(tempName);
                  }} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </button>
                </div>

                {/* To */}
                <div>
                  <AirportSelector
                    label="Haraya / To"
                    placeholder={t('hero.to')}
                    value={formData.to}
                    testId="input-to"
                    onSelect={(airport: Airport) => {
                      const isSingle = airport.code && !airport.code.includes(',');
                      const displayValue = isSingle ? `${airport.city} (${airport.code})` : airport.name;
                      handleInputChange('to', displayValue);
                      handleInputChange('toCode', airport.code);
                      setToFilter(airport.code ? airport.city : airport.country);
                    }}
                  />
                </div>

                {/* Departure Date */}
                <div>
                  <div className="relative">
                    <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">{t('hero.departDate')}</label>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Calendar className="w-5 h-5" /></div>
                    <input data-testid="input-depart-date" type="date" value={formData.departDate}
                      onChange={(e) => handleInputChange('departDate', e.target.value)}
                      className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium cursor-pointer"
                    />
                  </div>
                </div>

                {/* Return Date */}
                <div>
                  {tripType === 'roundtrip' ? (
                    <div>
                      <div className="relative">
                        <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">{t('hero.addReturn')}</label>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Calendar className="w-5 h-5" /></div>
                        <input type="date" value={formData.returnDate} onChange={(e) => handleInputChange('returnDate', e.target.value)}
                          className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium cursor-pointer" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => setTripType('roundtrip')} className="w-full pt-7 pb-2 flex items-center justify-center space-x-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-100 transition-colors duration-200 font-medium">
                        <span>+</span><span>Qayıdış əlavə et</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Guests, Airlines, Search */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4 items-end">
                {/* Guests */}
                <div className="lg:col-span-3" ref={passengerRef}>
                  <div className="relative">
                    <button onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                      className="w-full flex items-center justify-between pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-base font-medium hover:border-blue-300 transition-colors relative">
                      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide pointer-events-none">Qonaqlar / Guests</label>
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <span className="text-sm">{flightAdults} Böyük{flightChildren.length > 0 ? `, ${flightChildren.length} Uşaq` : ''}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showPassengerDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showPassengerDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4 min-w-[280px]">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-medium text-gray-900">Böyük (Adults)</span>
                            <p className="text-xs text-gray-500">12+ yaş</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button onClick={() => setFlightAdults(Math.max(1, flightAdults - 1))}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">−</button>
                            <span className="w-6 text-center font-bold text-gray-900">{flightAdults}</span>
                            <button onClick={() => setFlightAdults(Math.min(6, flightAdults + 1))}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-medium text-gray-900">Uşaq (Children)</span>
                            <p className="text-xs text-gray-500">0-11 yaş</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button onClick={() => { if (flightChildren.length > 0) setFlightChildren(flightChildren.slice(0, -1)); }}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">−</button>
                            <span className="w-6 text-center font-bold text-gray-900">{flightChildren.length}</span>
                            <button onClick={() => { if (flightChildren.length < 4) setFlightChildren([...flightChildren, { age: 1 }]); }}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">+</button>
                          </div>
                        </div>
                        {flightChildren.length > 0 && (
                          <div className="border-t border-gray-100 pt-3 mt-2 space-y-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase">Uşaq Yaşları</p>
                            <div className="grid grid-cols-2 gap-2">
                              {flightChildren.map((child, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500 w-16">{idx + 1}. Uşaq:</span>
                                  <select value={child.age} onChange={(e) => { const updated = [...flightChildren]; updated[idx] = { age: parseInt(e.target.value) }; setFlightChildren(updated); }}
                                    className="flex-1 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {Array.from({ length: 12 }, (_, i) => (
                                      <option key={i} value={i}>{i} yaş</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <button onClick={() => setShowPassengerDropdown(false)}
                          className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Təsdiq et
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Airlines (Optional) */}
                <div className="lg:col-span-4" ref={airlineRef}>
                  <div className="relative">
                    <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">Aviaşirkət / Airlines</label>
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input
                      type="text"
                      value={airlineFilter}
                      placeholder="Aviaşirkət seçin (istəyə bağlı)"
                      onChange={(e) => { setAirlineFilter(e.target.value); setShowAirlineDropdown(true); if (!e.target.value) setSelectedAirline(''); }}
                      onFocus={() => setShowAirlineDropdown(true)}
                      className="w-full pl-10 pr-10 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium"
                    />
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${showAirlineDropdown ? 'rotate-180' : ''}`} />
                    {showAirlineDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-52 overflow-y-auto">
                        <button onClick={() => { setSelectedAirline(''); setAirlineFilter(''); setShowAirlineDropdown(false); }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                          Hamısı (Bütün aviaşirkətlər)
                        </button>
                        {airlineData.filter(a => a.name.toLowerCase().includes(airlineFilter.toLowerCase())).map(airline => (
                          <button key={airline.name} onClick={() => { setSelectedAirline(airline.name); setAirlineFilter(airline.name); setShowAirlineDropdown(false); }}
                            className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm border-b border-gray-50 flex items-center space-x-3 ${selectedAirline === airline.name ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'}`}>
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: airline.color }} />
                            <span>{airline.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* List Hotels Checkbox */}
                <div className="lg:col-span-2 flex items-center pb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-gray-600 text-sm">{t('hero.listHotels')}</span>
                  </label>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-3">
                  <button data-testid="search-button" onClick={handleSearch} disabled={isSearching || !formData.from || !formData.to}
                    className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center px-4">
                    {isSearching ? (
                      <div className="flex items-center space-x-2"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Axtarılır...</span></div>
                    ) : (
                      <><span className="lg:inline">{t('hero.findCheapTicket')}</span><ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </button>
                </div>
              </div>
              </>
              )}
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
      {hasSearched && searchResults.length > 0 && (
        <section ref={resultsRef} data-testid="search-results" className="bg-[#f0f3f8] dark:bg-gray-800 py-0">
          {/* Date Navigation Bar - hidden for now */}

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

                {/* Sort By */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                  <div className="px-4 py-3">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sırala</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]">
                      <option value="price-asc">Qiymət: Aşağıdan Yuxarıya</option>
                      <option value="price-desc">Qiymət: Yuxarıdan Aşağıya</option>
                      <option value="duration">Müddət: Ən Qısa</option>
                      <option value="departure">Kalkış: Ən Erkən</option>
                    </select>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900 text-sm">Filtr</span>
                    <button className="text-blue-600 text-xs font-medium hover:underline" onClick={() => {
                      setDepartTimeRange([0, 1439]);
                      setArriveTimeRange([0, 1439]);
                      setReturnDepartTimeRange([0, 1439]);
                      setReturnArriveTimeRange([0, 1439]);
                      const maxP = Math.max(...searchResults.map(r => r.price));
                      setPriceRange([0, maxP]);
                      setSortBy('cheapest');
                      setStopsFilter('all');
                    }}>Təmizlə</button>
                  </div>

                  <div className="px-3">
                    <FilterSection icon={<CreditCard className="w-4 h-4" />} label="Bilet qiyməti" isOpen={!!openFilters.price} onToggle={() => toggleFilter('price')}>
                      <div className="pl-2 pr-1">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>{priceRange[0]} AZN</span>
                          <span className="text-gray-500">{priceRange[1]} AZN</span>
                        </div>
                        <div className="relative h-6">
                          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-gray-200" />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-green-500"
                            style={{
                              left: `${(priceRange[0] / (Math.max(...searchResults.map(r => r.price)) || 1)) * 100}%`,
                              right: `${100 - (priceRange[1] / (Math.max(...searchResults.map(r => r.price)) || 1)) * 100}%`,
                            }}
                          />
                          <input
                            type="range" min={0} max={Math.max(...searchResults.map(r => r.price)) || 1000} step={1}
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                            className="dual-range-input absolute inset-0 w-full h-full z-20"
                          />
                          <input
                            type="range" min={0} max={Math.max(...searchResults.map(r => r.price)) || 1000} step={1}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                            className="dual-range-input absolute inset-0 w-full h-full z-20"
                          />
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection icon={<Plane className="w-4 h-4" />} label={t('filter.stops')} isOpen={!!openFilters.stops} onToggle={() => toggleFilter('stops')}>
                      <div className="space-y-2 pl-7">
                        <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                          <input type="radio" name="stopsFilter" checked={stopsFilter === 'all'} onChange={() => setStopsFilter('all')} className="text-blue-600 border-gray-300" />
                          <span>{t('filter.allFlights')}</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                          <input type="radio" name="stopsFilter" checked={stopsFilter === 'oneStop'} onChange={() => setStopsFilter('oneStop')} className="text-blue-600 border-gray-300" />
                          <span>{t('filter.oneStop')}</span>
                        </label>
                      </div>
                    </FilterSection>

                    <FilterSection icon={<Clock className="w-4 h-4" />} label="Gediş kalkış / varış saatları" isOpen={!!openFilters.times} onToggle={() => toggleFilter('times')}>
                      <div className="pl-2 pr-1 space-y-4">
                        {/* Departure */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>Kalkış, {formData.from || 'Şəhər'} | {formData.fromCode || '—'}</span>
                            <span className="text-gray-500">{minutesToTime(departTimeRange[0])} ilə {minutesToTime(departTimeRange[1])} arası</span>
                          </div>
                          <div className="relative h-6">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-gray-200" />
                            <div
                              className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-green-500"
                              style={{
                                left: `${(departTimeRange[0] / 1439) * 100}%`,
                                right: `${100 - (departTimeRange[1] / 1439) * 100}%`,
                              }}
                            />
                            <input
                              type="range" min={0} max={1439} step={1}
                              value={departTimeRange[0]}
                              onChange={(e) => setDepartTimeRange([Math.min(Number(e.target.value), departTimeRange[1]), departTimeRange[1]])}
                              className="dual-range-input absolute inset-0 w-full h-full z-20"
                            />
                            <input
                              type="range" min={0} max={1439} step={1}
                              value={departTimeRange[1]}
                              onChange={(e) => setDepartTimeRange([departTimeRange[0], Math.max(Number(e.target.value), departTimeRange[0])])}
                              className="dual-range-input absolute inset-0 w-full h-full z-20"
                            />
                          </div>
                        </div>

                        {/* Arrival */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>Eniş, {formData.to || 'Şəhər'} | {formData.toCode || '—'}</span>
                            <span className="text-gray-500">{minutesToTime(arriveTimeRange[0])} ilə {minutesToTime(arriveTimeRange[1])} arası</span>
                          </div>
                          <div className="relative h-6">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-gray-200" />
                            <div
                              className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-green-500"
                              style={{
                                left: `${(arriveTimeRange[0] / 1439) * 100}%`,
                                right: `${100 - (arriveTimeRange[1] / 1439) * 100}%`,
                              }}
                            />
                            <input
                              type="range" min={0} max={1439} step={1}
                              value={arriveTimeRange[0]}
                              onChange={(e) => setArriveTimeRange([Math.min(Number(e.target.value), arriveTimeRange[1]), arriveTimeRange[1]])}
                              className="dual-range-input absolute inset-0 w-full h-full z-20"
                            />
                            <input
                              type="range" min={0} max={1439} step={1}
                              value={arriveTimeRange[1]}
                              onChange={(e) => setArriveTimeRange([arriveTimeRange[0], Math.max(Number(e.target.value), arriveTimeRange[0])])}
                              className="dual-range-input absolute inset-0 w-full h-full z-20"
                            />
                          </div>
                        </div>
                      </div>
                    </FilterSection>

                    {/* Return flight time filters - separate section, only for roundtrip */}
                    {tripType === 'roundtrip' && (
                      <FilterSection icon={<Clock className="w-4 h-4" />} label="Dönüş kalkış / varış saatları" isOpen={!!openFilters.returnTimes} onToggle={() => toggleFilter('returnTimes')}>
                        <div className="pl-2 pr-1 space-y-4">
                          {/* Return Departure */}
                          <div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                              <span>Dönüş kalkış, {formData.to || 'Şəhər'} | {formData.toCode || '—'}</span>
                              <span className="text-gray-500">{minutesToTime(returnDepartTimeRange[0])} ilə {minutesToTime(returnDepartTimeRange[1])} arası</span>
                            </div>
                            <div className="relative h-6">
                              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-gray-200" />
                              <div
                                className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-green-500"
                                style={{
                                  left: `${(returnDepartTimeRange[0] / 1439) * 100}%`,
                                  right: `${100 - (returnDepartTimeRange[1] / 1439) * 100}%`,
                                }}
                              />
                              <input
                                type="range" min={0} max={1439} step={1}
                                value={returnDepartTimeRange[0]}
                                onChange={(e) => setReturnDepartTimeRange([Math.min(Number(e.target.value), returnDepartTimeRange[1]), returnDepartTimeRange[1]])}
                                className="dual-range-input absolute inset-0 w-full h-full z-20"
                              />
                              <input
                                type="range" min={0} max={1439} step={1}
                                value={returnDepartTimeRange[1]}
                                onChange={(e) => setReturnDepartTimeRange([returnDepartTimeRange[0], Math.max(Number(e.target.value), returnDepartTimeRange[0])])}
                                className="dual-range-input absolute inset-0 w-full h-full z-20"
                              />
                            </div>
                          </div>

                          {/* Return Arrival */}
                          <div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                              <span>Dönüş eniş, {formData.from || 'Şəhər'} | {formData.fromCode || '—'}</span>
                              <span className="text-gray-500">{minutesToTime(returnArriveTimeRange[0])} ilə {minutesToTime(returnArriveTimeRange[1])} arası</span>
                            </div>
                            <div className="relative h-6">
                              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-gray-200" />
                              <div
                                className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-green-500"
                                style={{
                                  left: `${(returnArriveTimeRange[0] / 1439) * 100}%`,
                                  right: `${100 - (returnArriveTimeRange[1] / 1439) * 100}%`,
                                }}
                              />
                              <input
                                type="range" min={0} max={1439} step={1}
                                value={returnArriveTimeRange[0]}
                                onChange={(e) => setReturnArriveTimeRange([Math.min(Number(e.target.value), returnArriveTimeRange[1]), returnArriveTimeRange[1]])}
                                className="dual-range-input absolute inset-0 w-full h-full z-20"
                              />
                              <input
                                type="range" min={0} max={1439} step={1}
                                value={returnArriveTimeRange[1]}
                                onChange={(e) => setReturnArriveTimeRange([returnArriveTimeRange[0], Math.max(Number(e.target.value), returnArriveTimeRange[0])])}
                                className="dual-range-input absolute inset-0 w-full h-full z-20"
                              />
                            </div>
                          </div>
                        </div>
                      </FilterSection>
                    )}


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

                {/* Flight Cards - Grouped by airline */}
                <div className="space-y-5">
                  {sortedResults.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                      <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">Seçilən saat aralığında uçuş tapılmadı</p>
                      <p className="text-xs text-gray-400 mt-1">Filtr aralığını genişləndərək yenidən yoxlayın</p>
                    </div>
                  ) : (() => {
                    const grouped = sortedResults.reduce<Record<string, SearchResult[]>>((acc, r) => {
                      if (!acc[r.airline]) acc[r.airline] = [];
                      acc[r.airline].push(r);
                      return acc;
                    }, {});

                    return Object.entries(grouped).map(([airline, flights]) => {
                      const airlineInfo = airlineData.find(a => a.name === airline);
                      const airlineColor = airlineInfo?.color || '#333';
                      const airlinePrefix = airline.substring(0, 2).toUpperCase();
                      const sortedFlights = [...flights].sort((a, b) => a.departTime.localeCompare(b.departTime));
                      const dateLabel = formData.departDate
                        ? new Date(formData.departDate).toLocaleDateString('az-AZ', { weekday: 'short', day: 'numeric', month: 'short' })
                        : 'Feb 15';
                      const returnDateLabel = formData.returnDate
                        ? new Date(formData.returnDate).toLocaleDateString('az-AZ', { weekday: 'short', day: 'numeric', month: 'short' })
                        : 'Feb 22';
                      const fromCountry = mockCities.find(c => c.code === formData.fromCode)?.country || '';
                      const toCountry = mockCities.find(c => c.code === formData.toCode)?.country || '';
                      const lowestPrice = Math.min(...sortedFlights.map(f => f.price));
                      const totalPrice = tripType === 'roundtrip' ? lowestPrice * 2 : lowestPrice;

                      // One-way card layout
                      if (tripType !== 'roundtrip') {
                        return (
                          <div key={airline} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-600">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">{airlinePrefix}</div>
                                <span className="text-white font-semibold text-xs">{airline}</span>
                              </div>
                              <span className="text-white font-bold text-sm">{formatPrice(lowestPrice)} AZN+</span>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                              <div>
                                <div className="text-base font-bold text-gray-900">{dateLabel}</div>
                                <div className="text-xs text-gray-500">{sortedFlights[0]?.fromCode} → {sortedFlights[0]?.toCode}</div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium px-3 py-1 rounded-full border border-gray-400 text-gray-600">{airline}</span>
                                <div className="w-6 h-6 rounded bg-gray-600 flex items-center justify-center text-white text-[10px] font-bold">{airlinePrefix}</div>
                              </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {sortedFlights.map((result) => (
                                <div key={result.id} data-testid={`flight-result-${result.id}`}>
                                  <div className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => toggleDetail(result.id)}>
                                    <div className="flex items-center space-x-4">
                                      <div className={`w-3 h-3 rounded-full ${expandedDetails[result.id] ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-lg font-bold text-gray-900">{result.departTime}</span>
                                          <span className="text-gray-400">—</span>
                                          <span className="text-lg font-bold text-gray-900">{result.arriveTime}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{result.duration}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm text-gray-600">{result.stops === 0 ? t('filter.directFlight') : `${result.stops} Ötürmə`}</span>
                                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200">
                                        {result.cabinClass === 'business' ? 'Biznes' : result.cabinClass === 'first' ? 'Birinci' : result.cabinClass === 'premium' ? 'Premium' : 'Ekonom'}
                                      </span>
                                      <span className="text-sm font-semibold text-gray-700">{result.flightCode}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <div className="px-3 py-1.5 rounded-lg bg-gray-600 text-white font-bold text-sm">
                                        {formatPrice(result.price)} AZN
                                      </div>
                                      <button onClick={(e) => { e.stopPropagation(); toggleDetail(result.id); }}
                                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${expandedDetails[result.id] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${expandedDetails[result.id] ? 'rotate-180' : ''}`} />
                                      </button>
                                    </div>
                                  </div>
                                  {expandedDetails[result.id] && (
                                    <div className="bg-gray-50 border-t border-gray-100">
                                      <div className="mx-5 my-4 bg-white rounded-xl border border-gray-200 p-5">
                                        <div className="flex items-center space-x-2 mb-3">
                                          <div className="w-6 h-6 rounded bg-gray-600 flex items-center justify-center text-white text-[9px] font-bold">{airlinePrefix}</div>
                                          <span className="text-sm font-semibold text-gray-900">Uçuş {result.flightCode}</span>
                                        </div>
                                        <span className="text-xs font-medium text-green-600 mb-4 block">
                                          {result.cabinClass === 'business' ? 'Biznes sinif' : result.cabinClass === 'first' ? 'Birinci sinif' : result.cabinClass === 'premium' ? 'Premium sinif' : 'Ekonom sinif'}
                                        </span>
                                        {renderFlightTimeline(result, dateLabel)}
                                        <div className="border-t border-gray-200 mt-5 pt-4 flex justify-end">
                                          <button data-testid={`select-flight-${result.id}`} onClick={() => navigate('/checkout', { state: { flight: result } })}
                                            className="px-8 py-2.5 rounded-lg border-2 border-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-50 transition-colors">Seç</button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // ========== ROUND-TRIP CARD LAYOUT ==========
                      const returnFlightsForAirline = filteredReturnFlights.filter(f => f.airline === airline).sort((a, b) => a.departTime.localeCompare(b.departTime));
                      const selectedOut = selectedOutbound[airline] ?? sortedFlights[0]?.id;
                      const selectedRet = selectedReturn[airline] ?? returnFlightsForAirline[0]?.id;
                      const outFlight = sortedFlights.find(f => f.id === selectedOut) || sortedFlights[0];
                      const retFlight = returnFlightsForAirline.find(f => f.id === selectedRet) || returnFlightsForAirline[0];
                      const combinedPrice = (outFlight?.price || 0) + (retFlight?.price || 0);

                      return (
                        <div key={airline} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                          {/* Header Bar */}
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-600">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-white/70 text-[10px]">Gediş:</span>
                                <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-white text-[9px] font-bold">{airlinePrefix}</div>
                                <span className="text-white font-semibold text-xs">{airline}</span>
                              </div>
                              <span className="text-white/50">/</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-white/70 text-[10px]">Qayıdış:</span>
                                <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-white text-[9px] font-bold">{airlinePrefix}</div>
                                <span className="text-white font-semibold text-xs">{airline}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-white text-gray-900 font-bold text-sm px-3 py-1 rounded-lg">{formatPrice(combinedPrice)} AZN</div>
                            </div>
                          </div>

                          {/* Outbound Section */}
                          <div className="px-5 pt-4 pb-2">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Plane className="w-4 h-4 text-gray-500" />
                                <span className="font-semibold text-gray-900">Gediş</span>
                                <span className="text-gray-400 text-sm">· {dateLabel}</span>
                              </div>
                              <span className="text-sm text-gray-500">{fromCountry} → {toCountry}</span>
                            </div>
                            <div className="space-y-2">
                              {sortedFlights.map((result) => (
                                <div key={`out-${result.id}`}>
                                  <div
                                    onClick={() => setSelectedOutbound(prev => ({ ...prev, [airline]: result.id }))}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all border-2 ${
                                      selectedOut === result.id ? 'border-yellow-400 bg-yellow-50/50' : 'border-transparent hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        selectedOut === result.id ? 'border-yellow-400' : 'border-gray-300'
                                      }`}>
                                        {selectedOut === result.id && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                                      </div>
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-lg font-bold text-gray-900">{result.departTime}</span>
                                          <span className="text-gray-400">—</span>
                                          <span className="text-lg font-bold text-gray-900">{result.arriveTime}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{result.duration}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm text-gray-600">{result.stops === 0 ? t('filter.directFlight') : `${result.stops} Ötürmə`}</span>
                                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200">
                                        {result.cabinClass === 'business' ? 'Biznes' : result.cabinClass === 'first' ? 'Birinci' : result.cabinClass === 'premium' ? 'Premium' : 'Ekonom'}
                                      </span>
                                      <span className="text-sm font-semibold text-gray-700">{result.flightCode}</span>
                                      <button onClick={(e) => { e.stopPropagation(); toggleDetail(result.id); }}
                                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${expandedDetails[result.id] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}>
                                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedDetails[result.id] ? 'rotate-180' : ''}`} />
                                      </button>
                                    </div>
                                  </div>
                                  {expandedDetails[result.id] && (
                                    <div className="mx-4 my-2 bg-gray-50 rounded-xl border border-gray-200 p-4">
                                      <span className="text-xs font-medium text-green-600 mb-3 block">
                                        {result.cabinClass === 'business' ? 'Biznes sinif' : result.cabinClass === 'first' ? 'Birinci sinif' : result.cabinClass === 'premium' ? 'Premium sinif' : 'Ekonom sinif'}
                                      </span>
                                      {renderFlightTimeline(result, dateLabel)}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-200 mx-5" />

                          {/* Return Section */}
                          <div className="px-5 pt-4 pb-2">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Plane className="w-4 h-4 text-gray-500 rotate-180" />
                                <span className="font-semibold text-gray-900">Qayıdış</span>
                                <span className="text-gray-400 text-sm">· {returnDateLabel}</span>
                              </div>
                              <span className="text-sm text-gray-500">{toCountry} → {fromCountry}</span>
                            </div>
                            <div className="space-y-2">
                              {returnFlightsForAirline.map((result) => (
                                <div key={`ret-${result.id}`}>
                                  <div
                                    onClick={() => setSelectedReturn(prev => ({ ...prev, [airline]: result.id }))}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all border-2 ${
                                      selectedRet === result.id ? 'border-yellow-400 bg-yellow-50/50' : 'border-transparent hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        selectedRet === result.id ? 'border-yellow-400' : 'border-gray-300'
                                      }`}>
                                        {selectedRet === result.id && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                                      </div>
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-lg font-bold text-gray-900">{result.departTime}</span>
                                          <span className="text-gray-400">—</span>
                                          <span className="text-lg font-bold text-gray-900">{result.arriveTime}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{result.duration}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm text-gray-600">{result.stops === 0 ? t('filter.directFlight') : `${result.stops} Ötürmə`}</span>
                                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200">
                                        {result.cabinClass === 'business' ? 'Biznes' : result.cabinClass === 'first' ? 'Birinci' : result.cabinClass === 'premium' ? 'Premium' : 'Ekonom'}
                                      </span>
                                      <span className="text-sm font-semibold text-gray-700">{result.flightCode}</span>
                                      <button onClick={(e) => { e.stopPropagation(); toggleDetail(result.id + 1000); }}
                                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${expandedDetails[result.id + 1000] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'}`}>
                                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expandedDetails[result.id + 1000] ? 'rotate-180' : ''}`} />
                                      </button>
                                    </div>
                                  </div>
                                  {expandedDetails[result.id + 1000] && (
                                    <div className="mx-4 my-2 bg-gray-50 rounded-xl border border-gray-200 p-4">
                                      <span className="text-xs font-medium text-green-600 mb-3 block">
                                        {result.cabinClass === 'business' ? 'Biznes sinif' : result.cabinClass === 'first' ? 'Birinci sinif' : result.cabinClass === 'premium' ? 'Premium sinif' : 'Ekonom sinif'}
                                      </span>
                                      {renderFlightTimeline(result, returnDateLabel, true)}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Choose Button */}
                          <div className="border-t border-gray-200 px-5 py-4 flex justify-end">
                            <button
                              onClick={() => navigate('/checkout', { state: { flight: outFlight, returnFlight: retFlight, totalPrice: combinedPrice } })}
                              className="px-8 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm transition-colors"
                            >
                              Seç
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
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
