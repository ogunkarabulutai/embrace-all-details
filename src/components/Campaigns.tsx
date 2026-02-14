import React from 'react';
import { Clock, Percent, Gift, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Campaigns: React.FC = () => {
  const { t } = useLanguage();
  
  const campaigns = [
    {
      id: 1,
      titleKey: 'campaigns.summer',
      descKey: 'campaigns.summerDesc',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      discount: '40%',
      endDateKey: 'campaigns.august31',
      badgeKey: 'campaigns.limitedTime',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 2,
      titleKey: 'campaigns.earlyBird',
      descKey: 'campaigns.earlyBirdDesc',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      discount: '25%',
      endDateKey: 'campaigns.september15',
      badgeKey: 'campaigns.specialPrice',
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 3,
      titleKey: 'campaigns.romantic',
      descKey: 'campaigns.romanticDesc',
      image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      discount: '30%',
      endDateKey: 'campaigns.september10',
      badgeKey: 'campaigns.romanticBadge',
      color: 'from-pink-400 to-rose-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('campaigns.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('campaigns.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div 
              key={campaign.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img 
                  src={campaign.image}
                  alt={t(campaign.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${campaign.color} opacity-60 mix-blend-multiply`} />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-sm font-medium">
                    {t(campaign.badgeKey)}
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{campaign.discount}</div>
                    <div className="text-sm opacity-90">{t('campaigns.discount')}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-300 transition-colors duration-200">
                    {t(campaign.titleKey)}
                  </h3>
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">
                    {t(campaign.descKey)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{t(campaign.endDateKey)} {t('campaigns.until')}</span>
                    </div>
                    
                    <button className="group/btn bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center space-x-2">
                      <span>{t('campaigns.explore')}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Percent className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 dark:text-white">{t('campaigns.notifications')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('campaigns.notificationsDesc')}</p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
              {t('campaigns.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
