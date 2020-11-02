import React, { useContext } from 'react';
import { sidebarContext } from '../../../context/sidebar-context';
import './MenuButton.scss';

const MenuButton = () => {
    const sidebar = useContext(sidebarContext);

    return (
        <button className='menu-btn' onClick={sidebar.openSidebarHandler}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default MenuButton;
