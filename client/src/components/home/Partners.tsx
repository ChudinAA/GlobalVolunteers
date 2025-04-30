import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Partner } from '@shared/schema';
import { Loader2, Handshake, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Partners = () => {
  const { t } = useTranslation();

  // Fetch partners
  const { data: partners, isLoading, error } = useQuery<Partner[]>({
    queryKey: ['/api/partners'],
    queryFn: async () => {
      const response = await fetch('/api/partners');
      if (!response.ok) throw new Error('Failed to fetch partners');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-16 space-y-3">
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

  if (!partners || partners.length === 0) {
    return (
      <div className="bg-gray-100 text-gray-500 p-8 rounded-lg text-center my-8">
        {t('partners.noPartners')}
      </div>
    );
  }

  return (
    <div className="relative bg-blue-50/50 rounded-xl py-16 px-4 md:px-8 mb-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center bg-primary-light text-primary px-4 py-1.5 rounded-full mb-3">
            <Handshake className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{t('partners.label')}</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 lg:gap-12 items-center justify-items-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={partner.id} 
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
            >
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 duration-300"
                  title={partner.name}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-24 md:max-h-32 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to a placeholder image if the logo fails to load
                      e.currentTarget.src = 'https://placehold.co/200x100/e2e8f0/64748b?text=Partner';
                    }}
                  />
                </a>
              </div>
              <p className="mt-3 text-sm text-center text-gray-600 font-medium">{partner.name}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            className="group"
            onClick={() => window.location.href = '/contact'}
          >
            {t('partners.becomePartner')}
            <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
