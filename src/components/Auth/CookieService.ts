import Cookies from 'js-cookie';

const COOKIE_NAME = 'userAuthenticated';

export const CookieService = {
    setCookie(token: string) {
        Cookies.set(COOKIE_NAME, token, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            expires: 30 // 30 days
        });
    },

    destroyCookie() {
        Cookies.remove(COOKIE_NAME, {path: '/'});
        Cookies.remove("disclaimerAccepted", {path: '/'});
    }

};
