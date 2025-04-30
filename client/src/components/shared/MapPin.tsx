import { useTranslation } from 'react-i18next';
import { Marker, Popup } from 'react-leaflet';
import { Project, ProjectCategory } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin as MapPinIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { getCategoryColor } from '@/lib/utils';

interface MapPinProps {
  project: Project;
  onClick: () => void;
}

const MapPin = ({ project }: MapPinProps) => {
  const { t, i18n } = useTranslation();
  const [_, setLocation] = useLocation();
  const currentLanguage = i18n.language;

  // Get localized content
  const getLocalizedField = (field: string, enField: string) => {
    return currentLanguage === 'en' && enField ? enField : field;
  };

  const projectName = getLocalizedField(project.name, project.nameEn);
  const projectDescription = getLocalizedField(project.shortDescription, project.shortDescriptionEn);
  const projectLocation = getLocalizedField(project.location, project.locationEn);
  const projectCountry = getLocalizedField(project.country, project.countryEn);

  // Create a custom marker based on project category
  const { color } = getCategoryColor(project.category);
  
  const iconMarkup = renderToStaticMarkup(
    <div 
      style={{ 
        backgroundColor: color,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        boxShadow: '0 0 0 2px white, 0 0 0 4px rgba(0,0,0,0.15)'
      }} 
      className="map-pin"
    />
  );
  
  const customIcon = divIcon({
    html: iconMarkup,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <Marker 
      position={[project.latitude, project.longitude]} 
      icon={customIcon}
    >
      <Popup className="project-popup" minWidth={200} maxWidth={250}>
        <div>
          <div className="flex mb-3">
            <img 
              src={project.images[0]} 
              alt={projectName} 
              className="w-20 h-16 object-cover rounded-md" 
            />
            <div className="ml-3">
              <h4 className="font-heading font-semibold text-md">{projectName}</h4>
              <p className="text-xs text-gray-600">
                {t(`categories.${project.category}`)} | {projectCountry}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">{projectDescription.substring(0, 100)}...</p>
          <div className="text-xs text-gray-600 mb-2">
            <div className="flex items-center mb-1">
              <Calendar className="mr-1" size={12} />
              <span>
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-1">
              <MapPinIcon className="mr-1" size={12} />
              <span>{projectLocation}</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => setLocation(`/projects/${project.id}`)}
          >
            {t('project.details')}
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapPin;
