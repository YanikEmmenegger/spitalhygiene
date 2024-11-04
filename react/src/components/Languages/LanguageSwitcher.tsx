// src/components/LanguageSwitcher.tsx
import React from 'react';
import {useTranslation} from 'react-i18next';
import LanguageButton from './LanguageButton.tsx';

const LanguageSwitcher: React.FC = () => {
    const {i18n} = useTranslation();
    const currentLanguage = i18n.language || 'de'; // Default to German


    // Language options
    const languages = ['de', 'fr', 'en'];

    console.log(import.meta.env.VITE_MULTI_LANGUAGE); // is set to false


    return import.meta.env.VITE_MULTI_LANGUAGE === 'true' && (
        <div className="flex space-x-2">
            {languages.map((lng) => (
                <LanguageButton
                    key={lng}
                    language={lng.toUpperCase()} // Display language in uppercase
                    isSelected={lng === currentLanguage}
                    onClick={() => i18n.changeLanguage(lng)} // Call changeLanguage directly
                />
            ))}
        </div>
    );
};

export default LanguageSwitcher;
