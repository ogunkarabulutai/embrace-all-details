import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Globe, ChevronRight, Search, Plane } from 'lucide-react';

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

const airports: Airport[] = [
  { code: 'GYD', name: 'Heydər Əliyev Beynəlxalq Hava Limanı', city: 'Bakı', country: 'Azərbaycan' },
  { code: 'GBJ', name: 'Qəbələ Beynəlxalq Hava Limanı', city: 'Qəbələ', country: 'Azərbaycan' },
  { code: 'NAJ', name: 'Naxçıvan Beynəlxalq Hava Limanı', city: 'Naxçıvan', country: 'Azərbaycan' },
  { code: 'GNJ', name: 'Gəncə Beynəlxalq Hava Limanı', city: 'Gəncə', country: 'Azərbaycan' },
  { code: 'IST', name: 'İstanbul Havalimanı', city: 'İstanbul', country: 'Türkiyə' },
  { code: 'SAW', name: 'Sabiha Gökçen Havalimanı', city: 'İstanbul', country: 'Türkiyə' },
  { code: 'AYT', name: 'Antalya Havalimanı', city: 'Antalya', country: 'Türkiyə' },
  { code: 'ADB', name: 'Adnan Menderes Havalimanı', city: 'İzmir', country: 'Türkiyə' },
  { code: 'ESB', name: 'Esenboğa Havalimanı', city: 'Ankara', country: 'Türkiyə' },
  { code: 'BJV', name: 'Milas-Bodrum Havalimanı', city: 'Bodrum', country: 'Türkiyə' },
  { code: 'DXB', name: 'Dubai Beynəlxalq Hava Limanı', city: 'Dubai', country: 'BƏƏ' },
  { code: 'SVO', name: 'Şeremetyevo Hava Limanı', city: 'Moskva', country: 'Rusiya' },
  { code: 'LHR', name: 'Heathrow Hava Limanı', city: 'London', country: 'Böyük Britaniya' },
  { code: 'CDG', name: 'Charles de Gaulle Hava Limanı', city: 'Paris', country: 'Fransa' },
  { code: 'FRA', name: 'Frankfurt Hava Limanı', city: 'Frankfurt', country: 'Almaniya' },
  { code: 'FCO', name: 'Fiumicino Hava Limanı', city: 'Roma', country: 'İtaliya' },
  { code: 'TBS', name: 'Tbilisi Beynəlxalq Hava Limanı', city: 'Tbilisi', country: 'Gürcüstan' },
  { code: 'IKA', name: 'İmam Xomeyni Hava Limanı', city: 'Tehran', country: 'İran' },
];

interface CountryGroup {
  country: string;
  cities: {
    city: string;
    airports: Airport[];
  }[];
}

interface AirportSelectorProps {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (airport: Airport) => void;
  testId?: string;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ label, placeholder, value, onSelect, testId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const grouped = useMemo((): CountryGroup[] => {
    const normalize = (s: string) => s.toLocaleLowerCase('tr-TR');
    const q = normalize(search);
    const filtered = airports.filter(a =>
      normalize(a.name).includes(q) ||
      normalize(a.code).includes(q) ||
      normalize(a.city).includes(q) ||
      normalize(a.country).includes(q)
    );

    const countryMap: Record<string, Record<string, Airport[]>> = {};
    for (const a of filtered) {
      if (!countryMap[a.country]) countryMap[a.country] = {};
      if (!countryMap[a.country][a.city]) countryMap[a.country][a.city] = [];
      countryMap[a.country][a.city].push(a);
    }

    return Object.entries(countryMap).map(([country, cities]) => ({
      country,
      cities: Object.entries(cities).map(([city, aps]) => ({ city, airports: aps })),
    }));
  }, [search]);

  const totalAirports = (group: CountryGroup) =>
    group.cities.reduce((sum, c) => sum + c.airports.length, 0);

  return (
    <div ref={ref} className="relative">
      <label className="absolute left-10 top-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide z-10">
        {label}
      </label>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
        <MapPin className="w-5 h-5" />
      </div>
      <input
        ref={inputRef}
        data-testid={testId}
        type="text"
        readOnly
        value={value}
        placeholder={placeholder}
        onClick={() => { setIsOpen(true); setSearch(''); }}
        className="w-full pl-10 pr-4 pt-7 pb-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium cursor-pointer"
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[380px] overflow-hidden flex flex-col min-w-[340px]">
          {/* Search */}
          <div className="flex items-center px-3 py-2.5 border-b border-gray-100 gap-2">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search airport, city or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          {/* Tree */}
          <div className="overflow-y-auto flex-1">
            {grouped.length === 0 && (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">Nəticə tapılmadı</div>
            )}
            {grouped.map((group) => (
              <div key={group.country}>
                {/* Country row */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/60">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900 text-sm">{group.country}</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    {totalAirports(group) === 1 ? '1 airport' : `${totalAirports(group)} airports`}
                  </span>
                </div>

                {group.cities.map((cityGroup) => (
                  <div key={cityGroup.city}>
                    {/* City row */}
                    <div className="flex items-center justify-between pl-8 pr-4 py-2 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{cityGroup.city}</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {cityGroup.airports.length === 1 ? '1 airport' : `${cityGroup.airports.length} airports`}
                      </span>
                    </div>

                    {/* Airport rows */}
                    {cityGroup.airports.map((airport) => (
                      <button
                        key={airport.code}
                        data-testid={testId ? `${testId}-${airport.code}` : undefined}
                        onClick={() => {
                          onSelect(airport);
                          setIsOpen(false);
                        }}
                        className="w-full text-left pl-14 pr-4 py-2 hover:bg-blue-50 transition-colors flex items-center gap-2 border-b border-gray-50 last:border-0"
                      >
                        <Plane className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span className="text-xs font-bold text-blue-600 font-mono">{airport.code}</span>
                        <span className="text-sm text-gray-700 truncate">{airport.name}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportSelector;
export { airports };
export type { Airport };
