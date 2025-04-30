import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import VideoHero from '@/components/home/VideoHero';
import ProjectMap from '@/components/home/ProjectMap';
import ActiveProjects from '@/components/home/ActiveProjects';
import AboutProject from '@/components/home/AboutProject';
import NewsCarousel from '@/components/home/NewsCarousel';
import Partners from '@/components/home/Partners';
import VolunteerForm from '@/components/forms/VolunteerForm';
import PartnerForm from '@/components/forms/PartnerForm';

const Home = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>{t('home_meta_title')}</title>
        <meta name="description" content={t('home_meta_description')} />
      </Helmet>

      {/* Video Hero Section */}
      <VideoHero />

      {/* Projects Map Section */}
      <section id="map-section" className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-12">
            {t('home_map_title')}
          </h2>
          <ProjectMap />
        </div>
      </section>

      {/* Active Projects Section */}
      <section id="active-projects" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-4">
            {t('home_activeProjects_title')}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('home_activeProjects_description')}
          </p>
          <ActiveProjects />
        </div>
      </section>

      {/* About Project Section */}
      <section id="about-project" className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-12">
            {t('home_about_title')}
          </h2>
          <AboutProject />
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-4">
            {t('news.title')}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('news.description')}
          </p>
          <NewsCarousel />
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('partners.description')}
          </p>
          <Partners />
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section id="volunteer-form" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <VolunteerForm />
        </div>
      </section>

      {/* Partner Form Section */}
      <section id="partner-form" className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <PartnerForm />
        </div>
      </section>
    </>
  );
};

export default Home;
