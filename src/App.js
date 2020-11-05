import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Habits from './pages/Habits';
import { sidebarContext } from './context/sidebar-context';
import HabitDetails from './pages/HabitDetails';
import SignIn from './pages/SignIn';
import { authContext } from './context/auth-context';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const loginHandler = () => setIsLoggedIn(true);
    const logoutHandler = () => setIsLoggedIn(false);

    const closeSidebarHandler = useCallback(() => setSidebarOpen(false), []);
    const openSidebarHandler = () => setSidebarOpen(true);

    let routes = (
        <Switch>
            <Route path='/sign-in'>
                <SignIn />
            </Route>
            <Route path='/sign-up'>
                <SignUp />
            </Route>
            <Redirect from='/' to='/sign-in' />
            <Route>404</Route>
        </Switch>
    );

    if (isLoggedIn) {
        routes = (
            <main className='container'>
                <Switch>
                    <Route path='/habit/:id'>
                        <HabitDetails />
                    </Route>
                    <Route path='/profile'>
                        <UserProfile />
                    </Route>
                    <Route exact path='/'>
                        <Habits />
                    </Route>
                    <Redirect from='/sign-in' to='/' />
                    <Redirect from='/sign-up' to='/' />
                    <Route>404</Route>
                </Switch>
            </main>
        );
    }

    return (
        <>
            {isLoggedIn && (
                <Sidebar
                    closeSidebarHandler={closeSidebarHandler}
                    isSidebarOpen={isSidebarOpen}
                    logoutHandler={logoutHandler}
                />
            )}
            <authContext.Provider
                value={{
                    isLoggedIn,
                    login: loginHandler,
                    logout: logoutHandler,
                }}
            >
                <sidebarContext.Provider
                    value={{
                        isSidebarOpen,
                        openSidebarHandler,
                        closeSidebarHandler,
                    }}
                >
                    {routes}
                </sidebarContext.Provider>
            </authContext.Provider>
        </>
    );
}

export default App;
