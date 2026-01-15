import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    english: { translation: en },
    vietnam: { translation: vi },
  },
  lng: 'vietnam',
  fallbackLng: 'english',
  interpolation: { escapeValue: false },
});

export default i18n;
