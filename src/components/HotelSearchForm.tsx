import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, ChevronDown, Building, MapPin, Search, Moon, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Child {
  age: number;
}

interface CountryData {
  name: string;
  cities: CityData[];
}

interface CityData {
  name: string;
  districts: string[];
  hotels: string[];
}

const countriesData: CountryData[] = [
  {
    name: 'Türkiye',
    cities: [
      {
        name: 'Antalya',
        districts: ['Belek', 'Lara', 'Kemer', 'Alanya', 'Side', 'Manavgat', 'Kaş', 'Kundu'],
        hotels: ['Maxx Royal Belek Golf Resort', 'Titanic Mardan Palace', 'Voyage Belek Golf & Spa', 'Delphin Imperial Lara', 'Rixos Premium Belek', 'Granada Luxury Belek', 'Regnum Carya Golf & Spa', 'Calista Luxury Resort']
      },
      {
        name: 'İstanbul',
        districts: ['Sultanahmet', 'Taksim', 'Beşiktaş', 'Kadıköy', 'Beyoğlu', 'Şişli', 'Bakırköy'],
        hotels: ['Four Seasons Bosphorus', 'Çırağan Palace Kempinski', 'Raffles Istanbul', 'St. Regis Istanbul', 'Shangri-La Bosphorus']
      },
      {
        name: 'Bodrum',
        districts: ['Yalıkavak', 'Türkbükü', 'Gümüşlük', 'Bitez', 'Gündoğan', 'Ortakent'],
        hotels: ['Mandarin Oriental Bodrum', 'The Bodrum EDITION', 'Caresse Bodrum', 'Kempinski Hotel Barbaros Bay', 'LUX* Bodrum Resort']
      },
      {
        name: 'İzmir',
        districts: ['Çeşme', 'Alaçatı', 'Foça', 'Dikili', 'Seferihisar'],
        hotels: ['Swissôtel Büyük Efes', 'Alaçatı Beach Resort', 'Sheraton Çeşme', 'Radisson Blu İzmir']
      },
      {
        name: 'Muğla',
        districts: ['Fethiye', 'Marmaris', 'Dalaman', 'Köyceğiz', 'Datça', 'Ölüdeniz'],
        hotels: ['Hilton Dalaman Resort', 'Liberty Hotels Fethiye', 'D-Resort Grand Azur Marmaris', 'TUI BLUE Şarıgerme']
      }
    ]
  },
  {
    name: 'Azərbaycan',
    cities: [
      {
        name: 'Bakı',
        districts: ['İçərişəhər', 'Nəsimi', 'Səbail', 'Xətai', 'Yasamal'],
        hotels: ['Four Seasons Baku', 'Fairmont Baku', 'JW Marriott Absheron', 'Hilton Baku', 'Boulevard Hotel Baku']
      },
      {
        name: 'Qəbələ',
        districts: ['Qəbələ Mərkəz', 'Tufandağ', 'Vəndam'],
        hotels: ['Qafqaz Riverside Hotel', 'Qafqaz Tufandağ Resort', 'Chenot Palace Health Wellness Hotel']
      },
      {
        name: 'Şəki',
        districts: ['Şəki Mərkəz', 'Kiş'],
        hotels: ['Şəki Saray Hotel', 'Marxal Resort & Spa']
      }
    ]
  },
  {
    name: 'Gürcüstan',
    cities: [
      {
        name: 'Tbilisi',
        districts: ['Köhnə Tbilisi', 'Vake', 'Saburtalo', 'Avlabari'],
        hotels: ['Rooms Hotel Tbilisi', 'Radisson Blu Iveria', 'Biltmore Hotel Tbilisi']
      },
      {
        name: 'Batumi',
        districts: ['Batumi Bulvarı', 'Mərkəz', 'Gonio'],
        hotels: ['Hilton Batumi', 'Sheraton Batumi', 'Radisson Blu Batumi']
      }
    ]
  },
  {
    name: 'BƏƏ',
    cities: [
      {
        name: 'Dubai',
        districts: ['Downtown', 'Palm Jumeirah', 'Marina', 'Deira', 'Jumeirah Beach'],
        hotels: ['Burj Al Arab', 'Atlantis The Palm', 'Jumeirah Beach Hotel', 'Armani Hotel Dubai']
      },
      {
        name: 'Abu Dhabi',
        districts: ['Yas Island', 'Saadiyat Island', 'Corniche'],
        hotels: ['Emirates Palace', 'Yas Viceroy Abu Dhabi', 'St. Regis Saadiyat Island']
      }
    ]
  }
];

