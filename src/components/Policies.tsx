import React from 'react';
import { Shield, FileText, Scale } from 'lucide-react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Hüquqi Sənədlər</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            TourAgent Travel xidmətləri ilə bağlı bütün hüquqi şərtlər və qaydalar
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Geri Qaytarma Siyasəti */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Geri Qaytarma Siyasəti</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Bu Geri Qaytarma Siyasəti touragent.az veb saytı vasitəsilə göstərilən bütün xidmətlərə şamil edilir.
          </p>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Aviabiletlər:</h3>
              <p>Aviabiletlər üzrə ləğv və geri qaytarma şərtləri birbaşa müvafiq aviaşirkətin tarif qaydalarına uyğun tənzimlənir. Geri qaytarılmayan tariflərdə ödənişin qaytarılması mümkün deyil. Cəriməli tariflərdə isə aviaşirkətin müəyyən etdiyi cərimə məbləği çıxıldıqdan sonra geri ödəniş həyata keçirilir.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Otel bronları və turpaketlər:</h3>
              <p>Otel və turpaket bronları üzrə geri qaytarma şərtləri tərəfdaş otel və tur operatorlarının daxili qaydalarına əsasən müəyyən edilir. Ləğv müddətindən asılı olaraq tam, qismən və ya geri qaytarılmayan xidmətlər mövcud ola bilər.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Viza xidmətləri:</h3>
              <p>Viza rüsumları, konsulluq haqları və viza dəstək xidmətləri üçün ödənilmiş məbləğlər, müraciətin nəticəsindən asılı olmayaraq geri qaytarılmır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Fors-major hallar:</h3>
              <p>Təbii fəlakətlər, aviaşirkətlərin uçuşları ləğv etməsi, dövlət orqanlarının qərarları və digər fors-major hallarda geri qaytarma tərəfdaş şirkətlərin tətbiq etdiyi qaydalara uyğun aparılır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">5. Geri ödəniş müddəti:</h3>
              <p>Təsdiqlənmiş geri qaytarma məbləği bank və ödəniş sistemlərinin daxili qaydalarına uyğun olaraq müştərinin hesabına köçürülür.</p>
            </div>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Məxfilik Siyasəti */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Məxfilik Siyasəti</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            TourAgent Travel müştərilərin şəxsi məlumatlarının qorunmasını Azərbaycan Respublikasının qüvvədə olan qanunvericiliyinə uyğun şəkildə təmin edir.
          </p>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Toplanan məlumatlar:</h3>
              <p>Ad, soyad, əlaqə nömrəsi, elektron poçt ünvanı, şəxsiyyət məlumatları və səyahət məlumatları yalnız xidmətlərin icrası məqsədi ilə toplanır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Məlumatların istifadəsi:</h3>
              <p>Şəxsi məlumatlar yalnız sifarişlərin icrası, viza müraciətləri, rezervasiya prosesləri və müştəri ilə əlaqə üçün istifadə olunur.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Məlumatların paylaşılması:</h3>
              <p>Məlumatlar yalnız xidmətin icrası üçün zəruri olan tərəfdaşlara ötürülə bilər və üçüncü şəxslərə satılmır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Təhlükəsizlik:</h3>
              <p>Şirkət şəxsi məlumatların icazəsiz girişdən, dəyişdirilmədən və yayılmadan qorunması üçün texniki və inzibati tədbirlər görür.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">5. Müştəri hüquqları:</h3>
              <p>Müştəri istənilən vaxt şəxsi məlumatlarının dəyişdirilməsi, silinməsi və ya istifadəsinin məhdudlaşdırılması ilə bağlı müraciət edə bilər.</p>
            </div>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Şərtlər və Qaydalar */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Şərtlər və Qaydalar</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Bu Şərtlər və Qaydalar touragent.az veb saytından istifadə edən bütün şəxslər üçün hüquqi baxımdan məcburidir.
          </p>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Ümumi müddəalar:</h3>
              <p>Saytdan istifadə edən şəxs bu şərtləri oxuduğunu və qəbul etdiyini təsdiq etmiş sayılır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Məsuliyyət:</h3>
              <p>Müştəri təqdim etdiyi məlumatların düzgünlüyünə görə tam məsuliyyət daşıyır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Qiymət dəyişiklikləri:</h3>
              <p>Qiymətlər tərəfdaş şirkətlərin tariflərinə uyğun olaraq əvvəlcədən xəbərdarlıq edilmədən dəyişdirilə bilər.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Üçüncü tərəflər:</h3>
              <p>Aviaşirkət, otel və digər tərəfdaşların göstərdiyi xidmətlərə görə TourAgent Travel məhdud məsuliyyət daşıyır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">5. Dəyişiklik hüququ:</h3>
              <p>Şirkət bu şərt və qaydalara istənilən vaxt dəyişiklik etmək hüququnu özündə saxlayır.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">6. Mübahisələr:</h3>
              <p>Yaranan mübahisələr Azərbaycan Respublikasının qanunvericiliyinə uyğun olaraq həll edilir.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Policies;
