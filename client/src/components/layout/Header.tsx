import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, MapPin, Users, Building, Info, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  
  // Check if we're on the home page
  const isHomePage = location === '/';

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Set header styling based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: <Home size={18} /> },
    { href: '/projects', label: t('nav.projects'), icon: <MapPin size={18} /> },
    { href: '/volunteers', label: t('nav.volunteers'), icon: <Users size={18} /> },
    { href: '/organizations', label: t('nav.organizations'), icon: <Building size={18} /> },
    { href: '/about', label: t('nav.about'), icon: <Info size={18} /> },
    { href: '/contact', label: t('nav.contact'), icon: <Mail size={18} /> }
  ];

  // Determine header styling based on page and scroll position
  const headerClass = isHomePage && !isScrolled && !isMenuOpen
    ? 'absolute top-0 left-0 w-full z-50 bg-transparent'
    : `fixed top-0 left-0 w-full z-50 ${isScrolled || !isHomePage || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'}`;

  const linkClass = isHomePage && !isScrolled && !isMenuOpen
    ? 'text-white hover:text-secondary transition-colors'
    : 'text-gray-800 hover:text-primary transition-colors';

  const logoClass = isHomePage && !isScrolled && !isMenuOpen
    ? 'text-white'
    : 'text-primary';

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className={`font-heading font-bold text-2xl cursor-pointer ${logoClass}`}>
                {t('general.logo')}
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 font-medium items-center">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <div className={`${linkClass} ${location === link.href ? 'border-b-2 border-secondary' : ''} cursor-pointer`}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? 
                <X className="text-gray-800 h-6 w-6" /> : 
                <Menu className={isHomePage && !isScrolled ? 'text-white h-6 w-6' : 'text-gray-800 h-6 w-6'} />
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 top-[72px] bg-white overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.href}
                    variants={menuItemVariants}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <Link href={link.href}>
                      <div 
                        className={`flex items-center py-4 text-lg cursor-pointer ${
                          location === link.href 
                            ? 'text-primary font-medium' 
                            : 'text-gray-700 hover:text-primary'
                        }`}
                      >
                        <span className="mr-3 text-primary opacity-80">{link.icon}</span>
                        {link.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom links in mobile menu */}
            <motion.div 
              variants={menuItemVariants}
              className="absolute bottom-0 left-0 right-0 bg-gray-50 py-6 px-4"
            >
              <div className="container mx-auto">
                <div className="flex flex-col space-y-4">
                  <Link href="/volunteers">
                    <div className="w-full">
                      <Button className="w-full">
                        {t('home.hero.volunteerButton')}
                      </Button>
                    </div>
                  </Link>
                  <Link href="/organizations">
                    <div className="w-full">
                      <Button variant="outline" className="w-full">
                        {t('home.hero.partnerButton')}
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
