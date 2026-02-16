import React from 'react';
import { FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="w-12 h-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Məxfilik Siyasəti</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
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
      </div>
    </div>
  );
};

export default PrivacyPolicy;
