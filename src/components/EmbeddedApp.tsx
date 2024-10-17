import {useEffect, useState} from 'react';
import {FaSpinner} from 'react-icons/fa';
import {twMerge} from 'tailwind-merge';
import {useTranslation} from 'react-i18next';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

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
        setIsIframeLoaded(true); // Mark iframe as loaded
        setTimeout(() => {
            setIsLoading(false); // Hide loading spinner after 1 second delay
        }, 1000);
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
                <iframe
                    title="Embedded Application"
                    className={twMerge("w-full flex-1 overflow-auto", isIframeLoaded ? "opacity-100" : "opacity-0")} // Occupies full width and the remaining height
                    allowFullScreen={true}
                    onLoad={handleIframeLoad} // Update loading state when iframe loads
                    src="http://localhost:8501" // Make sure to include a valid source URL
                ></iframe>
            )}
        </div>
    );
};

export default EmbeddedApp;
