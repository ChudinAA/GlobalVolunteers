import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { News as NewsType } from '@shared/schema';
import { Loader2, Calendar, Share } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const News = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fetch all news
  const { data: newsItems, isLoading, error } = useQuery<NewsType[]>({
    queryKey: ['/api/news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      return response.json();
    }
  });

  // Share functionality
  const shareOnSocial = (platform: string, newsItem: NewsType) => {
    const title = currentLanguage === 'en' ? newsItem.titleEn : newsItem.title;
    const url = `${window.location.origin}/news/${newsItem.id}`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <Helmet>
        <title>{t('news.meta.title')}</title>
        <meta name="description" content={t('news.meta.description')} />
      </Helmet>

      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl mb-6 text-center">
            {t('news.title')}
          </h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('news.description')}
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
              {t('errors.newsLoad')}
            </div>
          ) : newsItems && newsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map(newsItem => (
                <div key={newsItem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={newsItem.image} 
                    alt={currentLanguage === 'en' ? newsItem.titleEn : newsItem.title} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        {new Date(newsItem.date).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'ru-RU')}
                      </div>
                      <Badge category={newsItem.category} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-3">
                      {currentLanguage === 'en' ? newsItem.titleEn : newsItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {(currentLanguage === 'en' ? newsItem.contentEn : newsItem.content).substring(0, 150)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <Button variant="link" className="p-0 text-primary hover:text-primary-dark font-medium">
                        {t('news.readMore')}
                      </Button>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-primary"
                          onClick={() => shareOnSocial('facebook', newsItem)}
                        >
                          <Facebook size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-primary"
                          onClick={() => shareOnSocial('twitter', newsItem)}
                        >
                          <Twitter size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-primary"
                          onClick={() => shareOnSocial('linkedin', newsItem)}
                        >
                          <Linkedin size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center text-gray-500">
              {t('news.noNews')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
