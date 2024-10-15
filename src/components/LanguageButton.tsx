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
            className={`px-4 py-2 rounded-lg transition-colors ${
                isSelected
                    ? 'bg-lightGreen text-white'
                    : 'text-lightGray hover:bg-DarkGreen hover:text-white'
            }`}
        >
            {language}
        </button>
    );
};

export default LanguageButton;
