import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Project, ProjectStatus } from '@shared/schema';
import { Loader2, ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import Carousel from '@/components/shared/Carousel';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const ActiveProjects = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fetch active projects
  const { data: allProjects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects', { status: ProjectStatus.ACTIVE }],
    queryFn: async () => {
      const response = await fetch(`/api/projects?status=${ProjectStatus.ACTIVE}`);
      if (!response.ok) throw new Error('Failed to fetch active projects');
      return response.json();
    }
  });

  const projects = allProjects.slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-16 space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-gray-500">{t('general.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-6 rounded-lg text-center my-8">
        {t('general.error')}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-gray-100 text-gray-500 p-8 rounded-lg text-center my-8">
        {t('home.activeProjects.noProjects')}
      </div>
    );
  }

  // Center the carousel items
  const carouselItems = projects.map((project, index) => (
    <motion.div 
      key={project.id} 
      className="flex-shrink-0 px-2 mx-auto w-full sm:w-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
    >
      <div className="transform transition-transform hover:scale-105 duration-300 mx-auto">
        <ProjectCard project={project} />
      </div>
    </motion.div>
  ));

  return (
    <div className="mb-12 mt-8">
      <div className="flex flex-col items-center mb-6">
        <motion.div 
          className="inline-flex items-center bg-primary-light text-primary px-4 py-1.5 rounded-full mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">{t('home.activeProjects.nowActive')}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Carousel 
          items={carouselItems} 
          leftArrow={<ChevronLeft className="text-gray-700" size={20} />}
          rightArrow={<ChevronRight className="text-gray-700" size={20} />}
        />
      </motion.div>

      <motion.div 
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link href="/projects">
          <Button 
            className="flex items-center group transition-all duration-300"
            variant="outline"
          >
            {t('home.activeProjects.viewAll')}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ActiveProjects;
