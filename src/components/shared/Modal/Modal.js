import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createContainer from '../../../utils/createContainer';
import './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

const ModalContent = ({ closeModal, children }) => {
    const modalRef = useRef();
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
            const timeoutId = setTimeout(closeModal, 200);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isClosing, closeModal]);

    useEffect(() => {
        const onModalClose = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsClosing(true);
            }
        };

        document.addEventListener('click', onModalClose);

        return () => document.removeEventListener('click', onModalClose);
    }, []);

    return (
        <>
            <Backdrop onClick={setIsClosing.bind(this, true)} />
            <div
                ref={modalRef}
                className={`modal ${
                    isClosing ? 'modal--fade-out' : 'modal--fade-in'
                }`}
            >
                {children}
            </div>
        </>
    );
};

const Modal = (props) => {
    if (!props.isActive) return null;

    return ReactDOM.createPortal(
        <ModalContent {...props} />,
        createContainer('modal')
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func,
};

export default Modal;
