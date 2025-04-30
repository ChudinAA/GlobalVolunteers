import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  isDark?: boolean;
}

const LanguageSwitcher = ({ isDark = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLanguage);
    // Save language preference to localStorage
    localStorage.setItem('language', newLanguage);
  };

  return (
    <Button
      variant={isDark ? "outline" : "secondary"}
      size="sm"
      onClick={toggleLanguage}
      className={isDark 
        ? "bg-transparent border-white text-white hover:bg-white hover:text-primary" 
        : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
      }
    >
      {currentLanguage === 'en' ? 'РУ' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
