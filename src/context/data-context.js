import { createContext } from 'react';

export const dataContext = createContext({
    habits: [],
    isLoading: false,
});
