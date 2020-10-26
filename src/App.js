import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Switch, Route } from 'react-router-dom';

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebarHandler = useCallback(() => setSidebarOpen(false), []);
    const openSidebarHandler = () => setSidebarOpen(true);

    return (
        <>
            <Sidebar
                closeSidebarHandler={closeSidebarHandler}
                isSidebarOpen={isSidebarOpen}
            />
            <main className='container'>
                <Switch>
                    <Route exact path='/'>
                        <header>
                            {!isSidebarOpen && (
                                <button
                                    className='menu-btn'
                                    onClick={openSidebarHandler}
                                >
                                    <i className='fas fa-bars'></i>
                                </button>
                            )}
                            <h1>Page title</h1>
                        </header>
                        Content
                    </Route>
                </Switch>
            </main>
        </>
    );
}

export default App;
