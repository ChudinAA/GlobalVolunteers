
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { News } from '@shared/schema';
import { Badge } from '@/components/shared/Badge';

const NewsDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const { data: newsItem, isLoading, error } = useQuery<News>({
    queryKey: [`/api/news/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/news/${id}`);
      if (!response.ok) throw new Error('Failed to fetch news details');
      return response.json();
    }
  });

  return (
    <>
      {newsItem && (
        <Helmet>
          <title>{currentLanguage === 'en' ? newsItem.titleEn : newsItem.title} | {t('general.logo')}</title>
        </Helmet>
      )}

      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2"
            onClick={() => setLocation('/news')}
          >
            <ArrowLeft size={18} />
            {t('news.back')}
          </Button>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center my-8">
              {t('errors.newsLoad')}
            </div>
          ) : newsItem ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={newsItem.image} 
                alt={currentLanguage === 'en' ? newsItem.titleEn : newsItem.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    {new Date(newsItem.date).toLocaleDateString()}
                  </div>
                  <Badge category={newsItem.category} />
                </div>
                <h1 className="font-heading font-bold text-3xl mb-4">
                  {currentLanguage === 'en' ? newsItem.titleEn : newsItem.title}
                </h1>
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    {currentLanguage === 'en' ? newsItem.contentEn : newsItem.content}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg text-center my-8">
              {t('errors.newsNotFound')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
