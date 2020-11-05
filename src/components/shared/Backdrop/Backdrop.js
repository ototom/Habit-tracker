import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onClick}></div>;
};

Backdrop.propTypes = {
    onClick: PropTypes.func,
};

export default Backdrop;