const HotelSearchForm: React.FC = () => {
  const { t } = useLanguage();
  
  // State
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState<Child[]>([]);
  
  // Filter/search text
  const [countryFilter, setCountryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [hotelFilter, setHotelFilter] = useState('');
  
  // Dropdown visibility
  const [showCountry, setShowCountry] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showHotel, setShowHotel] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  
  // Refs
  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const hotelRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setShowCountry(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setShowCity(false);
      if (hotelRef.current && !hotelRef.current.contains(e.target as Node)) setShowHotel(false);
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) setShowGuests(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Calculate nights when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const diff = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24));
      setNights(diff > 0 ? diff : 0);
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  // Update check-out when nights change manually
  const handleNightsChange = (n: number) => {
    if (n < 1) return;
    setNights(n);
    if (checkIn) {
      const d = new Date(checkIn);
      d.setDate(d.getDate() + n);
      setCheckOut(d.toISOString().split('T')[0]);
    }
  };

  // Get available cities based on selected country
  const availableCities = selectedCountry
    ? countriesData.find(c => c.name === selectedCountry)?.cities || []
    : countriesData.flatMap(c => c.cities);

  // Get current city data
  const currentCity = availableCities.find(c => c.name === selectedCity);

  // Get available hotels - search across all if no city selected
  const availableHotels = selectedCity
    ? (currentCity?.hotels || [])
    : countriesData.flatMap(c => c.cities.flatMap(ci => ci.hotels));
  const availableDistricts = currentCity?.districts || [];

  // Filtered lists based on search text
  const filteredCountries = countriesData.filter(c =>
    c.name.toLowerCase().includes(countryFilter.toLowerCase())
  );
  const filteredCities = availableCities.filter(city =>
    city.name.toLowerCase().includes(cityFilter.toLowerCase()) ||
    city.districts.some(d => d.toLowerCase().includes(cityFilter.toLowerCase()))
  );
  const filteredHotels = availableHotels.filter(h =>
    h.toLowerCase().includes(hotelFilter.toLowerCase())
  );

  // Add/remove children
  const addChild = () => {
    if (children.length < 4) {
      setChildren([...children, { age: 1 }]);
    }
  };
  const removeChild = () => {
    if (children.length > 0) {
      setChildren(children.slice(0, -1));
    }
  };
  const updateChildAge = (index: number, age: number) => {
    const updated = [...children];
    updated[index] = { age };
    setChildren(updated);
  };

  // Reset downstream when country changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCountryFilter(country);
    setSelectedCity('');
    setCityFilter('');
    setSelectedDistrict('');
    setSelectedHotel('');
    setHotelFilter('');
    setShowCountry(false);
  };

  const handleCityChange = (city: string, district?: string) => {
    setSelectedCity(city);
    setCityFilter(district ? `${city} - ${district}` : city);
    setSelectedDistrict(district || '');
    setSelectedHotel('');
    setHotelFilter('');
    setShowCity(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      {/* Row 1: Country, City, Hotel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Country */}
        <div ref={countryRef} className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Ülkə / Country</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              value={countryFilter}
              placeholder="Ülkə yazın və ya seçin"
              onChange={(e) => { setCountryFilter(e.target.value); setShowCountry(true); if (!e.target.value) { setSelectedCountry(''); setSelectedCity(''); setCityFilter(''); setSelectedHotel(''); setHotelFilter(''); } }}
              onFocus={() => setShowCountry(true)}
              className="w-full pl-10 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
            />
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${showCountry ? 'rotate-180' : ''}`} />
          </div>
          {showCountry && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
              {filteredCountries.map(country => (
                <button key={country.name} onClick={() => handleCountryChange(country.name)}
                  className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center space-x-3 border-b border-gray-50 last:border-b-0 ${selectedCountry === country.name ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`}>
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium">{country.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{country.cities.length} şəhər</span>
                </button>
              ))}
              {filteredCountries.length === 0 && <div className="px-4 py-4 text-center text-gray-500 text-sm">Nəticə tapılmadı</div>}
            </div>
          )}
        </div>

        {/* City + District */}
        <div ref={cityRef} className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Şəhər / City</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              value={cityFilter}
              placeholder="Şəhər və ya ilçə yazın"
              onChange={(e) => { setCityFilter(e.target.value); setShowCity(true); if (!e.target.value) { setSelectedCity(''); setSelectedDistrict(''); } }}
              onFocus={() => setShowCity(true)}
              className="w-full pl-10 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
            />
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${showCity ? 'rotate-180' : ''}`} />
          </div>
          {showCity && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
              {filteredCities.map(city => (
                <div key={city.name}>
                  <button
                    onClick={() => handleCityChange(city.name)}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors font-semibold text-gray-900 border-b border-gray-100 flex items-center justify-between ${selectedCity === city.name ? 'bg-blue-50 text-blue-700' : ''}`}>
                    <span>{city.name}</span>
                    <span className="text-xs text-gray-400">{city.districts.length} ilçə</span>
                  </button>
                  {city.districts.filter(d => !cityFilter || city.name.toLowerCase().includes(cityFilter.toLowerCase()) || d.toLowerCase().includes(cityFilter.toLowerCase())).map(district => (
                    <button key={district}
                      onClick={() => handleCityChange(city.name, district)}
                      className={`w-full text-left px-8 py-2 hover:bg-blue-50 transition-colors text-sm border-b border-gray-50 ${selectedCity === city.name && selectedDistrict === district ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'}`}>
                      ↳ {district}
                    </button>
                  ))}
                </div>
              ))}
              {filteredCities.length === 0 && <div className="px-4 py-4 text-center text-gray-500 text-sm">Nəticə tapılmadı</div>}
            </div>
          )}
        </div>

        {/* Hotels */}
        <div ref={hotelRef} className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Otel / Hotel</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              value={hotelFilter}
              placeholder="Otel adı yazın"
              onChange={(e) => { setHotelFilter(e.target.value); setShowHotel(true); if (!e.target.value) setSelectedHotel(''); }}
              onFocus={() => setShowHotel(true)}
              className="w-full pl-10 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
            />
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${showHotel ? 'rotate-180' : ''}`} />
          </div>
          {showHotel && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
              <button onClick={() => { setSelectedHotel(''); setHotelFilter(''); setShowHotel(false); }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                Hamısı (Bütün otellər)
              </button>
              {filteredHotels.map(hotel => (
                <button key={hotel} onClick={() => { setSelectedHotel(hotel); setHotelFilter(hotel); setShowHotel(false); }}
                  className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm border-b border-gray-50 ${selectedHotel === hotel ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'}`}>
                  🏨 {hotel}
                </button>
              ))}
              {filteredHotels.length === 0 && <div className="px-4 py-4 text-center text-gray-500 text-sm">Otel tapılmadı</div>}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Check-in, Nights, Check-out, Guests, Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Check-in */}
        <div className="lg:col-span-3">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="date" value={checkIn} min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium cursor-pointer"
            />
          </div>
        </div>

        {/* Nights */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Gecə / Nights</label>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
            <Moon className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            <button onClick={() => handleNightsChange(Math.max(1, nights - 1))}
              className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-lg transition-colors">−</button>
            <span className="flex-1 text-center text-xl font-bold text-gray-900">{nights}</span>
            <button onClick={() => handleNightsChange(nights + 1)}
              className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-lg transition-colors">+</button>
          </div>
        </div>

        {/* Check-out */}
        <div className="lg:col-span-3">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="date" value={checkOut} min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium cursor-pointer"
            />
          </div>
        </div>

        {/* Guest Selection */}
        <div className="lg:col-span-2" ref={guestRef}>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Qonaqlar / Guests</label>
          <div className="relative">
            <button onClick={() => setShowGuests(!showGuests)}
              className="w-full flex items-center justify-between pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-lg font-medium hover:border-blue-300 transition-colors relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <span className="text-sm">{adults} Böyük{children.length > 0 ? `, ${children.length} Uşaq` : ''}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showGuests ? 'rotate-180' : ''}`} />
            </button>
            {showGuests && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4 min-w-[280px]">
                {/* Adults */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-medium text-gray-900">Böyük (Adults)</span>
                    <p className="text-xs text-gray-500">12+ yaş</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">−</button>
                    <span className="w-6 text-center font-bold text-gray-900">{adults}</span>
                    <button onClick={() => setAdults(Math.min(6, adults + 1))}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">+</button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-medium text-gray-900">Uşaq (Children)</span>
                    <p className="text-xs text-gray-500">0-11 yaş</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={removeChild}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">−</button>
                    <span className="w-6 text-center font-bold text-gray-900">{children.length}</span>
                    <button onClick={addChild}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors">+</button>
                  </div>
                </div>

                {/* Children Ages */}
                {children.length > 0 && (
                  <div className="border-t border-gray-100 pt-3 mt-2 space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Uşaq Yaşları</p>
                    <div className="grid grid-cols-2 gap-2">
                      {children.map((child, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 w-16">{idx + 1}. Uşaq:</span>
                          <select value={child.age} onChange={(e) => updateChildAge(idx, parseInt(e.target.value))}
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

                <button onClick={() => setShowGuests(false)}
                  className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Təsdiq et
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-2 flex items-end">
          <button
            disabled={!selectedCountry || !checkIn || !checkOut || nights < 1}
            className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Axtar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchForm;
