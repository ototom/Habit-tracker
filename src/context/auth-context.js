import { createContext } from 'react';

export const authContext = createContext({
    isLoggedIn: false,
    username: '',
    userId: null,
    login: () => {},
    logout: () => {},
});
