import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState();
    const [token, setToken] = useState(null);
    const [tokenExpDate, setTokenExpDate] = useState(null);

    const loginHandler = useCallback((data) => {
        const { token, userName, expDate } = data;

        const tokenExpDate =
            expDate || new Date(new Date().getTime() + 1000 * 60 * 60);

        localStorage.setItem(
            'user',
            JSON.stringify({
                token,
                userName,
                expDate: tokenExpDate.toISOString(),
            })
        );

        setToken(token);
        setUserName(userName);
        setTokenExpDate(tokenExpDate);
        setIsLoggedIn(true);
    }, []);

    const logoutHandler = useCallback(() => {
        localStorage.removeItem('user');
        setUserName('');
        setToken(null);
        setTokenExpDate(null);
        setIsLoggedIn(false);
    }, []);

    useEffect(() => {
        if (token && tokenExpDate) {
            const remainingTime = tokenExpDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logoutHandler, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logoutHandler, tokenExpDate]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));

        if (
            userData &&
            userData.token &&
            new Date(userData.expDate) > new Date()
        ) {
            const { token, expDate, userName } = userData;
            loginHandler({ token, expDate: new Date(expDate), userName });
        }
    }, [loginHandler]);

    return { token, userName, isLoggedIn, loginHandler, logoutHandler };
};
