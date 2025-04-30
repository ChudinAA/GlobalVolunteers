import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { News } from '@shared/schema';
import { Loader2, ChevronLeft, ChevronRight, Calendar, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/shared/Badge';
import Carousel from '@/components/shared/Carousel';
import ImageWithFallback from '@/components/shared/ImageWithFallback';
import { formatDate } from '@/lib/utils';
import { Link } from 'wouter';

const NewsCarousel = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fetch news
  const { data: newsItems, isLoading, error } = useQuery<News[]>({
    queryKey: ['/api/news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      return response.json();
    }
  });

  // Share functionality
  const shareOnSocial = (platform: string, newsItem: News) => {
    const title = currentLanguage === 'en' ? (newsItem.titleEn || newsItem.title) : newsItem.title;
    const url = `${window.location.origin}/news/detail/${newsItem.id}`;

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 md:py-10">
        <Loader2 className="h-8 w-8 md:h-10 md:w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center text-sm md:text-base">
        {t('general_error')}
      </div>
    );
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="bg-gray-100 text-gray-500 p-6 md:p-8 rounded-lg text-center text-sm md:text-base">
        {t('news_noNews')}
      </div>
    );
  }

  const carouselItems = newsItems.map((newsItem) => {
    const newsTitle = currentLanguage === 'en' ? (newsItem.titleEn || newsItem.title) : newsItem.title;
    const newsContent = currentLanguage === 'en' ? (newsItem.contentEn || newsItem.content) : newsItem.content;
    const truncatedContent = newsContent.length > 120 ? `${newsContent.substring(0, 120)}...` : newsContent;
    
    return (
      <div key={newsItem.id} className="flex-shrink-0 w-full sm:w-96 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 sm:h-56">
          <ImageWithFallback 
            src={newsItem.image} 
            alt={newsTitle}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          <div className="absolute top-3 right-3">
            <Badge category={newsItem.category} />
          </div>
        </div>
        
        <div className="p-4 sm:p-5">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
            <Calendar size={14} className="mr-1 flex-shrink-0" />
            <span>{formatDate(newsItem.date, currentLanguage)}</span>
          </div>
          
          <h3 className="font-heading font-semibold text-base sm:text-lg mb-2 line-clamp-2">
            {newsTitle}
          </h3>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
            {truncatedContent}
          </p>
          
          <div className="flex justify-between items-center">
            <Link href={`/news/detail/${newsItem.id}`}>
              <div className="text-primary hover:text-primary-dark font-medium cursor-pointer text-sm">
                {t('news_readMore')}
              </div>
            </Link>
            
            <div className="flex space-x-1 sm:space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-primary"
                onClick={() => shareOnSocial('facebook', newsItem)}
                aria-label={`Share on Facebook: ${newsTitle}`}
              >
                <Facebook size={14} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-primary"
                onClick={() => shareOnSocial('twitter', newsItem)}
                aria-label={`Share on Twitter: ${newsTitle}`}
              >
                <Twitter size={14} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-primary"
                onClick={() => shareOnSocial('linkedin', newsItem)}
                aria-label={`Share on LinkedIn: ${newsTitle}`}
              >
                <Linkedin size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Carousel 
      items={carouselItems} 
      leftArrow={<ChevronLeft className="text-gray-600" size={18} />}
      rightArrow={<ChevronRight className="text-gray-600" size={18} />}
    />
  );
};

export default NewsCarousel;
