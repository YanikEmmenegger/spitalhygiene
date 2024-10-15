const EmbeddedApp = () => {
    return (
        <div className="flex flex-col h-full mx-auto">
            {/* Wrapper div ensures the iframe is centered and takes full height */}
            <iframe
                title="Embedded Application"
                className="w-full flex-1 overflow-auto" // Occupies full width and the remaining height
                allowFullScreen={true}
            ></iframe>
        </div>
    );
};

export default EmbeddedApp;
