export const sendRequest = async (
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

    try {
        const response = await fetch(
            `${process.env.REACT_APP_API}/${endpoint}`,
            config
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        danger(error.message);
        throw error;
    }
};
