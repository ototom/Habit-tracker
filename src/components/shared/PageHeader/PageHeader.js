import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from '../MenuButton/MenuButton';
import './PageHeader.scss';

const PageHeader = (props) => {
    return (
        <header className='header'>
            <MenuButton />
            <h1>{props.children}</h1>
            {props.rightSideContent}
        </header>
    );
};

PageHeader.propTypes = {
    children: PropTypes.node,
    rightSideContent: PropTypes.node,
};

export default PageHeader;
