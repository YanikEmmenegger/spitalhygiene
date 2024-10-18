import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import TextButton from "../TextButton.tsx";
import {AuthService} from "./AuthService.ts";
import LanguageSwitcher from "../LanguageSwitcher.tsx";
// Reusing your styled button

const LoginForm = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Email validator that checks if the email ends with "@insel.ch"
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domainRegex = /@insel\.ch$/;
        if (!emailRegex.test(email.toLowerCase())) {
            return t("login.invalid_email");
        }
        if (!domainRegex.test(email.toLowerCase())) {
            return t("login.invalid_domain");
        }
        return "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validateEmail(email);

        if (validationError) {
            setError(validationError);
            return;
        }

        const success = await AuthService.loginWithMagicLink(email);
        if (success) {
            setMessage(t("login.magic_link_sent"));
            setError("");
        } else {
            setError(t("login.magic_link_error"));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">
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
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <div className="flex justify-center">
                        <TextButton text={t("login.button_text")} onClick={() => {
                        }} className="w-full"/>
                    </div>
                </form>

                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            </div>
            <div
                className="fixed right-4 bottom-4">
                <LanguageSwitcher/>
            </div>
        </div>
    );
};

export default LoginForm;
