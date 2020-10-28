import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/use-window-width';
import Backdrop from '../shared/Backdrop/Backdrop';
import Datepicker from '../shared/Datepicker/Datepicker';
import './Sidebar.scss';

const Sidebar = ({ isSidebarOpen, closeSidebarHandler }) => {
    const { width } = useWindowWidth();
    const history = useHistory();

    useEffect(() => {
        history.listen(closeSidebarHandler);
    }, [history, closeSidebarHandler]);

    return (
        <>
            <aside
                className={`sidebar ${isSidebarOpen ? 'sidebar--is-open' : ''}`}
            >
                <section className='sidebar__welcome-msg'>
                    <img
                        className='sidebar__avatar circle-img'
                        src='https://via.placeholder.com/40'
                        alt=''
                    />
                    Hello, Tom!
                </section>
                {width < 768 && <Datepicker />}
                <nav className='sidebar__section'>
                    <h3>Account</h3>
                    <ul>
                        <li>
                            <NavLink to='/edit'>
                                <i className='fas fa-user'></i>Edit profile
                            </NavLink>
                        </li>
                        <li>
                            <button>
                                <i className='fas fa-sign-out-alt'></i>Logout
                            </button>
                        </li>
                    </ul>
                </nav>
                <nav className='sidebar__section'>
                    <h3>Main menu</h3>
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <i className='fas fa-home'></i>Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/sum'>
                                <i className='fas fa-chart-bar'></i>Summary
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className='sidebar__section'>
                    <h3>Habits</h3>
                    <ul>
                        <li>
                            <NavLink to='/hab1'>
                                <i className='fas fa-dot-circle'></i>Habit 1
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/hab2'>
                                <i className='fas fa-dot-circle'></i>Habit 2
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/hab3'>
                                <i className='fas fa-dot-circle'></i>Habit 3
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            {isSidebarOpen && <Backdrop onClick={closeSidebarHandler} />}
        </>
    );
};

export default Sidebar;
