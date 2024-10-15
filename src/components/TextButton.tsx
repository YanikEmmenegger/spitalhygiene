// src/components/LanguageButton.tsx
import React from 'react';
import {twMerge} from "tailwind-merge";

interface TextButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    red?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({text, onClick, className, red}) => {
    return (
        <button onClick={onClick}
                className={twMerge(className, "text-white rounded-lg px-4 py-2", red ? "bg-lightRed" : "bg-lightGreen")}>
            {text}
        </button>
    );
};

export default TextButton;
