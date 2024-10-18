import {FC} from "react";
import {GoLinkExternal} from "react-icons/go";

interface NavigationLinkProps {
    href: string;
    text: string;
}

const NavigationLink: FC<NavigationLinkProps> = ({href, text}) => {
    return (
        <div className="flex flex-row items-center gap-3">
            {/* Show external link icon only on large screens */}
            <GoLinkExternal className="hidden lg:block"/>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer" // Adds security and accessibility for external links
                className="text-lightGray text-xl font-medium hover:text-lightGreen transition-colors">
                {text}
            </a>
        </div>
    );
};

export default NavigationLink;
