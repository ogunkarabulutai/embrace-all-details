import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, Plane, Globe, Heart, Thermometer, Map, GraduationCap, FileCheck, Car, ShieldCheck, Phone, MessageCircle } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    slug: 'otel-bronu',
    title: 'Otel Bronu',
    shortDesc: 'Dünyanın istənilən nöqtəsində rahat və komfortlu istirahət üçün etibarlı otel bronu.',
    detailedDesc: 'Travele olaraq dünyanın hər yerindəki mehmanxanalar ilə əməkdaşlıq edərək sizə ən uyğun qiymətlərlə otel bronu xidməti təqdim edirik. İstər lüks beşulduzlu otellər, istərsə də büdcəyə uyğun boutique mehmanxanalar – seçim sizindir. Bron prosesi tamamilə onlayn və sürətli şəkildə həyata keçirilir. Pulsuz ləğv seçimləri, erkən giriş/gec çıxış imkanları və xüsusi endirimlər ilə səyahətinizi daha da rahat edirik.',
    icon: <Building className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-blue-500 to-blue-600',
    features: ['Ən yaxşı qiymət zəmanəti', 'Pulsuz ləğv imkanı', '7/24 dəstək', 'Sürətli onlayn bron'],
  },
  {
    id: 2,
    slug: 'aviabiletler',
    title: 'Aviabiletlər',
    shortDesc: 'Münasib qiymətlərlə istənilən istiqamətə aviabilet satışı və uçuş dəstəyi.',
    detailedDesc: 'Dünyanın aparıcı aviaşirkətləri ilə birbaşa əlaqəmiz sayəsində sizə ən münasib qiymətlərlə aviabilet təklif edirik. Ekonom, biznes və birinci sinif biletlər, çoxlu tranzit seçimləri və elastik tarix dəyişikliyi imkanları mövcuddur. Qrup səyahətləri üçün xüsusi endirimli tariflərimiz də var. Bilet alışından sonra uçuş dəyişikliyi, əlavə baqaj və oturacaq seçimi kimi xidmətlərdə də dəstək göstəririk.',
    icon: <Plane className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-sky-500 to-blue-600',
    features: ['Münasib qiymətlər', 'Elastik tarix dəyişikliyi', 'Qrup endirimləri', 'Əlavə baqaj dəstəyi'],
  },
  {
    id: 3,
    slug: 'turpaketler',
    title: 'Turpaketlər',
    shortDesc: 'Daxili və xarici istiqamətlər üzrə müxtəlif növ fərdi və qrup turpaketlərinin təşkili.',
    detailedDesc: 'Fərdi və qrup turpaketlərimiz ilə unutulmaz səyahət təcrübələri yaşayın. Otel, transfer, ekskursiya və bələdçi xidmətlərini əhatə edən tam paketlər təqdim edirik. Türkiyə, Gürcüstan, Dubay, Avropa və daha bir çox istiqamətə turpaketlərimiz mövcuddur. Hər büdcəyə uyğun seçimlərlə səyahətinizi planlaşdırmağınızda kömək edirik.',
    icon: <Globe className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-purple-500 to-indigo-600',
    features: ['Tam paket xidmət', 'Fərdi və qrup turları', 'Peşəkar bələdçi', 'Hər büdcəyə uyğun'],
  },
  {
    id: 4,
    slug: 'balayi-seyahetleri',
    title: 'Balayı Səyahətləri',
    shortDesc: 'Xüsusi bal ayı proqramları ilə sevginizi daha da unudulmaz edin.',
    detailedDesc: 'Həyatınızın ən xüsusi anlarından biri olan bal ayını əsl möcüzəyə çevirin. Maldiv, Bali, Santorini, Paris və daha bir çox romantik istiqamətlərə xüsusi balayı paketlərimiz var. Lüks otaqlar, xüsusi dekorasiya, romantik şam yeməkləri və spa xidmətləri daxil olan paketlərlə sevdiyiniz insanla birlikdə unudulmaz xatirələr yaradın.',
    icon: <Heart className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-pink-500 to-rose-600',
    features: ['Romantik dekorasiya', 'Lüks otaqlar', 'Spa xidmətləri', 'Xüsusi şam yeməyi'],
  },
  {
    id: 5,
    slug: 'mualicevi-turlar',
    title: 'Müalicəvi Turlar',
    shortDesc: 'Sağlamlığınız üçün seçilmiş sanatoriyalarda müalicə və istirahət turları.',
    detailedDesc: 'Sağlamlığınıza investisiya edin! Naftalan, Karlovy Vary, Gürcüstan termal suları və digər məşhur müalicə mərkəzlərinə turlar təşkil edirik. Həkim məsləhəti əsasında hazırlanan proqramlar, müasir müalicə üsulları və rahat istirahət şəraiti ilə sağlamlığınızı bərpa edin. Artrit, dəri xəstəlikləri, sinir sistemi problemləri və digər sağlamlıq məsələləri üçün uyğun proqramlar mövcuddur.',
    icon: <Thermometer className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-teal-500 to-emerald-600',
    features: ['Həkim məsləhəti', 'Müasir müalicə', 'Rahat şərait', 'Fərdi proqram'],
  },
  {
    id: 6,
    slug: 'rayon-turlari',
    title: 'Rayon Turları',
    shortDesc: 'Azərbaycanın ən gözəl bölgələrinə komfortlu və əyləncəli turlar.',
    detailedDesc: 'Azərbaycanın zəngin təbiətini və mədəni irsini kəşf edin! Şəki, Qəbələ, Lənkəran, Şamaxı, Quba və digər gözəl bölgələrə həftəsonu və uzun müddətli turlar təşkil edirik. Komfortlu nəqliyyat, peşəkar bələdçi, yerli mətbəx təcrübəsi və tarixi məkanların ziyarəti proqrama daxildir. Ailə, dostlar və korporativ qruplar üçün xüsusi paketlər mövcuddur.',
    icon: <Map className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-green-500 to-emerald-600',
    features: ['Komfortlu nəqliyyat', 'Peşəkar bələdçi', 'Yerli mətbəx', 'Korporativ paketlər'],
  },
  {
    id: 7,
    slug: 'mektebli-turlari',
    title: 'Məktəbli Turları',
    shortDesc: 'Təhsil arası faydalı və maraqlı istirahət proqramları məktəblilər üçün.',
    detailedDesc: 'Uşaqlarınız üçün təhlükəsiz, əyləncəli və öyrədici turlar təşkil edirik. Yay düşərgələri, elm turları, təbiət gəzintiləri və mədəni ekskursiyalar proqramımıza daxildir. Peşəkar müəllim və bələdçilər nəzarətində keçirilən turlarda uşaqlar həm istirahət edir, həm də yeni biliklər qazanır. Valideynlər üçün tam təhlükəsizlik zəmanəti təqdim edirik.',
    icon: <GraduationCap className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-amber-500 to-orange-600',
    features: ['Təhlükəsiz mühit', 'Peşəkar nəzarət', 'Əyləncəli proqram', 'Öyrədici məzmun'],
  },
  {
    id: 8,
    slug: 'viza-desteyi',
    title: 'Viza Dəstəyi',
    shortDesc: 'Bir çox ölkələrə viza müraciəti və sənədləşmə üzrə tam dəstək.',
    detailedDesc: 'Viza prosesini sizin üçün asanlaşdırırıq! ABŞ, Kanada, Böyük Britaniya, Şengen ölkələri və digər istiqamətlərə viza müraciətlərində tam dəstək göstəririk. Sənədlərin hazırlanması, anketal doldurulması, müsahibəyə hazırlıq və konsulluq randevusu alınması xidmətlərimiz sırasındadır. Yüksək təsdiq faizimiz ilə fərqlənirik.',
    icon: <FileCheck className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-indigo-500 to-violet-600',
    features: ['Sənəd hazırlığı', 'Müsahibə hazırlığı', 'Yüksək təsdiq faizi', 'Bütün ölkələr'],
  },
  {
    id: 9,
    slug: 'transfer-xidmeti',
    title: 'Transfer Xidməti',
    shortDesc: 'Səyahət etdiyiniz ölkədə standart və VİP transfer xidmətləri.',
    detailedDesc: 'Hava limanından otelinizə və ya istənilən nöqtəyə rahat və təhlükəsiz transfer xidməti təqdim edirik. Standart sedan, minivan, lüks avtomobil və VİP transfer seçimlərimiz mövcuddur. Peşəkar sürücülərimiz sizi qarşılayır və rahat şəkildə istədiyiniz ünvana çatdırır. Qrup transferləri və şəhərlərarası transfer xidmətləri də mövcuddur.',
    icon: <Car className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-orange-500 to-red-600',
    features: ['VİP transfer', 'Peşəkar sürücü', 'Qrup transferi', '7/24 xidmət'],
  },
  {
    id: 10,
    slug: 'sigorta',
    title: 'Sığorta',
    shortDesc: 'Səyahətiniz boyunca təhlükəsizliyinizin təminatı üçün sığorta xidmətləri.',
    detailedDesc: 'Səyahət sığortası ilə gözlənilməz hallara qarşı özünüzü qoruyun. Tibbi xərclər, baqaj itkisi, uçuş gecikməsi, səyahətin ləğvi və digər risklərə qarşı hərtərəfli sığorta paketlərimiz mövcuddur. Aparıcı sığorta şirkətləri ilə əməkdaşlıq edərək sizə ən uyğun və əlverişli sığorta planlarını təklif edirik. Viza müraciəti üçün tələb olunan sığorta sənədlərini də hazırlayırıq.',
    icon: <ShieldCheck className="w-10 h-10" />,
    image: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    color: 'from-cyan-500 to-blue-600',
    features: ['Tibbi sığorta', 'Baqaj sığortası', 'Ləğv sığortası', 'Viza sığortası'],
  },
];

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Xidmət tapılmadı</h1>
          <Link to="/services" className="text-orange-500 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Xidmətlərə qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative h-[350px] sm:h-[400px] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="text-white mb-4">{service.icon}</div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">{service.title}</h1>
          <p className="text-lg text-white/90 max-w-2xl">{service.shortDesc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Bütün Xidmətlər
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Xidmət Haqqında</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {service.detailedDesc}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.color}`} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Maraqlanırsınız?</h3>
          <p className="text-white/90 mb-6">Bu xidmət haqqında daha ətraflı məlumat almaq üçün bizimlə əlaqə saxlayın.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+994124411262" className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all">
              <Phone className="w-4 h-4" /> Zəng Et
            </a>
            <a href="https://wa.me/994502424269" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-full font-semibold transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
