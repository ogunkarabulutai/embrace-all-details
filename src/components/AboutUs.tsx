import React from 'react';
import { Plane, Building, Car, MapPin, Shield, Clock, Heart, Sparkles, Users, Globe, Phone, CheckCircle, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutUs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-full text-white text-sm font-medium mb-8">
            <Globe className="w-4 h-4" />
            <span>2022-ci ildən bəri</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Haqqımızda
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            TourAgent Travel – səyahətinizi əsl agentə etibar edin!
          </p>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">5000+</div>
              <div className="text-white/80 text-sm mt-1">Mutlu Müştəri</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">2022</div>
              <div className="text-white/80 text-sm mt-1">Təsis ili</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">7/24</div>
              <div className="text-white/80 text-sm mt-1">Müştəri Dəstəyi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm mt-1">Ölkə</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Peşəkar Turizm
                <span className="text-orange-500 block">Xidmətlərimiz</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                TourAgent Travel 2022-ci ildə təsis olunmuş və qısa müddət ərzində 5000-dən çox müştəriyə keyfiyyətli səyahət xidmətləri göstərmiş peşəkar turizm şirkətidir. Fəaliyyətimiz dövründə müştərilərimizə sərfəli aviabilet satışı, otel bronu, daxili və xarici turpaketlər, transfer xidməti və viza dəstəyi təqdim etmişik.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Bizim əsas məqsədimiz hər bir müştərinin büdcəsinə, seçdiyi tarixə və səyahət tələblərinə uyğun ən doğru həlli təklif etməkdir. Müştərilərin seçimlərinə yön verərək, onların səyahətini daha rahat və planlı şəkildə təşkil edirik.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sərfəli Aviabilet</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Otel Bronu</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Turpaketlər</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Viza Dəstəyi</span>
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="TourAgent Travel"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Users className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-xl">5000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Mutlu Müştəri</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Xidmətlərimiz Haqqında Ətraflı
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sizə ən yaxşı səyahət təcrübəsini təqdim etmək üçün geniş xidmət çeşidi təklif edirik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aviabilet */}
            <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Plane className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    Aviabilet Xidməti
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    İstənilən istiqamət üzrə ən münasib aviabiletləri qısa zamanda tapır, uçuşdan öncə bütün uçuş məlumatlarını ətraflı şəkildə təqdim edirik. Müştərimiz xidmətdən tam yararlanana qədər onunla mütəmadi əlaqə saxlayırıq.
                  </p>
                </div>
              </div>
            </div>

            {/* Turpaketlər */}
            <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-200">
                    Turpaketlərin Təşkili
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Daxili və xarici turlar, fərdi, qrup və ailə turları, gənclər üçün turlar, müalicəvi turlar, bal ayı turları və bayramlara özəl turpaketlər təşkil edirik. Komfortlu nəqliyyat vasitələri ilə Azərbaycanın gəzməli-görməli bölgələrinə təşkil etdiyimiz turlar böyükdən kiçiyə hər kəs üçün maraqlı və əyləncəlidir.
                  </p>
                </div>
              </div>
            </div>

            {/* Xarici Turlar */}
            <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors duration-200">
                    Xarici Turpaketlər
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Xarici turpaketlərdə istər 3 ulduzlu, istərsə də 5 ulduzlu otellər seçilərək müştərilərin rahat istirahəti təmin olunur. Cari il ərzində onlarla qrup turu təşkil etmişik və turistlərimiz tur rəhbərlərimizin müşayiəti ilə müxtəlif ölkələrə səyahət ediblər.
                  </p>
                </div>
              </div>
            </div>

            {/* Xüsusi Turlar */}
            <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 transition-colors duration-200">
                    Xüsusi Turlar
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Sağlamlıq problemi olan və yaşlı müştərilər üçün seçilmiş sanatoriyalarda 15 günlük müalicə və istirahət proqramları, yeni ailə quran cütlüklər üçün ekzotik ölkələrə bal ayı turları, yeni ili Finlandiyada qarşılamaq istəyənlər üçün xüsusi proqramlar təqdim edirik.
                  </p>
                </div>
              </div>
            </div>

            {/* Transfer */}
            <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors duration-200">
                    Transfer və VİP Xidmətlər
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Standart və VİP transfer xidmətlərimiz mövcuddur. Havalimanından otelinizə və ya istənilən ünvana rahat və təhlükəsiz nəqliyyatla çatdırılmanızı təmin edirik.
                  </p>
                </div>
              </div>
            </div>

            {/* Viza */}
            <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-sky-200 dark:hover:border-sky-800">
              <div className="flex items-start space-x-5">
                <div className="flex-shrink-0 w-14 h-14 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 transition-colors duration-200">
                    Viza Dəstəyi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Tələblərə uyğun olduğunuz halda viza əldə etməyiniz üçün tam dəstək göstəririk. Sənədlərin hazırlanmasından müraciətin izlənməsinə qədər hər addımda yanınızdayıq.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7/24 Support Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                  <Phone className="w-4 h-4" />
                  <span>7/24 Müştəri Dəstəyi</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  Bütün xidmətlərimiz boyunca yanınızdayıq
                </h2>
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  Bütün xidmətlərimiz boyunca müştərilərimizlə daimi əlaqədə olur və yarana biləcək problemlərdə 7/24 xidmətinizdəyik. Səyahət planlarınızı bizimlə bölüşün — daha keyfiyyətli və problemsiz səyahət edin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+994124411262" className="inline-flex items-center justify-center space-x-2 bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <Phone className="w-5 h-5" />
                    <span>+994 12 441 12 62</span>
                  </a>
                  <a href="https://wa.me/994502424269" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200">
                    <Sparkles className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="mt-12 lg:mt-0 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <Clock className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-white font-semibold">Sürətli Cavab</div>
                  <div className="text-white/70 text-sm mt-1">5 dəqiqə ərzində</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-white font-semibold">Təhlükəsiz</div>
                  <div className="text-white/70 text-sm mt-1">SSL şifrələmə</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <Globe className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-white font-semibold">Beynəlxalq</div>
                  <div className="text-white/70 text-sm mt-1">50+ ölkə</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <Users className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-white font-semibold">Peşəkar Komanda</div>
                  <div className="text-white/70 text-sm mt-1">Təcrübəli heyət</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Səyahət planlarınızı bizimlə bölüşün
          </h2>
          <p className="text-xl text-white/90 mb-4 leading-relaxed">
            Daha keyfiyyətli və problemsiz səyahət edin.
          </p>
          <p className="text-2xl font-bold text-white mb-8">
            TourAgent Travel – səyahətinizi əsl agentə etibar edin!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+994124411262" className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Bizimlə Əlaqə
            </a>
            <a href="https://wa.me/994502424269" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200">
              WhatsApp ilə Yazın
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Əlaqə Məlumatları</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Bizimlə istənilən vaxt əlaqə saxlaya bilərsiniz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ünvan</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Xan Şuşinski 8,<br />Bakı, Azərbaycan
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">E-poçt</h3>
              <a href="mailto:info@touragent.az" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-lg">
                info@touragent.az
              </a>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Telefon</h3>
              <a href="tel:+994124411262" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-lg block mb-1">
                +994 12 441 12 62
              </a>
            </div>
          </div>

          {/* WhatsApp Numbers */}
          <div className="mt-10 bg-green-50 dark:bg-green-900/10 rounded-3xl p-8 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">WhatsApp Xətlərimiz</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { number: '+994502424269', display: '+994 50 242 42 69' },
                { number: '+994502424267', display: '+994 50 242 42 67' },
                { number: '+994502424268', display: '+994 50 242 42 68' },
                { number: '+994502424239', display: '+994 50 242 42 39' },
                { number: '+994502424276', display: '+994 50 242 42 76' },
              ].map((wp) => (
                <a
                  key={wp.number}
                  href={`https://wa.me/${wp.number.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-md group"
                >
                  <MessageCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{wp.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
