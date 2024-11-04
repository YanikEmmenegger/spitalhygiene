import supabase from "../../utils/supabase.ts";

export const AuthService = {
    // Check for an active session
    async checkSession() {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Supabase session error:", error.message);
                return null;
            }
            if (data && data.session) {
                console.log("Active session found:", data.session);
                return data.session;
            } else {
                console.log("No active session found");
                return null;
            }
        } catch (error) {
            console.error("Unexpected error while checking session:", error);
            return null;
        }
    },

    // Login using a magic link (OTP)
    async loginWithMagicLink(email: string) {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: import.meta.env.DEV
                        ? "http://localhost:5173/chat/"
                        : import.meta.env.VITE_HOST_URL,
                },
            });

            if (error) {
                console.error("Magic link login error:", error.message);
                return false;
            }

            console.log(`Magic link sent to ${email}`);
            return true;
        } catch (error) {
            console.error("Unexpected error during magic link login:", error);
            return false;
        }
    },

    // Logout function
    async logout() {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error("Error during logout:", error.message);
                return false;
            }

            console.log("Successfully logged out");
            return true;
        } catch (error) {
            console.error("Unexpected error during logout:", error);
            return false;
        }
    },
};
