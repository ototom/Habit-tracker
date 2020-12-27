import { useCallback } from 'react';
import { danger } from '../components/shared/Notification';
import { useLoading } from './use-loading';

export const useRequest = (showLoadingNotification = true) => {
    const { isLoading, setIsLoading } = useLoading();

    const sendRequest = useCallback(
        async (
            endpoint,
            {
                body,
                token,
                headers = { 'Content-Type': 'application/json' },
                method = 'GET',
                ...customConfig
            } = {}
        ) => {
            const config = {
                method,
                ...customConfig,
            };

            if (body) {
                config.body = JSON.stringify(body);
            }

            if (token) {
                config.headers = { Authorization: `BEARER ${token}` };
            }

            if (headers) {
                config.headers = { ...config.headers, ...headers };
            }

            showLoadingNotification && setIsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API}/${endpoint}`,
                    config
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setIsLoading(false);
                return data;
            } catch (error) {
                setIsLoading(false);
                danger(error.message);
                throw error;
            }
        },
        [setIsLoading, showLoadingNotification]
    );

    return { sendRequest, isLoading };
};
