// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// List of supported languages
const supportedLanguages = ['de', 'fr', 'en', 'it'];

// Check local storage for saved language
const storedLanguage = localStorage.getItem('language');

// Determine the default language
let lng;

if (storedLanguage) {
    // Use saved language from local storage if available
    lng = storedLanguage;
} else {
    // Detect the user's browser or device language
    const userLanguage = navigator.language || navigator.languages[0];
    const languageCode = userLanguage.split('-')[0];

    // Set default language to German ('de') if the user's language is not supported
    lng = supportedLanguages.includes(languageCode) ? languageCode : 'de';
}

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: lng,
        fallbackLng: 'de',
        supportedLngs: supportedLanguages,
        backend: {
            loadPath: 'locales/{{lng}}.json',
        },
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
    });

// Store language in local storage whenever it changes
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18n;
