import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin, Tag, Users, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@shared/schema';
import { Badge } from '@/components/shared/Badge';
import { getCategoryColor } from '@/lib/utils';

const ProjectDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // State for gallery navigation
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  // Fetch project details
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) throw new Error('Failed to fetch project details');
      return response.json();
    }
  });

  // Handle gallery navigation
  const goToPreviousMedia = () => {
    if (!project) return;
    const totalMedia = project.images.length + project.videos.length;
    setCurrentMediaIndex((currentMediaIndex - 1 + totalMedia) % totalMedia);
  };

  const goToNextMedia = () => {
    if (!project) return;
    const totalMedia = project.images.length + project.videos.length;
    setCurrentMediaIndex((currentMediaIndex + 1) % totalMedia);
  };

  // Get current media item (image or video)
  const getCurrentMedia = () => {
    if (!project) return null;
    
    const { images, videos } = project;
    const allMedia = [...images, ...videos];
    
    if (allMedia.length === 0) return null;
    
    const media = allMedia[currentMediaIndex];
    const isVideo = currentMediaIndex >= images.length;
    
    if (isVideo) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <iframe
            src={media}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            title={project.name}
          />
        </div>
      );
    }
    
    return (
      <img 
        src={media} 
        alt={project.name} 
        className="w-full h-full object-cover"
      />
    );
  };

  // Get project name and descriptions based on language
  const getLocalizedField = (field: string, enField: string) => {
    return currentLanguage === 'en' && enField ? enField : field;
  };

  return (
    <>
      {project && (
        <Helmet>
          <title>{getLocalizedField(project.name, project.nameEn)} | {t('general.logo')}</title>
          <meta 
            name="description" 
            content={getLocalizedField(project.shortDescription, project.shortDescriptionEn)} 
          />
        </Helmet>
      )}

      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2"
            onClick={() => setLocation('/projects')}
          >
            <ArrowLeft size={18} />
            {t('projectDetail.back')}
          </Button>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center my-8">
              {t('errors.projectLoad')}
            </div>
          ) : project ? (
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                {getLocalizedField(project.name, project.nameEn)}
              </h1>

              {/* Gallery and Project Info */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Media Gallery */}
                <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64 md:h-80">
                    {getCurrentMedia()}

                    {/* Gallery Navigation */}
                    {(project.images.length + project.videos.length) > 1 && (
                      <>
                        <button 
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                          onClick={goToPreviousMedia}
                        >
                          <ChevronLeft className="text-gray-600" size={20} />
                        </button>
                        <button 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                          onClick={goToNextMedia}
                        >
                          <ChevronRight className="text-gray-600" size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                  <div className="mb-6">
                    <Badge 
                      category={project.category}
                      className="mb-4"
                    />
                    <p className="text-gray-600 mb-4">
                      {getLocalizedField(project.shortDescription, project.shortDescriptionEn)}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={18} />
                        <div>
                          <p className="text-sm font-medium">{t('projectDetail.period')}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <MapPin className="text-gray-400 mr-2" size={18} />
                        <div>
                          <p className="text-sm font-medium">{t('projectDetail.location')}</p>
                          <p className="text-sm text-gray-600">
                            {getLocalizedField(project.location, project.locationEn)}, {getLocalizedField(project.country, project.countryEn)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={18} />
                        <div>
                          <p className="text-sm font-medium">{t('projectDetail.recruitmentDeadline')}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(project.recruitmentDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Home className="text-gray-400 mr-2" size={18} />
                        <div>
                          <p className="text-sm font-medium">{t('projectDetail.organization')}</p>
                          <p className="text-sm text-gray-600">
                            {getLocalizedField(project.organizationName, project.organizationNameEn)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-heading font-semibold text-lg mb-2">{t('projectDetail.curator')}</h3>
                    <div className="flex items-start mb-4">
                      <Users className="text-gray-400 mr-2 mt-1" size={18} />
                      <div>
                        <p className="font-medium">{project.curatorName}</p>
                        <p className="text-sm text-gray-600">{project.curatorEmail}</p>
                        <p className="text-sm text-gray-600">{project.curatorPhone}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    onClick={() => {
                      setLocation('/#volunteer-form');
                      setTimeout(() => {
                        document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    {t('projectDetail.apply')}
                  </Button>
                </div>
              </div>

              {/* Full Description */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="font-heading font-semibold text-2xl mb-4">{t('projectDetail.fullDescription')}</h2>
                <div className="prose max-w-none">
                  <p>{getLocalizedField(project.fullDescription, project.fullDescriptionEn)}</p>
                </div>
              </div>

              {/* Project Conditions and Volunteer Functions */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="font-heading font-semibold text-2xl mb-4">{t('projectDetail.conditions')}</h2>
                  <div className="prose max-w-none">
                    <p>{getLocalizedField(project.conditions, project.conditionsEn)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="font-heading font-semibold text-2xl mb-4">{t('projectDetail.volunteerFunction')}</h2>
                  <div className="prose max-w-none">
                    <p>{getLocalizedField(project.volunteerFunction, project.volunteerFunctionEn)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg text-center my-8">
              {t('errors.projectNotFound')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
