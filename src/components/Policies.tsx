import React, { useState } from 'react';
import { Shield, FileText, Scale, ChevronDown, ChevronUp } from 'lucide-react';

type TabKey = 'refund' | 'privacy' | 'terms';

const Policies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('refund');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'refund', label: 'Geri Qaytarma Siyasəti', icon: <Shield className="w-5 h-5" /> },
    { key: 'privacy', label: 'Məxfilik Siyasəti', icon: <FileText className="w-5 h-5" /> },
    { key: 'terms', label: 'Şərtlər və Qaydalar', icon: <Scale className="w-5 h-5" /> },
  ];

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

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-2 flex flex-col sm:flex-row gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              data-testid={`policy-tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Refund Policy */}
        {activeTab === 'refund' && (
          <div data-testid="refund-policy-content" className="space-y-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Geri Qaytarma Siyasəti</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Bu Geri Qaytarma Siyasəti touragent.az veb saytı vasitəsilə göstərilən bütün xidmətlərə şamil edilir.
              </p>
            </div>

            {[
              {
                id: 'refund-1',
                title: '1. Aviabiletlər',
                content: 'Aviabiletlər üzrə ləğv və geri qaytarma şərtləri birbaşa müvafiq aviaşirkətin tarif qaydalarına uyğun tənzimlənir. Geri qaytarılmayan tariflərdə ödənişin qaytarılması mümkün deyil. Cəriməli tariflərdə isə aviaşirkətin müəyyən etdiyi cərimə məbləği çıxıldıqdan sonra geri ödəniş həyata keçirilir.'
              },
              {
                id: 'refund-2',
                title: '2. Otel bronları və turpaketlər',
                content: 'Otel və turpaket bronları üzrə geri qaytarma şərtləri tərəfdaş otel və tur operatorlarının daxili qaydalarına əsasən müəyyən edilir. Ləğv müddətindən asılı olaraq tam, qismən və ya geri qaytarılmayan xidmətlər mövcud ola bilər.'
              },
              {
                id: 'refund-3',
                title: '3. Viza xidmətləri',
                content: 'Viza rüsumları, konsulluq haqları və viza dəstək xidmətləri üçün ödənilmiş məbləğlər, müraciətin nəticəsindən asılı olmayaraq geri qaytarılmır.'
              },
              {
                id: 'refund-4',
                title: '4. Fors-major hallar',
                content: 'Təbii fəlakətlər, aviaşirkətlərin uçuşları ləğv etməsi, dövlət orqanlarının qərarları və digər fors-major hallarda geri qaytarma tərəfdaş şirkətlərin tətbiq etdiyi qaydalara uyğun aparılır.'
              },
              {
                id: 'refund-5',
                title: '5. Geri ödəniş müddəti',
                content: 'Təsdiqlənmiş geri qaytarma məbləği bank və ödəniş sistemlərinin daxili qaydalarına uyğun olaraq müştərinin hesabına köçürülür.'
              },
            ].map(item => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
                  {openSections[item.id] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
                {openSections[item.id] && (
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Privacy Policy */}
        {activeTab === 'privacy' && (
          <div data-testid="privacy-policy-content" className="space-y-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Məxfilik Siyasəti</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                TourAgent Travel müştərilərin şəxsi məlumatlarının qorunmasını Azərbaycan Respublikasının qüvvədə olan qanunvericiliyinə uyğun şəkildə təmin edir.
              </p>
            </div>

            {[
              {
                id: 'privacy-1',
                title: '1. Toplanan məlumatlar',
                content: 'Ad, soyad, əlaqə nömrəsi, elektron poçt ünvanı, şəxsiyyət məlumatları və səyahət məlumatları yalnız xidmətlərin icrası məqsədi ilə toplanır.'
              },
              {
                id: 'privacy-2',
                title: '2. Məlumatların istifadəsi',
                content: 'Şəxsi məlumatlar yalnız sifarişlərin icrası, viza müraciətləri, rezervasiya prosesləri və müştəri ilə əlaqə üçün istifadə olunur.'
              },
              {
                id: 'privacy-3',
                title: '3. Məlumatların paylaşılması',
                content: 'Məlumatlar yalnız xidmətin icrası üçün zəruri olan tərəfdaşlara ötürülə bilər və üçüncü şəxslərə satılmır.'
              },
              {
                id: 'privacy-4',
                title: '4. Təhlükəsizlik',
                content: 'Şirkət şəxsi məlumatların icazəsiz girişdən, dəyişdirilmədən və yayılmadan qorunması üçün texniki və inzibati tədbirlər görür.'
              },
              {
                id: 'privacy-5',
                title: '5. Müştəri hüquqları',
                content: 'Müştəri istənilən vaxt şəxsi məlumatlarının dəyişdirilməsi, silinməsi və ya istifadəsinin məhdudlaşdırılması ilə bağlı müraciət edə bilər.'
              },
            ].map(item => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
                  {openSections[item.id] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
                {openSections[item.id] && (
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Terms */}
        {activeTab === 'terms' && (
          <div data-testid="terms-policy-content" className="space-y-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Şərtlər və Qaydalar</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Bu Şərtlər və Qaydalar touragent.az veb saytından istifadə edən bütün şəxslər üçün hüquqi baxımdan məcburidir.
              </p>
            </div>

            {[
              {
                id: 'terms-1',
                title: '1. Ümumi müddəalar',
                content: 'Saytdan istifadə edən şəxs bu şərtləri oxuduğunu və qəbul etdiyini təsdiq etmiş sayılır.'
              },
              {
                id: 'terms-2',
                title: '2. Məsuliyyət',
                content: 'Müştəri təqdim etdiyi məlumatların düzgünlüyünə görə tam məsuliyyət daşıyır.'
              },
              {
                id: 'terms-3',
                title: '3. Qiymət dəyişiklikləri',
                content: 'Qiymətlər tərəfdaş şirkətlərin tariflərinə uyğun olaraq əvvəlcədən xəbərdarlıq edilmədən dəyişdirilə bilər.'
              },
              {
                id: 'terms-4',
                title: '4. Üçüncü tərəflər',
                content: 'Aviaşirkət, otel və digər tərəfdaşların göstərdiyi xidmətlərə görə TourAgent Travel məhdud məsuliyyət daşıyır.'
              },
              {
                id: 'terms-5',
                title: '5. Dəyişiklik hüququ',
                content: 'Şirkət bu şərt və qaydalara istənilən vaxt dəyişiklik etmək hüququnu özündə saxlayır.'
              },
              {
                id: 'terms-6',
                title: '6. Mübahisələr',
                content: 'Yaranan mübahisələr Azərbaycan Respublikasının qanunvericiliyinə uyğun olaraq həll edilir.'
              },
            ].map(item => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
                  {openSections[item.id] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
                {openSections[item.id] && (
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Policies;
