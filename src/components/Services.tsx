import React from 'react';
import { ArrowRight, Star, Shield, Award, Clock, Users, Building, Plane, Globe, Heart, Thermometer, Map, GraduationCap, FileCheck, Car, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  {
    id: 1,
    title: 'Otel Bronu',
    description: 'Dünyanın istənilən nöqtəsində rahat və komfortlu istirahət üçün etibarlı otel bronu.',
    icon: <Building className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Aviabiletlər',
    description: 'Münasib qiymətlərlə istənilən istiqamətə aviabilet satışı və uçuş dəstəyi.',
    icon: <Plane className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 3,
    title: 'Turpaketlər',
    description: 'Daxili və xarici istiqamətlər üzrə müxtəlif növ fərdi və qrup turpaketlərinin təşkili.',
    icon: <Globe className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 4,
    title: 'Balayı Səyahətləri',
    description: 'Xüsusi bal ayı proqramları ilə sevginizi daha da unudulmaz edin.',
    icon: <Heart className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 5,
    title: 'Müalicəvi Turlar',
    description: 'Sağlamlığınız üçün seçilmiş sanatoriyalarda müalicə və istirahət turları.',
    icon: <Thermometer className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 6,
    title: 'Rayon Turları',
    description: 'Azərbaycanın ən gözəl bölgələrinə komfortlu və əyləncəli turlar.',
    icon: <Map className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 7,
    title: 'Məktəbli Turları',
    description: 'Təhsil arası faydalı və maraqlı istirahət proqramları məktəblilər üçün.',
    icon: <GraduationCap className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 8,
    title: 'Viza Dəstəyi',
    description: 'Bir çox ölkələrə viza müraciəti və sənədləşmə üzrə tam dəstək.',
    icon: <FileCheck className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: 9,
    title: 'Transfer Xidməti',
    description: 'Səyahət etdiyiniz ölkədə standart və VİP transfer xidmətləri.',
    icon: <Car className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 10,
    title: 'Sığorta',
    description: 'Səyahətiniz boyunca təhlükəsizliyinizin təminatı üçün sığorta xidmətləri.',
    icon: <ShieldCheck className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    color: 'from-cyan-500 to-blue-600',
  },
];

const whyChooseUs = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Təhlükəsiz Ödəniş',
    description: '256-bit SSL şifrələmə ilə təhlükəsiz ödəniş altyapısı'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Ən Yaxşı Qiymət',
    description: 'Qiymət müqayisəsi ilə ən uyğun seçimləri təklif edirik'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '7/24 Dəstək',
    description: 'Peşəkar komandamız həmişə yanınızdadır'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '5000+ Müştəri',
    description: 'Qısa müddətdə qazanılmış etibar və müştəri məmnuniyyəti'
  }
];

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Xidmətlərimiz
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Sizə Ən Yaxşı Səyahət Təcrübəsini Təqdim Edirik
          </p>
          
          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">5000+</div>
              <div className="text-white/80 text-sm mt-1">Mutlu Müştəri</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-white/80 text-sm mt-1">Xidmət Növü</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm mt-1">Ölkə</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="text-3xl font-bold text-white">7/24</div>
              <div className="text-white/80 text-sm mt-1">Müştəri Dəstəyi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kapsamlı Xidmət Çeşidimiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A-dan Z-yə səyahət ehtiyaclarınız üçün tək durak həllər
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className="group bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                  <div className="absolute top-4 left-4 text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-200">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <button className="group/btn w-full bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 text-gray-900 dark:text-white hover:text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Ətraflı Bax</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Niyə Bizi Seçməlisiniz?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Müştəri məmnuniyyəti odaqlı yanaşmamızla fərq yaradırıq
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Səyahət Planlarınızı Bizimlə Bölüşün
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Peşəkar komandamız sizə özel səyahət paketləri hazırlamaq üçün buradadır
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+994124411262" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Bizimlə Əlaqə
            </a>
            <a href="https://wa.me/994502424269" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200">
              WhatsApp: +994 50 242 42 69
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
