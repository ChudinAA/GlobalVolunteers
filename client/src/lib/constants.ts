// API endpoints
export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  NEWS: '/api/news',
  TEAM: '/api/team',
  PARTNERS: '/api/partners',
  TESTIMONIALS: '/api/testimonials',
  VOLUNTEER_APPLICATIONS: '/api/volunteer-applications',
  PARTNER_APPLICATIONS: '/api/partner-applications',
  CONTACT: '/api/contact',
  PROJECT_CATEGORIES: '/api/project-categories',
  PROJECT_STATUSES: '/api/project-statuses',
};

// Category colors
export const CATEGORY_COLORS = {
  medical: {
    color: '#E53E3E',
    bgColor: 'bg-medical-light',
    textColor: 'text-medical',
    borderColor: 'border-medical'
  },
  education: {
    color: '#ECC94B',
    bgColor: 'bg-education-light',
    textColor: 'text-education',
    borderColor: 'border-education'
  },
  sports: {
    color: '#3182CE',
    bgColor: 'bg-sports-light',
    textColor: 'text-sports',
    borderColor: 'border-sports'
  },
  environment: {
    color: '#48BB78',
    bgColor: 'bg-environment-light',
    textColor: 'text-environment',
    borderColor: 'border-environment'
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/project/:id',
  VOLUNTEERS: '/volunteers',
  ORGANIZATIONS: '/organizations',
  ABOUT: '/about',
  NEWS: '/news',
  TEAM: '/team',
  CONTACT: '/contact',
};

// Languages
export const LANGUAGES = {
  EN: 'en',
  RU: 'ru',
};

// Storage keys
export const STORAGE_KEYS = {
  LANGUAGE: 'language',
};
