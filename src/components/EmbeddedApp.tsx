import {useState} from 'react';
import {FaSpinner} from 'react-icons/fa';
import {twMerge} from "tailwind-merge"; // Import the spinner icon

const EmbeddedApp = () => {
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    return (
        <div className="relative flex flex-col text-center h-full mx-auto">
            {/* Overlay with loading spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-transparent">
                    <FaSpinner className="animate-spin text-darkGray h-12 w-12"/> {/* Spinner icon */}
                </div>
            )}

            <iframe
                title="Embedded Application"
                className={twMerge("w-full flex-1 overflow-auto", isLoading ? "opacity-0" : "opacity-100")} // Occupies full width and the remaining height
                allowFullScreen={true}
                onLoad={() => setIsLoading(false)} // Update loading state when iframe loads
                src="https://placehold.co/1900x1500/png" // Make sure to include a valid source URL
            ></iframe>
        </div>
    );
};

export default EmbeddedApp;
