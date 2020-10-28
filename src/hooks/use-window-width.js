import { useState, useEffect, useCallback } from 'react';

export const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const resizeHandler = useCallback(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [resizeHandler]);

    return { width };
};
