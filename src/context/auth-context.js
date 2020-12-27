import { createContext } from 'react';

export const authContext = createContext({
    isLoggedIn: false,
    user: '',
    token: '',
    login: () => {},
    logout: () => {},
});
