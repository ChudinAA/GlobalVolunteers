import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { Heart, Target, Star, Users, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const { t } = useTranslation();
  const [_, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl mb-6 text-center">
            {t('about.title')}
          </h1>

          {/* Mission and Vision */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-white" size={20} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">{t('about.mission.title')}</h3>
              <p className="text-gray-600">{t('about.mission.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="text-white" size={20} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">{t('about.goal.title')}</h3>
              <p className="text-gray-600">{t('about.goal.description')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Star className="text-white" size={20} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">{t('about.uniqueness.title')}</h3>
              <p className="text-gray-600">{t('about.uniqueness.description')}</p>
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="font-heading font-bold text-3xl mb-6">{t('about.history.title')}</h2>
            <div className="prose max-w-none">
              <p>{t('about.history.paragraph1')}</p>
              <p>{t('about.history.paragraph2')}</p>
              <p>{t('about.history.paragraph3')}</p>
            </div>
          </div>

          {/* Our Impact */}
          <div className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-center mb-8">{t('about.impact.title')}</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-600">{t('about.impact.projects')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-gray-600">{t('about.impact.volunteers')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">30+</div>
                <p className="text-gray-600">{t('about.impact.countries')}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="font-heading font-semibold text-xl mb-4">{t('about.impact.achievements')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Award className="text-primary mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">{t('about.impact.achievement1.title')}</h4>
                    <p className="text-gray-600">{t('about.impact.achievement1.description')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="text-primary mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">{t('about.impact.achievement2.title')}</h4>
                    <p className="text-gray-600">{t('about.impact.achievement2.description')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Globe className="text-primary mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">{t('about.impact.achievement3.title')}</h4>
                    <p className="text-gray-600">{t('about.impact.achievement3.description')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-center mb-8">{t('about.gallery.title')}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1469571486292-b53601012a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt={t('about.gallery.alt1')}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt={t('about.gallery.alt2')}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt={t('about.gallery.alt3')}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt={t('about.gallery.alt4')}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="font-heading font-bold text-2xl mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setLocation('/team')}
              >
                {t('about.cta.meetTeam')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                onClick={() => setLocation('/contact')}
              >
                {t('about.cta.contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
