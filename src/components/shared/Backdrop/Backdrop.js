import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const Backdrop = (props) => {
    return (
        <div
            className={`backdrop ${
                props.onlyMobile ? 'backdrop--only-mobile' : ''
            }`}
            onClick={props.onClick}
        ></div>
    );
};

Backdrop.propTypes = {
    onlyMobile: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Backdrop;
