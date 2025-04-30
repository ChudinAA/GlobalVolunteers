import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Project, ProjectCategory } from '@shared/schema';
import { Loader2, MapPin as MapPinIcon, Globe2 } from 'lucide-react';
import MapPin from '@/components/shared/MapPin';
import { useLocation } from 'wouter';
import { getCategoryColor } from '@/lib/utils';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues with webpack
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// MapReset component to handle map bounds
const MapReset = ({ projects, selectedCategory }: { projects: Project[], selectedCategory: string | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!projects.length) return;
    
    const filteredProjects = selectedCategory 
      ? projects.filter(p => p.category === selectedCategory)
      : projects;
    
    if (filteredProjects.length) {
      const bounds = L.latLngBounds(
        filteredProjects.map(p => [p.latitude, p.longitude] as [number, number])
      );
      map.fitBounds(bounds, { padding: [70, 70] });
    }
  }, [map, projects, selectedCategory]);
  
  return null;
};

const ProjectMap = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [_, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch all projects
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    }
  });

  const categories = [
    { id: 'all', name: t('categories.all'), color: 'primary', icon: <Globe2 className="w-5 h-5" /> },
    { id: ProjectCategory.MEDICAL, name: t('categories.medical'), color: 'medical', icon: <div className="w-5 h-5 flex items-center justify-center">🏥</div> },
    { id: ProjectCategory.EDUCATION, name: t('categories.education'), color: 'education', icon: <div className="w-5 h-5 flex items-center justify-center">🎓</div> },
    { id: ProjectCategory.SPORTS, name: t('categories.sports'), color: 'sports', icon: <div className="w-5 h-5 flex items-center justify-center">⚽</div> },
    { id: ProjectCategory.ENVIRONMENT, name: t('categories.environment'), color: 'environment', icon: <div className="w-5 h-5 flex items-center justify-center">🌱</div> },
  ];

  const filteredProjects = selectedCategory
    ? projects?.filter(project => project.category === selectedCategory)
    : projects;
    
  const projectCount = filteredProjects?.length || 0;

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
  };

  return (
    <div className="relative rounded-xl overflow-hidden mb-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-50"></div>
      
      <div className="relative p-6 md:p-8">
        <motion.div 
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Project Categories Filter */}
          <div className="lg:w-1/4 mb-4 lg:mb-0">
            <h3 className="font-heading font-semibold text-xl mb-4 flex items-center">
              <MapPinIcon className="mr-2 w-5 h-5 text-primary" />
              {t('home.map.categories')}
            </h3>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <motion.li 
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <button
                      className={`flex items-center w-full cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.id || (category.id === 'all' && !selectedCategory)
                          ? `bg-${category.color === 'primary' ? 'primary' : category.color}-light border border-${category.color} shadow-sm`
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div 
                        className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                          category.id !== 'all' 
                            ? `bg-${category.color}-light text-${category.color}` 
                            : 'bg-primary-light text-primary'
                        }`}
                      >
                        {category.icon}
                      </div>
                      <span 
                        className={`font-medium ${
                          category.id !== 'all' 
                            ? `text-${category.color}` 
                            : 'text-primary'
                        }`}
                      >
                        {category.name}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {filteredProjects && filteredProjects.length > 0 && (
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-sm text-gray-600 mb-2">{t('home.map.projectsFound')}</p>
                <p className="text-3xl font-bold text-primary">
                  {projectCount} <span className="text-sm font-normal text-gray-500">{projectCount === 1 ? t('home.map.project') : t('home.map.projects')}</span>
                </p>
              </motion.div>
            )}
          </div>
          
          {/* Interactive Map */}
          <motion.div 
            className="lg:w-3/4 bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[550px] w-full">
              {isLoading ? (
                <div className="flex justify-center items-center h-full bg-gray-50">
                  <div className="text-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-gray-500">{t('general.loading')}</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-full bg-red-50 text-red-500 p-4">
                  {t('general.error')}
                </div>
              ) : projects && projects.length > 0 ? (
                <MapContainer 
                  center={[20, 0]} 
                  zoom={2} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                  className="z-10"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapReset projects={projects} selectedCategory={selectedCategory} />
                  
                  {filteredProjects?.map(project => (
                    <MapPin 
                      key={project.id}
                      project={project}
                    />
                  ))}
                </MapContainer>
              ) : (
                <div className="flex justify-center items-center h-full bg-gray-50 text-gray-500">
                  {t('home.map.noProjects')}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectMap;
