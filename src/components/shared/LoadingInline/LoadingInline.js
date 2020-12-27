import React from 'react';
import PropTypes from 'prop-types';
import './LoadingInline.scss';

const LoadingInline = ({ isLoading, message }) => {
    if (!isLoading) return null;
    return (
        <div className='loading-inline'>
            <div className='loading-spinner'></div>
            {message}
        </div>
    );
};

LoadingInline.propTypes = {
    isLoading: PropTypes.bool,
    message: PropTypes.string,
};

export default LoadingInline;
