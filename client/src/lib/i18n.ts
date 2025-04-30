
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruTranslationData from '../locales/ru.json';

// Только русская локализация
const i18nInstance = i18n
  .use(initReactI18next);

const initPromise = i18nInstance.init({
  resources: {
    ru: {
      translation: ruTranslationData
    }
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false
  },
  load: 'languageOnly',
  debug: false,
  react: {
    useSuspense: false, // This ensures translations are loaded before rendering
    wait: true
  }
});

export { initPromise };
export default i18nInstance;
