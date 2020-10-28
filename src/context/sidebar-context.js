import { createContext } from 'react';

export const sidebarContext = createContext({
    isSidebarOpen: false,
    openSidebarHandler: () => {},
    closeSidebarHandler: () => {},
});
