import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const VideoHero = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) return null; // Don't render until translations are loaded
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // List of high-quality volunteer videos
  const videoUrls = [
    'https://assets.mixkit.co/videos/preview/mixkit-diverse-group-of-volunteers-planting-trees-13748-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-group-of-diverse-volunteers-cleaning-up-trash-13750-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-diverse-group-of-volunteers-helping-people-in-need-13752-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-diverse-young-people-volunteering-in-a-hospital-13755-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-community-volunteers-preparing-and-distributing-food-donations-13754-large.mp4'
  ];

  // Fallback image in case video doesn't load
  const fallbackImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';

  // Handle scroll to section functionality
  const scrollToSection = (sectionId: string) => {
    setLocation(`/#${sectionId}`);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Preload videos and rotate them
  useEffect(() => {
    let videoElement = document.createElement('video');
    videoElement.src = videoUrls[currentVideoIndex];
    videoElement.oncanplay = () => setIsLoading(false);
    videoElement.load();
    
    // Change video every 12 seconds
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    }, 12000);

    return () => {
      clearInterval(interval);
      videoElement.oncanplay = null;
    };
  }, []);
  
  // When video index changes, fade between videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrls[currentVideoIndex];
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Auto-play failed:', e));
    }
  }, [currentVideoIndex]);

  return (
    <div className="relative h-[65vh] sm:h-[60vh] overflow-hidden">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-primary opacity-50 z-10"></div>
      
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transform scale-105"
            >
              <source src={videoUrls[currentVideoIndex]} type="video/mp4" />
              <img 
                src={fallbackImage} 
                alt={t('home_hero_imageAlt')} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </video>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={fallbackImage} 
              alt={t('home_hero_imageAlt')} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Content */}
      <motion.div 
        className="relative z-20 flex items-center justify-center h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('home_hero_title')}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t('home_hero_description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('volunteer-form')}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              {t('home_hero_volunteerButton')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/90 hover:bg-white text-primary transform transition-transform duration-300 hover:scale-105"
              onClick={() => scrollToSection('partner-form')}
            >
              {t('home_hero_partnerButton')}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoHero;
