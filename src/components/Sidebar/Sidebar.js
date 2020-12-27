import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import Backdrop from '../shared/Backdrop/Backdrop';
import './Sidebar.scss';
import { authContext } from '../../context/auth-context';
import { dataContext } from '../../context/data-context';

const Sidebar = ({ isSidebarOpen, closeSidebarHandler, logoutHandler }) => {
    const history = useHistory();
    const { habits } = useContext(dataContext);
    const { user } = useContext(authContext);

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
                    Hello, {user}!
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
                            <NavLink to='/profile'>
                                <i className='fas fa-user'></i>Your profile
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {habits.length > 0 && (
                    <nav className='sidebar__section'>
                        <h3>Habits</h3>
                        <ul>
                            {habits.map((habit) => (
                                <li key={habit._id}>
                                    <NavLink to={`/habit/${habit._id}`}>
                                        <i className='fas fa-dot-circle'></i>
                                        {habit.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
                <button className='sidebar__logout-btn' onClick={logoutHandler}>
                    <i className='fas fa-sign-out-alt'></i>Logout
                </button>
            </aside>
            {isSidebarOpen && (
                <Backdrop onlyMobile={true} onClick={closeSidebarHandler} />
            )}
        </>
    );
};

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool,
    closeSidebarHandler: PropTypes.func,
    logoutHandler: PropTypes.func,
};

export default Sidebar;
