import React from 'react';
import { Scale } from 'lucide-react';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-12 h-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Şərtlər və Qaydalar</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
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
      </div>
    </div>
  );
};

export default TermsConditions;
