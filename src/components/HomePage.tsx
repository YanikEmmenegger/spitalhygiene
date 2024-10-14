const HomePage = () => {
    return (
        <div className="flex flex-col bg-lightGray h-full mx-auto">
            Embed ChatBot here
            <iframe
                src=""
                title="Embedded Application"
                className="w-full flex-1 overflow-auto" // Ensure it occupies remaining space and allows scrolling
                allowFullScreen={true}
            ></iframe>
        </div>
    );
};

export default HomePage;
