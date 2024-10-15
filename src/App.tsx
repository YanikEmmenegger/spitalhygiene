import './App.css';
import {useState, useEffect} from 'react';
import EmbeddedApp from "./components/EmbeddedApp.tsx";
import Disclaimer from "./components/Disclaimer.tsx";
import Navigation from "./components/Navigation.tsx";
import NavigationButton from "./components/NavigationButton.tsx";
import Header from "./components/Header.tsx";

function App() {
    // State for toggling navigation visibility
    const [isNavVisible, setNavVisible] = useState(true);
    // State for detecting small screen sizes
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Effect to detect screen size and adjust navigation visibility
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1028) {
                setNavVisible(false); // Automatically hide navigation on small screens
                setIsSmallScreen(true); // Set small screen state
            } else {
                setNavVisible(true); // Show navigation on larger screens
                setIsSmallScreen(false); // Reset small screen state
            }
        };

        // Initial check on component mount
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup resize listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Button to toggle navigation visibility */}
            <NavigationButton
                isSmallScreen={isSmallScreen}
                isNavVisible={isNavVisible}
                toggleNav={() => setNavVisible(!isNavVisible)}
            />

            {/* Disclaimer component */}
            <Disclaimer/>

            {/* Main container: flex layout with full screen height */}
            <div className="flex flex-col h-screen">
                {/* Logo/Header component */}
                <Header/>

                <div className="flex flex-1 w-full overflow-hidden relative">
                    {/* Main Content: Adjusts width based on navigation visibility */}
                    <div
                        className={`transition-all duration-300 ease-in-out ${isNavVisible ? 'w-full lg:w-3/4' : 'w-full'} flex-1`}
                    >
                        <EmbeddedApp/>
                    </div>

                    {/* Navigation Component */}
                    <Navigation
                        toggleNav={() => setNavVisible(!isNavVisible)}
                        isSmallScreen={isSmallScreen}
                        isNavVisible={isNavVisible}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
