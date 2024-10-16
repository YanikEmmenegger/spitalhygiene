const Header = () => {
    return (
        <header className="bg-white sha dow-md h-16 p-3"> {/* Set fixed header height */}
            <div className="container mx-auto flex items-center h-full"> {/* Vertically center contents */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="Logo.svg" // Just use the path without /chat
                        alt="Inselspital Logo"
                        className="h-12 w-auto"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
