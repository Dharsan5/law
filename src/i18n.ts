import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        search: 'Search',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
      },
      nav: {
        home: 'Home',
        searchLaws: 'Search Laws',
        trackCases: 'Track Cases',
        findAdvocates: 'Find Advocates',
        legalAssistant: 'Legal Assistant',
        dashboard: 'Dashboard',
        profile: 'Profile',
        documents: 'Documents',
      },
    },
  },
  hi: {
    translation: {
      common: {
        search: 'खोजें',
        login: 'लॉगिन',
        register: 'पंजीकरण',
        logout: 'लॉगआउट',
        loading: 'लोड हो रहा है...',
        error: 'त्रुटि',
        success: 'सफलता',
        cancel: 'रद्द करें',
        save: 'सेव करें',
        delete: 'मिटाएं',
        edit: 'संपादित करें',
        view: 'देखें',
      },
      nav: {
        home: 'होम',
        searchLaws: 'कानून खोजें',
        trackCases: 'केस ट्रैक करें',
        findAdvocates: 'वकील खोजें',
        legalAssistant: 'कानूनी सहायक',
        dashboard: 'डैशबोर्ड',
        profile: 'प्रोफाइल',
        documents: 'दस्तावेज़',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
