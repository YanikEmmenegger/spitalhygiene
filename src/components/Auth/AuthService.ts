import supabase from "../../utils/supabase.ts";

export const AuthService = {
    async checkSession() {
        const {data, error} = await supabase.auth.getSession();
        if (error) {
            console.error("Supabase session error:", error.message);
            return null;
        }
        return data?.session;
    },

    async loginWithMagicLink(email: string) {
        const {error} = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: import.meta.env.DEV ? "http://localhost:5173/chat/" : import.meta.env.VITE_HOST_URL,
            }
        })
        if (error) {
            console.error("Magic link error:", error.message);
            return false;
        }
        return true;
    },

    async logout() {
        await supabase.auth.signOut();

    }
};
