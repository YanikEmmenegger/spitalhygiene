import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextButton from "./TextButton.tsx";
import LanguageSwitcher from "./LanguageSwitcher.tsx";

const Disclaimer: React.FC = () => {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    // Check if the cookie exists
    useEffect(() => {
        const cookieExists = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('disclaimerAccepted='));
        setIsVisible(!cookieExists);
    }, []);

    // Function to handle the acceptance of the disclaimer
    const handleAccept = () => {
        // Set the cookie to expire in 30 days
        const expires = new Date();
        expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        document.cookie = `disclaimerAccepted=true; expires=${expires.toUTCString()}; path=/`;
        setIsVisible(false);
    };

    if (!isVisible) return null; // Hide the component if the cookie exists

    return (
        <div className="w-full flex justify-center items-center h-screen fixed top-0 left-0 backdrop-blur-md z-50">
            <div className={"fixed left-6 bottom-6 md:right-6 md:left-auto"}>
                <LanguageSwitcher/>

            </div>
            <div
                className="bg-white p-6 flex flex-col justify-between w-full h-screen md:h-auto md:w-3/4 shadow-2xl rounded-lg">
                <div>
                    <h1 className="text-lg sm:text-lg md:text-xl font-bold mb-4">{t('disclaimer.title')}</h1>
                    <p className="text-xs sm:text-sm md:text-lg mb-4">{t('disclaimer.text')}</p>
                </div>
                <div className={"flex justify-end"}>
                    <TextButton text={t('disclaimer.accept')} onClick={handleAccept}/>

                </div>

            </div>
        </div>
    );
};

export default Disclaimer;
