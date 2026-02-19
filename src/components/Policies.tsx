import React from 'react';
import { Shield, FileText, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Policies: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t('policy.legalDocuments')}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t('policy.legalDocumentsDesc')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Refund Policy */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('policy.refundTitle')}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t('policy.refundIntro')}</p>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.refund1Title')}</h3><p>{t('policy.refund1Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.refund2Title')}</h3><p>{t('policy.refund2Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.refund3Title')}</h3><p>{t('policy.refund3Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.refund4Title')}</h3><p>{t('policy.refund4Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.refund5Title')}</h3><p>{t('policy.refund5Desc')}</p></div>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Privacy Policy */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('policy.privacyTitle')}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t('policy.privacyIntro')}</p>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.privacy1Title')}</h3><p>{t('policy.privacy1Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.privacy2Title')}</h3><p>{t('policy.privacy2Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.privacy3Title')}</h3><p>{t('policy.privacy3Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.privacy4Title')}</h3><p>{t('policy.privacy4Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.privacy5Title')}</h3><p>{t('policy.privacy5Desc')}</p></div>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Terms & Conditions */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('policy.termsTitle')}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t('policy.termsIntro')}</p>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms1Title')}</h3><p>{t('policy.terms1Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms2Title')}</h3><p>{t('policy.terms2Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms3Title')}</h3><p>{t('policy.terms3Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms4Title')}</h3><p>{t('policy.terms4Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms5Title')}</h3><p>{t('policy.terms5Desc')}</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms6Title')}</h3><p>{t('policy.terms6Desc')}</p></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Policies;
