import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { TeamMember } from '@shared/schema';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fetch team members
  const { data: teamMembers, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ['/api/team'],
    queryFn: async () => {
      const response = await fetch('/api/team');
      if (!response.ok) throw new Error('Failed to fetch team members');
      return response.json();
    }
  });

  return (
    <>
      <Helmet>
        <title>{t('team.meta.title')}</title>
        <meta name="description" content={t('team.meta.description')} />
      </Helmet>

      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl mb-6 text-center">
            {t('team.title')}
          </h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('team.description')}
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
              {t('errors.teamLoad')}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map(member => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary font-medium mb-1">
                      {currentLanguage === 'en' ? member.roleEn : member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {currentLanguage === 'en' ? member.positionEn : member.position}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center text-gray-500">
              {t('team.noMembers')}
            </div>
          )}

          {/* Team Values Section */}
          <div className="mt-16">
            <h2 className="font-heading font-bold text-3xl text-center mb-8">
              {t('team.values.title')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {t('team.values.value1.title')}
                </h3>
                <p className="text-gray-600">
                  {t('team.values.value1.description')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {t('team.values.value2.title')}
                </h3>
                <p className="text-gray-600">
                  {t('team.values.value2.description')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {t('team.values.value3.title')}
                </h3>
                <p className="text-gray-600">
                  {t('team.values.value3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
