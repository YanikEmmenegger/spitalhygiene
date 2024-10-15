import {motion} from 'framer-motion';
import {twMerge} from 'tailwind-merge';
import LanguageSwitcher from "./LanguageSwitcher.tsx";
import {useTranslation} from "react-i18next";
import NavigationLink from "./NavigationLink.tsx";
import TextButton from "./TextButton.tsx";

interface NavigationProps {
    isNavVisible: boolean;
    isSmallScreen: boolean;
    toggleNav: () => void;
}

const Navigation: React.FC<NavigationProps> = ({isNavVisible, isSmallScreen, toggleNav}) => {
    const {t} = useTranslation(); // Use translation hook

    return (
        <motion.div
            initial={false}
            animate={{
                width: isNavVisible
                    ? isSmallScreen ? '100%' : '35%'  // Adjust width based on visibility and screen size
                    : '0%',                            // Set width to 0 when not visible
            }}
            transition={{duration: 0.3}}
            className={twMerge(
                "h-full absolute bg-white lg:bg-transparent lg:relative right-0 top-0 flex flex-col overflow-hidden",
                isNavVisible ? 'block border-l-[1px] border-t-2 lg:border-t-0' : 'hidden lg:block' // Handle visibility for mobile and desktop
            )}
        >
            <motion.div
                className="p-4 flex flex-col justify-between h-full"
                animate={{opacity: isNavVisible ? 1 : 0}} // Fade in/out based on visibility
                transition={{delay: 0.1}}
            >
                <div className="ml-10 mt-20 lg:text-left">
                    <h2 className="text-3xl mb-5 font-bold">
                        {t('navigation.title')} {/* Navigation title from translation */}
                    </h2>

                    {/* Navigation links */}
                    <div className="flex flex-col items-start gap-1">

                        {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            t('navigation.links', {returnObjects: true}).map((link, index) => (
                                <NavigationLink key={index} href={link.link} text={link.title}/>
                            ))}
                    </div>

                    {/* Toggle button only visible on small screens */}
                    {isSmallScreen && (
                        <div className="mt-10 pb-5">
                            <TextButton text="→" onClick={toggleNav}/>
                        </div>
                    )}
                </div>

                {/* Language switcher at the bottom */}
                <div className="ml-10 mb-5 text-center">
                    <LanguageSwitcher/>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Navigation;