import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import TextButton from "../TextButton.tsx";
import {AuthService} from "./AuthService.ts";
import LanguageSwitcher from "../Languages/LanguageSwitcher.tsx";

const LoginForm = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Get allowed domains from Vite environment variables
    const validDomains = JSON.parse(import.meta.env.VITE_ALLOWED_DOMAINS);

    useEffect(() => {
        // Get the hash from the URL
        const hash = window.location.hash;

        if (hash) {
            // Remove the leading "#" and split by "&" to get individual parameters
            const params = new URLSearchParams(hash.slice(1));

            // Extract error details
            const error = params.get("error") || "";
            const errorCode = params.get("error_code") || "";
            const errorDescription = params.get("error_description") || "";

            console.error(`Error code: ${errorCode}, Error description: ${errorDescription}`);
            if (error) {
                setError(t("login.error"));
            }
        }
    }, []);

    // Email validator that checks if the email is in a valid format and belongs to a valid domain
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.toLowerCase())) {
            return t("login.invalid_email");
        }

        // Extract the domain from the email
        const domain = email.split("@")[1];
        if (!validDomains.includes(domain)) {
            return t("login.invalid_domain");
        }

        return "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validateEmail(email);
        setLoading(true);

        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        const success = await AuthService.loginWithMagicLink(email);
        if (success) {
            setMessage(t("login.magic_link_sent"));
            setError("");
        } else {
            setError(t("login.magic_link_error"));
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col -mt-10 gap-10 items-center justify-center min-h-screen">
            <img
                src={"/Logo.svg"}
                alt="Inselspital Logo"
                className="h-12 w-auto"
            />
            <div className="bg-transparent md:bg-white p-8 rounded-lg md:shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold md:text-center text-gray-700 mb-5">
                    {t("login.title")}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">
                            {t("login.email_label")}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightGreen"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("login.email_placeholder")}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <TextButton text={loading ? t('login.loading') : t("login.button_text")} onClick={() => {
                        }} className="w-full"/>
                    </div>
                </form>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            </div>
            <div className="fixed right-4 bottom-4">
                <LanguageSwitcher/>
            </div>
        </div>
    );
};

export default LoginForm;
