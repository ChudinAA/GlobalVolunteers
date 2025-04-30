import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Testimonial } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Users, Building, Award, Globe } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Organizations = () => {
  const { t, i18n } = useTranslation();
  const [_, setLocation] = useLocation();
  const currentLanguage = i18n.language;

  // Fetch organization testimonials
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials', 'organization'],
    queryFn: async () => {
      const response = await fetch('/api/testimonials?type=organization');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      return response.json();
    }
  });

  return (
    <>
      <Helmet>
        <title>{t('organizations.meta.title')}</title>
        <meta name="description" content={t('organizations.meta.description')} />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl mb-6 text-center">
            {t('organizations.title')}
          </h1>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 max-w-4xl mx-auto">
            <h2 className="font-heading font-semibold text-2xl mb-4 text-primary">
              {t('organizations.infoTitle')}
            </h2>
            <div className="prose max-w-none mb-6">
              <p>{t('organizations.infoParagraph1')}</p>
              <p>{t('organizations.infoParagraph2')}</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-center mb-8">
              {t('organizations.benefitsTitle')}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <Users className="text-primary mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {t('organizations.benefit1Title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('organizations.benefit1Description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <Globe className="text-primary mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {t('organizations.benefit2Title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('organizations.benefit2Description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <Award className="text-primary mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {t('organizations.benefit3Title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('organizations.benefit3Description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <Building className="text-primary mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {t('organizations.benefit4Title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('organizations.benefit4Description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-center mb-8">
              {t('organizations.testimonialsTitle')}
            </h2>

            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                  <Card key={testimonial.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="mr-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={testimonial.avatar} 
                              alt={currentLanguage === 'en' ? testimonial.authorEn : testimonial.author} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold">
                            {currentLanguage === 'en' ? testimonial.authorEn : testimonial.author}
                          </h3>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="absolute top-0 left-0 text-gray-200 opacity-50" size={40} />
                        <p className="text-gray-600 relative z-10 pl-10 pt-2">
                          {currentLanguage === 'en' ? testimonial.contentEn : testimonial.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                {t('organizations.noTestimonials')}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-secondary text-white rounded-lg p-8 text-center">
            <h2 className="font-heading font-bold text-2xl mb-4">
              {t('organizations.ctaTitle')}
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              {t('organizations.ctaDescription')}
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-secondary"
              onClick={() => {
                setLocation('/#partner-form');
                setTimeout(() => {
                  document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              {t('organizations.becomePartner')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizations;
