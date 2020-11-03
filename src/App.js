import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Habits from './pages/Habits';
import { sidebarContext } from './context/sidebar-context';
import HabitDetails from './pages/HabitDetails';
import SignIn from './pages/SignIn';
import { authContext } from './context/auth-context';

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn] = useState(false);

    const closeSidebarHandler = useCallback(() => setSidebarOpen(false), []);
    const openSidebarHandler = () => setSidebarOpen(true);

    let routes = (
        <Switch>
            <Route path='/sign-in'>
                <SignIn />
            </Route>
            <Route path='/sign-up'>sign up</Route>
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
                    <Route path='sign-in'>
                        <SignIn />
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
                />
            )}
            <authContext.Provider value={{ isLoggedIn }}>
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
