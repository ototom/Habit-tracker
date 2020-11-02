import React from 'react';
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

export default PageHeader;
