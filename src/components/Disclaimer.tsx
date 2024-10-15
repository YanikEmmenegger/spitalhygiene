import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextButton from "./TextButton.tsx";
import LanguageSwitcher from "./LanguageSwitcher.tsx";

const Disclaimer: React.FC = () => {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    // Check if disclaimer cookie exists and hide disclaimer if it does
    useEffect(() => {
        const cookieExists = document.cookie.split(';').some(cookie => cookie.trim().startsWith('disclaimerAccepted='));
        setIsVisible(!cookieExists); // Show disclaimer if no cookie is found
    }, []);

    // Handle the acceptance of the disclaimer and set a 30-day cookie
    const handleAccept = () => {
        const expires = new Date();
        expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // Set expiration for 30 days
        document.cookie = `disclaimerAccepted=true; expires=${expires.toUTCString()}; path=/`; // Set cookie
        setIsVisible(false); // Hide disclaimer
    };

    if (!isVisible) return null; // Don't render the disclaimer if cookie exists

    return (
        <div className="w-full flex overflow-auto justify-center items-center h-screen fixed top-0 left-0 backdrop-blur-md z-50">
            {/* Language Switcher positioned at the bottom left on small screens */}
            <div className="fixed left-6 bottom-20 md:right-6 md:left-auto">
                <LanguageSwitcher/>
            </div>

            {/* Main Disclaimer Box */}
            <div
                className="bg-white px-6 py-20 flex flex-col justify-between w-full h-screen md:h-auto md:w-3/4 shadow-2xl rounded-lg">
                <div>
                    <h1 className="text-lg md:text-xl font-bold mb-4">{t('disclaimer.title')}</h1>
                    <p className="text-xs md:text-lg mb-4">{t('disclaimer.text')}</p>
                </div>

                {/* Accept Button */}
                <div className="flex justify-end">
                    <TextButton text={t('disclaimer.accept')} onClick={handleAccept}/>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
