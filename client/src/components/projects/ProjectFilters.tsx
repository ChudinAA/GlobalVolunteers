import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ProjectCategory, ProjectStatus, Project } from '@shared/schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectFiltersProps {
  filters: {
    category: string;
    status: string;
    location: string;
    period: string;
    recruitmentDeadline: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
}

const ProjectFilters = ({ filters, onFilterChange }: ProjectFiltersProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // Get unique countries for location filter
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    enabled: true,
  });

  // Extract unique countries for the location filter and convert to array
  const uniqueLocationsArray = projects 
    ? Array.from(new Set(projects.map(project => project.country)))
    : [];
  
  // Sort locations alphabetically
  const countries = uniqueLocationsArray.sort((a, b) => a.localeCompare(b));

  return (
    <div className={`bg-white ${!isMobile ? 'p-4 md:p-6 rounded-lg shadow-sm md:shadow-md' : ''} w-full`}>
      {!isMobile && (
        <h2 className="font-heading font-semibold text-lg md:text-xl mb-3 md:mb-4">
          {t('projects.filters.title')}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4">
        {/* Category Filter */}
        <div>
          <Label htmlFor="category-filter" className="mb-1 md:mb-2 block text-sm font-medium">
            {t('projects.filters.category')}
          </Label>
          <Select 
            value={filters.category || ''}
            onValueChange={(value) => onFilterChange('category', value === 'all' ? '' : value)}
          >
            <SelectTrigger id="category-filter" className="h-9 md:h-10">
              <SelectValue placeholder={t('projects.filters.allCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('projects.filters.allCategories')}</SelectItem>
              <SelectItem value={ProjectCategory.MEDICAL}>{t('categories.medical')}</SelectItem>
              <SelectItem value={ProjectCategory.EDUCATION}>{t('categories.education')}</SelectItem>
              <SelectItem value={ProjectCategory.SPORTS}>{t('categories.sports')}</SelectItem>
              <SelectItem value={ProjectCategory.ENVIRONMENT}>{t('categories.environment')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Status Filter */}
        <div>
          <Label htmlFor="status-filter" className="mb-1 md:mb-2 block text-sm font-medium">
            {t('projects.filters.status')}
          </Label>
          <Select 
            value={filters.status || ''} 
            onValueChange={(value) => onFilterChange('status', value === 'all' ? '' : value)}
          >
            <SelectTrigger id="status-filter" className="h-9 md:h-10">
              <SelectValue placeholder={t('projects.filters.allStatuses')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('projects.filters.allStatuses')}</SelectItem>
              <SelectItem value={ProjectStatus.ACTIVE}>{t('status_active')}</SelectItem>
              <SelectItem value={ProjectStatus.UPCOMING}>{t('status_upcoming')}</SelectItem>
              <SelectItem value={ProjectStatus.COMPLETED}>{t('status_completed')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Location Filter */}
        <div>
          <Label htmlFor="location-filter" className="mb-1 md:mb-2 block text-sm font-medium">
            {t('projects.filters.location')}
          </Label>
          <Select 
            value={filters.location || ''} 
            onValueChange={(value) => onFilterChange('location', value === 'all' ? '' : value)}
          >
            <SelectTrigger id="location-filter" className="h-9 md:h-10">
              <SelectValue placeholder={t('projects.filters.allLocations')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('projects.filters.allLocations')}</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Period Filter (Start Date) */}
        <div>
          <Label htmlFor="period-filter" className="mb-1 md:mb-2 block text-sm font-medium">
            {t('projects.filters.period')}
          </Label>
          <Input
            id="period-filter"
            type="date"
            value={filters.period}
            onChange={(e) => onFilterChange('period', e.target.value)}
            className="w-full h-9 md:h-10"
          />
        </div>
        
        {/* Recruitment Deadline Filter */}
        <div>
          <Label htmlFor="deadline-filter" className="mb-1 md:mb-2 block text-sm font-medium">
            {t('projects.filters.deadline')}
          </Label>
          <Input
            id="deadline-filter"
            type="date"
            value={filters.recruitmentDeadline}
            onChange={(e) => onFilterChange('recruitmentDeadline', e.target.value)}
            className="w-full h-9 md:h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
