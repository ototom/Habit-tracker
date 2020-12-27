import React from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = ({ children, color = BadgeColor.info }) => {
    return <div className={`badge badge--${color}`}>{children}</div>;
};

export const BadgeColor = {
    success: 'success',
    danger: 'danger',
    info: 'info',
};

Badge.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(Object.keys(BadgeColor)),
};

export default Badge;
