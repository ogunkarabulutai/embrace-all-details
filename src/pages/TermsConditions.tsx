import React from 'react';
import { Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TermsConditions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-12 h-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t('policy.termsTitle')}</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {t('policy.termsIntro')}
        </p>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms1Title')}</h3>
            <p>{t('policy.terms1Desc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms2Title')}</h3>
            <p>{t('policy.terms2Desc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms3Title')}</h3>
            <p>{t('policy.terms3Desc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms4Title')}</h3>
            <p>{t('policy.terms4Desc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms5Title')}</h3>
            <p>{t('policy.terms5Desc')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('policy.terms6Title')}</h3>
            <p>{t('policy.terms6Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
