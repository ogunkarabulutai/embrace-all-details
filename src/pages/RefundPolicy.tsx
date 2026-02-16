import React from 'react';
import { Shield } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Geri Qaytarma Siyasəti</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
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
      </div>
    </div>
  );
};

export default RefundPolicy;
