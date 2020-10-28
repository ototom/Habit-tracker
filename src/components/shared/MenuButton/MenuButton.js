import React, { useContext } from 'react';
import { sidebarContext } from '../../../context/sidebar-context';
import './MenuButton.scss';

const MenuButton = () => {
    const sidebar = useContext(sidebarContext);

    return (
        <button className='menu-btn' onClick={sidebar.openSidebarHandler}>
            <i className='fas fa-bars'></i>
        </button>
    );
};

export default MenuButton;
