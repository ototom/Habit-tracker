import React, { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Notification from './Notification';

const NotificationManager = ({ setNotify, deleteNotify }) => {
    const [notifications, setNotifications] = useState([]);

    const createNotification = ({ color, autoClose, children }) => {
        const newNotification = {
            children,
            color,
            autoClose,
            id: v4(),
        };

        setNotifications((prevNotifications) => [
            ...prevNotifications,
            newNotification,
        ]);

        return newNotification;
    };

    useEffect(() => {
        setNotify(({ color, autoClose, children }) =>
            createNotification({ color, autoClose, children })
        );
    }, [setNotify]);

    const deleteNotification = useCallback(
        (id) => {
            const filteredNotifications = notifications.filter(
                (notification) => notification.id !== id
            );

            setNotifications(filteredNotifications);
        },
        [notifications]
    );

    useEffect(() => {
        deleteNotify((id) => deleteNotification(id));
    }, [deleteNotify, deleteNotification]);

    return notifications.map(({ id, ...props }) => (
        <Notification
            key={id}
            closeHandler={deleteNotification.bind(this, id)}
            {...props}
        />
    ));
};

export default NotificationManager;
