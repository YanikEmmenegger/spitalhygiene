import {useEffect, useState} from 'react';
import {FaSpinner} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management
import {motion} from 'framer-motion'; // Import motion for animations

const EmbeddedApp = () => {
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const [isIframeLoaded, setIsIframeLoaded] = useState(false); // State to track iframe loading status
    const {t} = useTranslation(); // Use translation hook

    useEffect(() => {
        const checkCookie = () => {
            const cookieValue = Cookies.get('disclaimerAccepted'); // Check for the cookie
            if (cookieValue === 'true') {
                // If cookie exists, start loading the iframe
                setIsLoading(false); // Hide loading spinner for cookie check
            } else {
                setTimeout(checkCookie, 1000); // Retry checking every second until cookie is found
            }
        };

        checkCookie(); // Initial cookie check
    }, []);

    const handleIframeLoad = () => {
        setTimeout(() => {
            setIsIframeLoaded(true); // Set iframe loaded state to true
        }, 1000); // Delay to ensure iframe is fully loaded
    };

    return (
        <div className="relative flex flex-col text-center h-full mx-auto">
            {/* Overlay with loading spinner */}
            {(isLoading || !isIframeLoaded) && (
                <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center bg-transparent">
                    <p>
                        {t('loading')} {/* Loading text from translation */}
                    </p>
                    <FaSpinner className="animate-spin text-darkGray h-12 w-12"/> {/* Spinner icon */}
                </div>
            )}

            {/* Render iframe only if cookie exists */}
            {!isLoading && (
                <motion.div
                    initial={{opacity: 0}} // Start with 0 opacity
                    animate={{opacity: isIframeLoaded ? 1 : 0}} // Animate to full opacity when loaded
                    transition={{duration: 1}} // Duration of the fade-in effect
                    className="w-full flex-1 overflow-auto"
                >
                    <iframe
                        title="Embedded Application"
                        className="w-full h-full" // Set width and height for the iframe
                        allowFullScreen={true}
                        onLoad={handleIframeLoad} // Update loading state when iframe loads
                        src={import.meta.env.VITE_EMBEDDED_APP_URL} // Make sure to include a valid source URL
                    ></iframe>
                </motion.div>
            )}
        </div>
    );
};

export default EmbeddedApp;
