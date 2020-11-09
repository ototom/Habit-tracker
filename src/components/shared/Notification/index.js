import React from 'react';
import ReactDOM from 'react-dom';
import './Notification.scss';

import NotificationManager from './NotificationManager';
import Notification, { Color } from './Notification';
import createContainer from '../../../utils/createContainer';

let createNotify;
let closeNotify;

ReactDOM.render(
    <NotificationManager
        setNotify={(createNotificationFn) => {
            createNotify = createNotificationFn;
        }}
        deleteNotify={(deleteNotificationFn) => {
            closeNotify = deleteNotificationFn;
        }}
    />,
    createContainer('notifications', 'notifications-container')
);

export { Notification, Color };

export function info(children, autoClose) {
    return createNotify({
        color: Color.info,
        children,
        autoClose,
    });
}
export function success(children, autoClose) {
    return createNotify({
        color: Color.success,
        children,
        autoClose,
    });
}
export function danger(children, autoClose) {
    return createNotify({
        color: Color.danger,
        children,
        autoClose,
    });
}

export function closeNotification(id) {
    return closeNotify(id);
}
