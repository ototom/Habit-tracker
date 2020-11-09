import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { info, closeNotification } from '../components/shared/Notification';

export const useLoading = () => {
    const id = useRef();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            id.current = info(
                <>
                    <div className='spinner'>
                        <i className='fas fa-spinner'></i>
                    </div>
                    <span className='loading'>Loading... Please wait.</span>
                </>,
                false
            );
        }

        if (!isLoading && id.current) {
            closeNotification(id.current.id);
        }
    }, [isLoading]);

    return { isLoading, setIsLoading };
};
