import './App.css';
import HomePage from "./components/HomePage.tsx";
import LogoHeader from "./components/Header.tsx";
import Disclaimer from "./components/Disclaimer.tsx";

function App() {
    return (
        <>
            <Disclaimer />
            <div className="flex flex-col h-screen">
                <LogoHeader />
                <div className="flex-1 container mx-auto overflow-hidden"> {/* Use flex-1 to take the remaining height */}
                    <HomePage />
                </div>
            </div>
        </>
    );
}

export default App;
