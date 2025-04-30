import { useTranslation } from 'react-i18next';
import { Heart, Target, Star } from 'lucide-react';

const AboutProject = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Heart className="text-white text-xl" />,
      title: t('home_about_mission_title'),
      description: t('home_about_mission_description')
    },
    {
      icon: <Target className="text-white text-xl" />,
      title: t('home_about_goal_title'),
      description: t('home_about_goal_description')
    },
    {
      icon: <Star className="text-white text-xl" />,
      title: t('home_about_uniqueness_title'),
      description: t('home_about_uniqueness_description')
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="font-heading font-semibold text-xl mb-3">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutProject;
