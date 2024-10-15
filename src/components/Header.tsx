
const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md h-16 p-3"> {/* Set a fixed height for the header */}
            <div className="container mx-auto flex items-center h-full"> {/* Use h-full to vertically center the contents */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="/Logo.svg"
                        alt="Logo Inselspital"
                        className="h-12 w-auto"
                    />
                </div>

            </div>
        </header>
    );
};

export default Header;
