// src/components/LanguageButton.tsx
import React from 'react';

interface LanguageButtonProps {
    language: string;
    isSelected: boolean;
    onClick: () => void; // Change to a function with no parameters
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
                                                           language,
                                                           isSelected,
                                                           onClick,
                                                       }) => {
    return (
        <button
            onClick={onClick} // Call onClick directly
            className={`px-4 py-2 rounded transition-colors ${
                isSelected
                    ? 'bg-gray-300 text-gray-800'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
        >
            {language}
        </button>
    );
};

export default LanguageButton;
