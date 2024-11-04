import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import Cookies from 'js-cookie';

// List of supported languages
const supportedLanguages = ['de', 'fr', 'en'];

// Check cookies for saved language
const storedLanguage = Cookies.get('language');

// Determine the default language
let lng;

if (storedLanguage) {
    // Use saved language from cookies if available
    lng = storedLanguage;
} else {
    // Use default language if no saved language is found
    lng = import.meta.env.VITE_DEFAULT_LANGUAGE || 'de';
}

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: lng,
        fallbackLng: 'de',
        supportedLngs: supportedLanguages,
        backend: {
            loadPath: '/locales/{{lng}}.json',
        },
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
    });

// Store language in cookies whenever it changes
i18n.on('languageChanged', (lng) => {
    Cookies.set('language', lng, {expires: 365}); // Set cookie to expire in 1 year
});

export default i18n;
