import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Loader2, Filter, X } from 'lucide-react';
import { Project, ProjectCategory, ProjectStatus } from '@shared/schema';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Get initial filters from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || '';
  const initialStatus = urlParams.get('status') || '';
  const initialLocation = urlParams.get('location') || '';
  
  // State for filters
  const [filters, setFilters] = useState({
    category: initialCategory as string,
    status: initialStatus as string,
    location: initialLocation as string,
    period: '',
    recruitmentDeadline: '',
  });

  // Close mobile filters when resizing to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowMobileFilters(false);
    }
  }, [isMobile]);

  // Fetch projects with filters applied
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects', filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      
      const response = await fetch(`/api/projects?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      return response.json();
    }
  });

  // Apply client-side filtering for the rest of the filters
  const filteredProjects = projects ? projects.filter(project => {
    // Filter by location if specified
    if (filters.location && !project.country.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Add more client-side filtering as needed for period and deadline
    // ...
    
    return true;
  }) : [];

  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    
    // Update URL for category and status filters
    if (filterName === 'category' || filterName === 'status') {
      const params = new URLSearchParams(window.location.search);
      
      if (value) {
        params.set(filterName, value);
      } else {
        params.delete(filterName);
      }
      
      const newSearch = params.toString() ? `?${params.toString()}` : '';
      setLocation(`/projects${newSearch}`, { replace: true });
    }
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(val => val !== '');

  // Count of active filters
  const activeFilterCount = Object.values(filters).filter(val => val !== '').length;

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      status: '',
      location: '',
      period: '',
      recruitmentDeadline: '',
    });
    setLocation('/projects', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>{t('projects.meta.title')}</title>
        <meta name="description" content={t('projects.meta.description')} />
      </Helmet>

      <div className="pt-20 md:pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3 md:mb-6 text-center">
            {t('projects.title')}
          </h1>
          <p className="text-center text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto text-sm md:text-base">
            {t('projects.description')}
          </p>

          {/* Mobile filter toggle */}
          {isMobile && (
            <div className="mb-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={16} />
                {t('projects.filters.title')} 
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-gray-500 text-xs"
                >
                  {t('general.reset')}
                </Button>
              )}
            </div>
          )}

          {/* Filters - responsive */}
          {(!isMobile || (isMobile && showMobileFilters)) && (
            <div className={`bg-white p-4 rounded-lg shadow-sm mb-6 ${isMobile ? 'fixed inset-0 z-50 pt-16 overflow-auto bg-white' : ''}`}>
              {isMobile && (
                <div className="flex justify-between items-center sticky top-0 bg-white py-2 border-b mb-4">
                  <h3 className="font-semibold">{t('projects.filters.title')}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>
              )}
              
              <ProjectFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              
              {isMobile && (
                <div className="mt-6 flex justify-between border-t pt-4">
                  {hasActiveFilters && (
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                    >
                      {t('general.reset')}
                    </Button>
                  )}
                  <Button 
                    className="ml-auto"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    {t('general.apply')} ({filteredProjects.length})
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Projects Grid */}
          <div className="mt-4 md:mt-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-16 md:py-20">
                <Loader2 className="h-8 w-8 md:h-10 md:w-10 text-primary animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
                {t('general.error')}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="bg-gray-100 text-gray-500 p-6 md:p-8 rounded-lg text-center">
                {t('projects.noResults')}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
