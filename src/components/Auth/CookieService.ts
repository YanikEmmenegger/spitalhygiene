import Cookies from 'js-cookie';

const COOKIE_NAME = 'userAuthenticated';

export const CookieService = {
    setCookie(token: string) {
        Cookies.set(COOKIE_NAME, token, {
            secure: true,
            //httpOnly: true,
            sameSite: 'Strict',
            path: '/',
            expires: 30 // 30 days
        });
    },

    getCookie() {
        return Cookies.get(COOKIE_NAME) || false;
    },

    destroyCookie() {
        Cookies.remove(COOKIE_NAME, {path: '/'});
        Cookies.remove("disclaimerAccepted", {path: '/'});
    }

};
