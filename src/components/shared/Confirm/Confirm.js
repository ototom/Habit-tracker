import React, { useState, useEffect, useCallback } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import './Confirm.scss';

const Confirm = ({ onCancel, onConfirm, children, isActive }) => {
    const [isClosing, setIsClosing] = useState(false);

    const cancelHandler = useCallback(() => {
        setIsClosing(false);

        onCancel();
    }, [onCancel]);

    useEffect(() => {
        if (isClosing) {
            const timeoutId = setTimeout(cancelHandler, 150);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isClosing, cancelHandler]);

    if (!isActive) return null;
    return (
        <div
            className={`confirm ${
                isClosing ? 'confirm--fade-out' : 'confirm--fade-in'
            }`}
        >
            <div className='confirm__content'>{children}</div>
            <div className='confirm__controls'>
                <Button
                    onClick={setIsClosing.bind(this, true)}
                    className='btn--light'
                >
                    Cancel
                </Button>
                <Button onClick={onConfirm} className='btn--primary'>
                    OK
                </Button>
            </div>
        </div>
    );
};

Confirm.propTypes = {
    children: PropTypes.node,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    isActive: PropTypes.bool,
};

export default Confirm;
