import {FC, ReactNode, useEffect, useState} from "react";
import {AuthService} from "./AuthService";
import LoginForm from "./LoginForm.tsx";
import supabase from "../../utils/supabase.ts";
import {CookieService} from "./CookieService.ts";

interface LoginProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<LoginProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await AuthService.checkSession();
            const cookieExists = CookieService.getCookie();

            if (session && cookieExists) {
                // Set the cookie only for Streamlit to access
                await CookieService.setCookie(session.access_token);
                setIsAuthenticated(true);
            } else {
                // Destroy cookie if no session exists or the cookie is missing
                await CookieService.destroyCookie();
                setIsAuthenticated(false);

                // Log out from Supabase if cookie is missing or session is invalid
                await supabase.auth.signOut();
            }
        };

        checkAuth();

        // Listen to authentication state changes
        const {data: authListener} = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth event:", event);
            if (session) {
                // Set the cookie only for Streamlit to access
                await CookieService.setCookie(session.refresh_token);
                setIsAuthenticated(true);
            } else {
                // Clear the cookie when logged out
                await CookieService.destroyCookie();
                setIsAuthenticated(false);
            }
        });

        // Cleanup the listener on component unmount
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    return <>{isAuthenticated ? children : <LoginForm/>}</>;
};

export default AuthProvider;
