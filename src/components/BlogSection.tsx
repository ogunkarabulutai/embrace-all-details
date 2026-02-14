import React from 'react';
import { Clock, ArrowRight, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const blogPosts = [
  {
    id: 1,
    title: 'Antalyada Görməli Olduğunuz 10 Yer',
    excerpt: 'Aralıq dənizinin incisi Antalyada tətilinizdə mütləq ziyarət etməli olduğunuz tarixi və təbii gözəllikləri kəşf edin.',
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    author: 'Orxan Əliyev',
    date: '15 Avqust 2026',
    readTime: '8 dəqiqə',
    views: 2840,
    category: 'Tətil Bələdçisi'
  },
  {
    id: 2,
    title: 'Yayın Ən Gözəl Qaçış Yerləri: Egey Sahilləri',
    excerpt: 'Egey dənizinin masmavi sularında özünüzü itirin. Ən gözəl körfəzlər, tarixi məkanlar və ləzzət duracaqlarını sizin üçün topladıq.',
    image: 'https://images.pexels.com/photos/1548024/pexels-photo-1548024.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    author: 'Aynur Həsənova',
    date: '12 Avqust 2026',
    readTime: '6 dəqiqə',
    views: 1950,
    category: 'Kəşf'
  },
  {
    id: 3,
    title: 'Büdcəyə Uyğun Tətil Tövsiyələri',
    excerpt: 'Az büdcə ilə çox keyf! Cibinizi yandırmadan unudulmaz tətil təcrübələri yaşamağın sirlərini paylaşırıq.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    author: 'Elçin Məmmədov',
    date: '10 Avqust 2026',
    readTime: '5 dəqiqə',
    views: 3200,
    category: 'İpucları'
  }
];

const BlogSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tatil deneyiminizi zenginleştirren rehberler, ipuçları ve keşif önerileri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <span>{post.date}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author}
                  </span>
                  
                  <button className="group/btn flex items-center space-x-1 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200">
                    <span>Devamını Oku</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 px-8 py-3 rounded-full font-medium transition-all duration-200 inline-flex items-center space-x-2">
            <span>Tüm Blog Yazılarını Gör</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;