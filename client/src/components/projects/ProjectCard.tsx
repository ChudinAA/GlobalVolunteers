import { useTranslation } from 'react-i18next';
import { Project } from '@shared/schema';
import { Calendar, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { Link } from 'wouter';
import ImageWithFallback from '@/components/shared/ImageWithFallback';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Get project name and descriptions based on language
  const getLocalizedField = (field: string, enField: string) => {
    return currentLanguage === 'en' && enField ? enField : field;
  };

  const projectName = getLocalizedField(project.name, project.nameEn);
  const projectDescription = getLocalizedField(project.shortDescription, project.shortDescriptionEn);
  const projectLocation = getLocalizedField(project.location, project.locationEn);
  const projectCountry = getLocalizedField(project.country, project.countryEn);

  // Format dates for display
  const formatProjectDate = (dateString: string | Date) => {
    if (dateString instanceof Date) {
      dateString = dateString.toISOString();
    }
    return formatDate(dateString, currentLanguage);
  };

  const startDate = formatProjectDate(project.startDate);
  const endDate = formatProjectDate(project.endDate);

  return (
    <div className="flex-shrink-0 w-full sm:w-96 bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform transition-transform hover:translate-y-[-4px] hover:shadow-lg">
      <div className={`relative ${compact ? 'h-36' : 'h-48'}`}>
        <ImageWithFallback 
          src={project.images[0]} 
          alt={projectName} 
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          priority={compact}
          category={project.category}
        />
        <div className="absolute top-3 right-3 z-10">
          <Badge category={project.category} />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-lg line-clamp-2">{projectName}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
          {projectDescription}
        </p>
        
        <div className="text-xs text-gray-500 mb-4">
          <div className="flex items-center mb-1">
            <Calendar className="mr-2 flex-shrink-0" size={14} />
            <span className="truncate">{startDate} - {endDate}</span>
          </div>
          
          <div className="flex items-center mb-1">
            <MapPin className="mr-2 flex-shrink-0" size={14} />
            <span className="truncate">{projectLocation}, {projectCountry}</span>
          </div>
          
          <div className="flex items-center">
            <User className="mr-2 flex-shrink-0" size={14} />
            <span className="truncate">{t('project.curator')}: {project.curatorName}</span>
          </div>
        </div>
        
        <Link href={`/projects/${project.id}`}>
          <div className="block text-center bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors cursor-pointer">
            {t('project.details')}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
