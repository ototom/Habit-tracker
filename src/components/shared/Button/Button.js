import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.scss';

/*
    Available classNames - all with suffix "btn--"
    * colors: primary, info, danger, success, light
    * sizes: big, small
    * extra: full-width
*/

const Button = (props) => {
    if (props.to) {
        return (
            <Link to={props.to} className={`btn ${props.className}`}>
                {props.children}
            </Link>
        );
    }
    return (
        <button
            onClick={props.onClick}
            className={`btn ${props.className}`}
            type={props.type || 'button'}
            disabled={props.disabled || false}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    to: PropTypes.string,
};

export default Button;
