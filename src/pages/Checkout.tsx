import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Clock, Luggage, User, Mail, Phone, CreditCard, Check, ChevronRight, Calendar, AlertCircle, Star, MapPin, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FlightData {
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
  baggage: string;
  price: number;
  departDate: string;
  returnDate?: string;
  type: string;
  isDirect: boolean;
}

interface HotelData {
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
  reviewScore: number;
  reviewCount: number;
  reviewLabel: string;
  freeCancellation: boolean;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
}

interface GuestForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | '';
  nationality: string;
  passportNo: string;
}

const airlineColors: Record<string, string> = {
  'AZAL': '#0066CC',
  'Turkish Airlines': '#CC0000',
  'Pegasus': '#FFB800',
  'Buta Airways': '#00A651',
  'Qatar Airways': '#5C0632',
  'Emirates': '#D71A21',
};

const createEmptyGuest = (): GuestForm => ({
  firstName: '', lastName: '', email: '', phone: '',
  birthDate: '', gender: '', nationality: '', passportNo: '',
});

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const flight = location.state?.flight as FlightData | undefined;
  const hotel = location.state?.hotel as HotelData | undefined;

  const isHotel = !!hotel;
  const totalGuests = isHotel ? (hotel.adults + hotel.children) : 1;

  const [guests, setGuests] = useState<GuestForm[]>(
    Array.from({ length: totalGuests }, () => createEmptyGuest())
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!flight && !hotel) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('checkout.noBooking')}</h2>
          <p className="text-gray-600 mb-6">{t('checkout.noBookingDesc')}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {t('checkout.backToSearch')}
          </button>
        </div>
      </div>
    );
  }

  const handleGuestChange = (index: number, field: keyof GuestForm, value: string) => {
    setGuests(prev => prev.map((g, i) => i === index ? { ...g, [field]: value } : g));
    const errorKey = `${index}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    guests.forEach((guest, i) => {
      if (!guest.firstName.trim()) newErrors[`${i}.firstName`] = t('checkout.required');
      if (!guest.lastName.trim()) newErrors[`${i}.lastName`] = t('checkout.required');
      if (i === 0) {
        if (!guest.email.trim()) newErrors[`${i}.email`] = t('checkout.required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) {
          newErrors[`${i}.email`] = t('checkout.invalidEmail');
        }
        if (!guest.phone.trim()) newErrors[`${i}.phone`] = t('checkout.required');
      }
      if (!guest.birthDate) newErrors[`${i}.birthDate`] = t('checkout.required');
      if (!guest.gender) newErrors[`${i}.gender`] = t('checkout.required');
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  const formatPrice = (price: number): string => price.toLocaleString('en-US');

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' });
  };

  const bookingPrice = isHotel ? hotel.price : flight!.price;

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('checkout.successTitle')}</h2>
          <p className="text-gray-600 mb-6">{isHotel ? t('checkout.hotelSuccessDesc') : t('checkout.successDesc')}</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{t('checkout.reservationNo')}</span>
              <span className="font-mono font-bold text-blue-600">{isHotel ? 'HTL' : 'TKT'}{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{isHotel ? t('checkout.hotel') : t('checkout.route')}</span>
              <span className="font-semibold text-gray-900">
                {isHotel ? hotel.name : `${flight!.fromCode} → ${flight!.toCode}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{t('checkout.passenger')}</span>
              <span className="font-semibold text-gray-900">{guests[0].firstName} {guests[0].lastName}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">{t('checkout.emailSent')} {guests[0].email}</p>
          
          <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full">
            {t('checkout.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const renderGuestForm = (guest: GuestForm, index: number) => {
    const isFirst = index === 0;
    return (
      <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
          <h2 className="text-white font-semibold flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>
              {totalGuests > 1
                ? `${t('checkout.guestN')} ${index + 1} ${index >= (hotel?.adults || 1) ? '(Uşaq)' : ''}`
                : t('checkout.passengerInfo')}
            </span>
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.firstName')} <span className="text-red-500">*</span>
              </label>
              <input type="text" value={guest.firstName}
                onChange={(e) => handleGuestChange(index, 'firstName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`${index}.firstName`] ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('checkout.firstNamePlaceholder')} />
              {errors[`${index}.firstName`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}.firstName`]}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.lastName')} <span className="text-red-500">*</span>
              </label>
              <input type="text" value={guest.lastName}
                onChange={(e) => handleGuestChange(index, 'lastName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`${index}.lastName`] ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('checkout.lastNamePlaceholder')} />
              {errors[`${index}.lastName`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}.lastName`]}</p>}
            </div>

            {/* Email - only for first guest */}
            {isFirst && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('checkout.email')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input type="email" value={guest.email}
                    onChange={(e) => handleGuestChange(index, 'email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`${index}.email`] ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={t('checkout.emailPlaceholder')} />
                </div>
                {errors[`${index}.email`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}.email`]}</p>}
              </div>
            )}

            {/* Phone - only for first guest */}
            {isFirst && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('checkout.phone')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input type="tel" value={guest.phone}
                    onChange={(e) => handleGuestChange(index, 'phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`${index}.phone`] ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="+994 50 123 45 67" />
                </div>
                {errors[`${index}.phone`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}.phone`]}</p>}
              </div>
            )}

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.birthDate')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="date" value={guest.birthDate}
                  onChange={(e) => handleGuestChange(index, 'birthDate', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`${index}.birthDate`] ? 'border-red-500' : 'border-gray-300'}`} />
              </div>
              {errors[`${index}.birthDate`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}.birthDate`]}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.gender')} <span className="text-red-500">*</span>
              </label>
              <select value={guest.gender}
                onChange={(e) => handleGuestChange(index, 'gender', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[`${index}.gender`] ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">{t('checkout.selectGender')}</option>
                <option value="male">{t('checkout.male')}</option>
                <option value="female">{t('checkout.female')}</option>
              </select>
              {errors[`${index}.gender`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}.gender`]}</p>}
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.nationality')}
              </label>
              <input type="text" value={guest.nationality}
                onChange={(e) => handleGuestChange(index, 'nationality', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('checkout.nationalityPlaceholder')} />
            </div>

            {/* Passport No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.passportNo')}
              </label>
              <input type="text" value={guest.passportNo}
                onChange={(e) => handleGuestChange(index, 'passportNo', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AA1234567" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('checkout.back')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('checkout.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Summary + Guest Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            {isHotel ? (
              /* Hotel Summary */
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>{t('checkout.hotelSummary')}</span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex gap-5">
                    <img src={hotel.image} alt={hotel.name} className="w-32 h-24 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg">{hotel.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {hotel.district}, {hotel.city}, {hotel.country}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">{t('checkout.checkIn')}</p>
                      <p className="font-semibold text-gray-900 text-sm">{hotel.checkIn || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('checkout.checkOut')}</p>
                      <p className="font-semibold text-gray-900 text-sm">{hotel.checkOut || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('checkout.nights')}</p>
                      <p className="font-semibold text-gray-900 text-sm">{hotel.nights} {t('checkout.nights')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('checkout.guests')}</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {hotel.adults} böyük{hotel.children > 0 ? `, ${hotel.children} uşaq` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Flight Summary */
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center space-x-2">
                    <Plane className="w-5 h-5" />
                    <span>{t('checkout.flightSummary')}</span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: airlineColors[flight!.airline] || '#333' }}>
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{flight!.airline}</p>
                        <p className={`text-xs ${flight!.isDirect ? 'text-green-600' : 'text-orange-600'}`}>
                          {flight!.isDirect ? t('checkout.directFlight') : `${flight!.stops} ${t('checkout.stops')}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{flight!.type}</p>
                      <p className="text-sm text-gray-600">{formatDate(flight!.departDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{flight!.departTime}</p>
                      <p className="text-sm text-gray-500">{flight!.from}</p>
                      <p className="text-xs text-gray-400">{flight!.fromCode}</p>
                    </div>
                    <div className="flex-1 px-6">
                      <div className="relative">
                        <div className="border-t-2 border-dashed border-gray-300"></div>
                        <Plane className="w-5 h-5 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white" />
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{flight!.duration}</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{flight!.arriveTime}</p>
                      <p className="text-sm text-gray-500">{flight!.to}</p>
                      <p className="text-xs text-gray-400">{flight!.toCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Luggage className="w-4 h-4 text-gray-400" />
                      <span>{flight!.baggage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guest Forms */}
            {guests.map((guest, index) => renderGuestForm(guest, index))}
          </div>

          {/* Right: Price Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-white font-semibold flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>{t('checkout.priceSummary')}</span>
                </h2>
              </div>
              <div className="p-6">
                {/* Booking info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {isHotel ? hotel.name : `${flight!.fromCode} → ${flight!.toCode}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isHotel ? `${hotel.nights} ${t('checkout.nights')} · ${hotel.meals}` : flight!.airline}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">{formatPrice(bookingPrice)} AZN</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('checkout.baseFare')}</span>
                    <span className="text-gray-900">{formatPrice(Math.floor(bookingPrice * 0.85))} AZN</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('checkout.taxes')}</span>
                    <span className="text-gray-900">{formatPrice(Math.floor(bookingPrice * 0.12))} AZN</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('checkout.serviceFee')}</span>
                    <span className="text-gray-900">{formatPrice(Math.floor(bookingPrice * 0.03))} AZN</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-gray-900">{t('checkout.total')}</span>
                  <span className="text-2xl font-bold text-green-600">{formatPrice(bookingPrice)} AZN</span>
                </div>

                {/* Payment Button */}
                <button onClick={handlePayment} disabled={isProcessing}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('checkout.processing')}</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>{t('checkout.payNow')}</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  {t('checkout.securePayment')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
