import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.scss';
import { createPortal } from 'react-dom';
import createContainer from '../../../utils/createContainer';

const Notification = ({
    children,
    color = Color.info,
    closeHandler,
    autoClose = false,
}) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
            const timeoutId = setTimeout(closeHandler, 200);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isClosing, closeHandler]);

    useEffect(() => {
        if (autoClose) {
            const timeoutId = setTimeout(() => setIsClosing(true), 4000);

            return () => clearTimeout(timeoutId);
        }
    }, [autoClose]);

    return createPortal(
        <div
            className={`notification ${
                isClosing ? 'notification--shrink' : ''
            }`}
        >
            <div
                className={`notification__content notification__content--${color} ${
                    isClosing
                        ? 'notification__content--slide-out'
                        : 'notification__content--slide-in'
                }`}
            >
                {children}
                <button
                    className='notification__close-btn'
                    onClick={() => {
                        setIsClosing(true);
                    }}
                >
                    <i className='fas fa-times'></i>
                </button>
            </div>
        </div>,
        createContainer('notifications', 'notifications-container')
    );
};

export const Color = {
    info: 'info',
    success: 'success',
    danger: 'danger',
};

Notification.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(Object.keys(Color)),
    closeHandler: PropTypes.func,
    autoClose: PropTypes.bool,
};

export default Notification;
