import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Backdrop from '../shared/Backdrop/Backdrop';
import './Sidebar.scss';

const Sidebar = ({ isSidebarOpen, closeSidebarHandler }) => {
    const history = useHistory();

    useEffect(() => {
        history.listen(closeSidebarHandler);
    }, [history, closeSidebarHandler]);

    return (
        <>
            <aside
                className={`sidebar ${isSidebarOpen ? 'sidebar--is-open' : ''}`}
            >
                <section className='sidebar__user-profile'>
                    <img
                        className='sidebar__avatar'
                        src='https://i.pravatar.cc/50?img=22'
                        alt=''
                    />
                    Hello, Tom!
                </section>

                <nav className='sidebar__section'>
                    <h3>Menu</h3>
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <i className='fas fa-home'></i>Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/edit'>
                                <i className='fas fa-user'></i>Your profile
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className='sidebar__section'>
                    <h3>Habits</h3>
                    <ul>
                        <li>
                            <NavLink to='/habit/1'>
                                <i className='fas fa-dot-circle'></i>Habit 1
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/habit/2'>
                                <i className='fas fa-dot-circle'></i>Habit 2
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <button className='sidebar__logout-btn'>
                    <i className='fas fa-sign-out-alt'></i>Logout
                </button>
            </aside>
            {isSidebarOpen && <Backdrop onClick={closeSidebarHandler} />}
        </>
    );
};

export default Sidebar;
