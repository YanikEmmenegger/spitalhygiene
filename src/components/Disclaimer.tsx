import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextButton from "./TextButton.tsx";
import LanguageSwitcher from "./LanguageSwitcher.tsx";
import {motion} from 'framer-motion';
import Cookies from 'js-cookie'; // Import js-cookie

const Disclaimer: React.FC = () => {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Check if disclaimer cookie exists and hide disclaimer if it does
    useEffect(() => {
        const cookieExists = Cookies.get('disclaimerAccepted'); // Use js-cookie to check if cookie exists
        setIsVisible(!cookieExists); // Show disclaimer if no cookie is found
    }, []);

    // Handle the acceptance of the disclaimer and set a 30-day cookie
    const handleAccept = () => {
        // Set cookie using js-cookie with 30-day expiration
        Cookies.set('disclaimerAccepted', 'true', {expires: 30, path: '/'});
        setIsFadingOut(true); // Trigger fade-out animation

        // Set a timeout to hide the disclaimer after animation
        setTimeout(() => {
            setIsVisible(false); // Hide disclaimer after animation
        }, 500); // Delay for the fade-out animation duration
    };

    if (!isVisible) return null; // Don't render the disclaimer if cookie exists

    return (
        <motion.div
            initial={{opacity: 1}}
            animate={{opacity: isFadingOut ? 0 : 1}}
            transition={{duration: 0.3}}
            className="w-full flex overflow-auto justify-center md:items-start md:pt-10 h-screen fixed top-0 left-0 backdrop-blur-lg z-50"
        >
            {/* Language Switcher positioned at the bottom left on small screens */}
            <div className="fixed left-6 bottom-20 md:right-6 md:left-auto">
                <LanguageSwitcher/>
            </div>

            {/* Main Disclaimer Box */}
            <div
                className="bg-white px-6 pb-20 md:pb-5 pt-5 flex flex-col justify-between w-full h-screen md:h-auto md:w-3/4 shadow-2xl rounded-lg"
            >
                <div>
                    <h1 className="text-lg md:text-xl text-lightGray font-bold mb-4">{t('disclaimer.title')}</h1>
                    <p className="text-xs md:text-lg text-lightGray mb-4">{t('disclaimer.text')}</p>
                </div>

                {/* Accept Button */}
                <div className="flex justify-end">
                    <TextButton text={t('disclaimer.accept')} onClick={handleAccept}/>
                </div>
            </div>
        </motion.div>
    );
};

export default Disclaimer;
