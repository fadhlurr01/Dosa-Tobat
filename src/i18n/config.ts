import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import id from './locales/id';
import en from './locales/en';
import ar from './locales/ar';
import ms from './locales/ms';
import tr from './locales/tr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id,
      en,
      ar,
      ms,
      tr
    },
    lng: 'id', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
