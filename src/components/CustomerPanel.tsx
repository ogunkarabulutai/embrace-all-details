import React, { useState } from 'react';
import { X, Plane, Hotel, MapPin, Calendar, Clock, Users, ChevronDown, ChevronUp, Tag, CheckCircle, XCircle } from 'lucide-react';

interface CustomerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockReservations = [
  {
    id: 'RES-20240101',
    type: 'tour',
    title: 'Antalya Yay Turu',
    destination: 'Antalya, Türkiyə',
    status: 'confirmed',
    startDate: '15 İyul 2026',
    endDate: '22 İyul 2026',
    nights: 7,
    guests: 2,
    price: 2500,
    currency: 'AZN',
    hotel: 'Maxx Royal Belek Golf Resort',
    outboundFlight: 'J2 101 · GYD → AYT · 08:00–09:30',
    returnFlight: 'J2 102 · AYT → GYD · 11:00–13:00',
    meals: 'Ultra All Inclusive',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop',
  },
  {
    id: 'RES-20240202',
    type: 'tour',
    title: 'Dubai Lüks Turu',
    destination: 'Dubai, BƏƏ',
    status: 'confirmed',
    startDate: '20 Mart 2026',
    endDate: '25 Mart 2026',
    nights: 5,
    guests: 2,
    price: 3360,
    currency: 'AZN',
    hotel: 'Atlantis The Palm',
    outboundFlight: 'EK 135 · GYD → DXB · 09:00–12:30',
    returnFlight: 'EK 136 · DXB → GYD · 14:00–18:00',
    meals: 'Half Board',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=200&fit=crop',
  },
  {
    id: 'RES-20240303',
    type: 'hotel',
    title: 'Tbilisi Otel',
    destination: 'Tbilisi, Gürcüstan',
    status: 'pending',
    startDate: '05 May 2026',
    endDate: '09 May 2026',
    nights: 4,
    guests: 1,
    price: 480,
    currency: 'AZN',
    hotel: 'Rooms Hotel Tbilisi',
    outboundFlight: '',
    returnFlight: '',
    meals: 'Breakfast Included',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=200&fit=crop',
  },
];

const statusLabel: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
  confirmed: {
    text: 'Təsdiqləndi',
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  pending: {
    text: 'Gözləmədə',
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  cancelled: {
    text: 'Ləğv edildi',
    color: 'bg-red-100 text-red-700',
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const CustomerPanel: React.FC<CustomerPanelProps> = ({ isOpen, onClose }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'tour' | 'hotel'>('all');

  const filtered = mockReservations.filter(r =>
    activeTab === 'all' ? true : r.type === activeTab
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-orange-500 to-orange-600">
          <div>
            <h2 className="text-white text-lg font-bold">Müştəri Paneli</h2>
            <p className="text-orange-100 text-sm">Rezervasiyalarım</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 px-6 py-4 bg-orange-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{mockReservations.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Ümumi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {mockReservations.filter(r => r.status === 'confirmed').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Təsdiqləndi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {mockReservations.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Gözləmədə</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-4 gap-2">
          {(['all', 'tour', 'hotel'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab === 'all' ? 'Hamısı' : tab === 'tour' ? 'Turlar' : 'Otellər'}
            </button>
          ))}
        </div>

        {/* Reservations List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Rezervasiya tapılmadı</p>
            </div>
          )}

          {filtered.map(res => {
            const s = statusLabel[res.status] || statusLabel['pending'];
            const isExpanded = expandedId === res.id;

            return (
              <div
                key={res.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
              >
                {/* Card Header Image + Info */}
                <div className="relative h-28 overflow-hidden">
                  <img src={res.image} alt={res.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-end justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm">{res.title}</div>
                      <div className="flex items-center gap-1 text-orange-200 text-xs">
                        <MapPin className="w-3 h-3" />
                        {res.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-base">{res.price.toLocaleString()} {res.currency}</div>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>
                        {s.icon} {s.text}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Details */}
                <div className="px-4 py-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    {res.startDate} – {res.endDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    {res.nights} gecə
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    {res.guests} qonaq
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-orange-500" />
                    #{res.id}
                  </span>
                </div>

                {/* Expand Toggle */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : res.id)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span>{isExpanded ? 'Daha az göstər' : 'Ətraflı məlumat'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                    {/* Hotel */}
                    <div className="pt-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        <Hotel className="w-3.5 h-3.5" /> Otel
                      </div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{res.hotel}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{res.meals}</div>
                    </div>

                    {/* Flights */}
                    {(res.outboundFlight || res.returnFlight) && (
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          <Plane className="w-3.5 h-3.5" /> Uçuşlar
                        </div>
                        <div className="space-y-2">
                          {res.outboundFlight && (
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-2">
                              <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <Plane className="w-3 h-3 text-orange-500" />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-800 dark:text-gray-100">{res.outboundFlight}</div>
                                <div className="text-xs text-gray-400">Gediş uçuşu</div>
                              </div>
                            </div>
                          )}
                          {res.returnFlight && (
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                <Plane className="w-3 h-3 text-blue-500 scale-x-[-1]" />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-800 dark:text-gray-100">{res.returnFlight}</div>
                                <div className="text-xs text-gray-400">Qayıdış uçuşu</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 py-2 rounded-lg border border-orange-400 text-orange-500 text-xs font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                        Ləğv et
                      </button>
                      <button className="flex-1 py-2 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors">
                        Dəstək
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-xs text-center text-gray-400">
            Sual üçün: <span className="text-orange-500">+994 12 441 12 62</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerPanel;
