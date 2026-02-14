import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Clock, Luggage, User, Mail, Phone, CreditCard, Check, ChevronRight, Calendar, AlertCircle } from 'lucide-react';
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

interface PassengerForm {
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

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const flight = location.state?.flight as FlightData | undefined;

  const [passenger, setPassenger] = useState<PassengerForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    nationality: '',
    passportNo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('checkout.noFlight')}</h2>
          <p className="text-gray-600 mb-6">{t('checkout.noFlightDesc')}</p>
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

  const handleInputChange = (field: keyof PassengerForm, value: string) => {
    setPassenger(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passenger.firstName.trim()) newErrors.firstName = t('checkout.required');
    if (!passenger.lastName.trim()) newErrors.lastName = t('checkout.required');
    if (!passenger.email.trim()) newErrors.email = t('checkout.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
      newErrors.email = t('checkout.invalidEmail');
    }
    if (!passenger.phone.trim()) newErrors.phone = t('checkout.required');
    if (!passenger.birthDate) newErrors.birthDate = t('checkout.required');
    if (!passenger.gender) newErrors.gender = t('checkout.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US');
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('az-AZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short'
    });
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('checkout.successTitle')}</h2>
          <p className="text-gray-600 mb-6">{t('checkout.successDesc')}</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{t('checkout.reservationNo')}</span>
              <span className="font-mono font-bold text-blue-600">TKT{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{t('checkout.route')}</span>
              <span className="font-semibold text-gray-900">{flight.fromCode} → {flight.toCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{t('checkout.passenger')}</span>
              <span className="font-semibold text-gray-900">{passenger.firstName} {passenger.lastName}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">{t('checkout.emailSent')} {passenger.email}</p>
          
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full"
          >
            {t('checkout.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('checkout.back')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8" data-testid="checkout-title">
          {t('checkout.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Passenger Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden" data-testid="flight-summary">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-white font-semibold flex items-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span>{t('checkout.flightSummary')}</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: airlineColors[flight.airline] || '#333' }}
                    >
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{flight.airline}</p>
                      <p className={`text-xs ${flight.isDirect ? 'text-green-600' : 'text-orange-600'}`}>
                        {flight.isDirect ? t('checkout.directFlight') : `${flight.stops} ${t('checkout.stops')}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{flight.type}</p>
                    <p className="text-sm text-gray-600">{formatDate(flight.departDate)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{flight.departTime}</p>
                    <p className="text-sm text-gray-500">{flight.from}</p>
                    <p className="text-xs text-gray-400">{flight.fromCode}</p>
                  </div>
                  <div className="flex-1 px-6">
                    <div className="relative">
                      <div className="border-t-2 border-dashed border-gray-300"></div>
                      <Plane className="w-5 h-5 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white" />
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{flight.duration}</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{flight.arriveTime}</p>
                    <p className="text-sm text-gray-500">{flight.to}</p>
                    <p className="text-xs text-gray-400">{flight.toCode}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Luggage className="w-4 h-4 text-gray-400" />
                    <span>{flight.baggage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Information Form */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden" data-testid="passenger-form">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                <h2 className="text-white font-semibold flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{t('checkout.passengerInfo')}</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.firstName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t('checkout.firstNamePlaceholder')}
                      data-testid="input-firstName"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.lastName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t('checkout.lastNamePlaceholder')}
                      data-testid="input-lastName"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.email')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        value={passenger.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="ornek@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.phone')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="+994 50 123 45 67"
                        data-testid="input-phone"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Birth Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.birthDate')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="date"
                        value={passenger.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
                        data-testid="input-birthDate"
                      />
                    </div>
                    {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.gender')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                      data-testid="input-gender"
                    >
                      <option value="">{t('checkout.selectGender')}</option>
                      <option value="male">{t('checkout.male')}</option>
                      <option value="female">{t('checkout.female')}</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.nationality')}
                    </label>
                    <input
                      type="text"
                      value={passenger.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('checkout.nationalityPlaceholder')}
                      data-testid="input-nationality"
                    />
                  </div>

                  {/* Passport No */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkout.passportNo')}
                    </label>
                    <input
                      type="text"
                      value={passenger.passportNo}
                      onChange={(e) => handleInputChange('passportNo', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="AA1234567"
                      data-testid="input-passportNo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Price Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24" data-testid="price-summary">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-white font-semibold flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>{t('checkout.priceSummary')}</span>
                </h2>
              </div>
              <div className="p-6">
                {/* Flight Route */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">{flight.fromCode} → {flight.toCode}</p>
                    <p className="text-sm text-gray-500">{flight.airline}</p>
                  </div>
                  <p className="font-semibold text-gray-900">${formatPrice(flight.price)}</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('checkout.baseFare')}</span>
                    <span className="text-gray-900">${formatPrice(Math.floor(flight.price * 0.85))}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('checkout.taxes')}</span>
                    <span className="text-gray-900">${formatPrice(Math.floor(flight.price * 0.12))}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t('checkout.serviceFee')}</span>
                    <span className="text-gray-900">${formatPrice(Math.floor(flight.price * 0.03))}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-gray-900">{t('checkout.total')}</span>
                  <span className="text-2xl font-bold text-green-600">${formatPrice(flight.price)}</span>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  data-testid="pay-button"
                >
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

                {/* Security Note */}
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
