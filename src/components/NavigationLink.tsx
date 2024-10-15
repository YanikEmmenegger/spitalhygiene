import {FC} from "react";
import {GoLinkExternal} from "react-icons/go";

interface NavigationLinkProps {
    href: string;
    text: string;
}

const NavigationLink: FC<NavigationLinkProps> = ({href, text}) => {
    return (
        <div className={"flex flex-row items-center gap-1"}>
            <GoLinkExternal className={"hidden lg:block"}/>
            <a href={href} target={"_blank"} className="text-lightGray text-xl font-medium hover:text-lightGreen transition-colors">
                {text}
            </a>
        </div>
    );
}

export default NavigationLink;
