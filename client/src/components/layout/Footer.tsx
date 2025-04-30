import { Link } from 'wouter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Collapsible section component for mobile
const CollapsibleSection = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">{title}</h3>
        {children}
      </div>
    );
  }

  return (
    <div className="border-b border-gray-800 pb-3">
      <button 
        className="w-full flex items-center justify-between py-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-heading font-semibold text-base">{title}</h3>
        <div className="text-gray-400">
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-3' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/volunteers', label: t('nav.volunteers') },
    { href: '/organizations', label: t('nav.organizations') },
    { href: '/about', label: t('nav.about') },
    { href: '/team', label: t('nav.team') },
    { href: '/news', label: t('nav.news') },
    { href: '/contact', label: t('nav.contact') }
  ];

  const projectCategories = [
    { href: '/projects?category=medical', label: t('categories.medical'), color: 'medical' },
    { href: '/projects?category=education', label: t('categories.education'), color: 'education' },
    { href: '/projects?category=sports', label: t('categories.sports'), color: 'sports' },
    { href: '/projects?category=environment', label: t('categories.environment'), color: 'environment' }
  ];

  const companyInfo = (
    <>
      <h3 className="font-heading font-bold text-xl mb-3 md:mb-4">{t('general_logo')}</h3>
      <p className="text-gray-400 mb-4 text-sm md:text-base">{t('footer_description')}</p>
      <div className="flex space-x-5 mb-2">
        <a 
          href="#" 
          className="text-gray-400 hover:text-white transition-colors p-2 -ml-2"
          aria-label="Facebook"
        >
          <Facebook size={18} />
        </a>
        <a 
          href="#" 
          className="text-gray-400 hover:text-white transition-colors p-2"
          aria-label="Twitter"
        >
          <Twitter size={18} />
        </a>
        <a 
          href="#" 
          className="text-gray-400 hover:text-white transition-colors p-2"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
        <a 
          href="#" 
          className="text-gray-400 hover:text-white transition-colors p-2"
          aria-label="YouTube"
        >
          <Youtube size={18} />
        </a>
      </div>
    </>
  );

  const navigationLinks = (
    <ul className="grid grid-cols-1 gap-y-2">
      {navLinks.map(link => (
        <li key={link.href}>
          <Link href={link.href}>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm py-1">
              {link.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  const categoryLinks = (
    <ul className="grid grid-cols-1 gap-y-2">
      {projectCategories.map(category => (
        <li key={category.href}>
          <Link href={category.href}>
            <div className="text-gray-400 hover:text-gray-100 transition-colors cursor-pointer text-sm py-1">
              {category.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  const contactInfo = (
    <ul className="space-y-2">
      <li className="flex items-start">
        <MapPin className="min-w-[16px] mt-1 mr-2 text-gray-400" size={16} />
        <span className="text-gray-400 text-sm break-words">{t('contact_info_address')}</span>
      </li>
      <li className="flex items-start">
        <Phone className="min-w-[16px] mt-1 mr-2 text-gray-400" size={16} />
        <span className="text-gray-400 text-sm">{t('contact_info_phone')}</span>
      </li>
      <li className="flex items-start">
        <Mail className="min-w-[16px] mt-1 mr-2 text-gray-400" size={16} />
        <span className="text-gray-400 text-sm">{t('contact_info_email')}</span>
      </li>
    </ul>
  );

  return (
    <footer className="bg-gray-900 text-white pt-10 md:pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Mobile view (collapsible sections) */}
        {isMobile ? (
          <div className="mb-8">
            {/* Company info is always visible */}
            <div className="mb-6">
              {companyInfo}
            </div>
            
            <CollapsibleSection title={t('footer_navigation')}>
              {navigationLinks}
            </CollapsibleSection>
            
            <CollapsibleSection title={t('footer_categories')}>
              {categoryLinks}
            </CollapsibleSection>
            
            <CollapsibleSection title={t('footer_contact')}>
              {contactInfo}
            </CollapsibleSection>
          </div>
        ) : (
          /* Desktop view (grid layout) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-10">
            <div>
              {companyInfo}
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">{t('footer_navigation')}</h3>
              {navigationLinks}
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">{t('footer_categories')}</h3>
              {categoryLinks}
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">{t('footer_contact')}</h3>
              {contactInfo}
            </div>
          </div>
        )}
        
        {/* Footer bottom (copyright & links) - same for mobile and desktop */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs mb-4 sm:mb-0 text-center sm:text-left">
              {t('footer_copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
              <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
                {t('footer_privacy')}
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
                {t('footer_terms')}
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
                {t('footer_legal')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
