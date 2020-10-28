import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Switch, Route } from 'react-router-dom';
import Habits from './pages/Habits';
import { sidebarContext } from './context/sidebar-context';

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
            <sidebarContext.Provider
                value={{
                    isSidebarOpen,
                    openSidebarHandler,
                    closeSidebarHandler,
                }}
            >
                <main className='container'>
                    <Switch>
                        <Route exact path='/'>
                            <Habits />
                        </Route>
                    </Switch>
                </main>
            </sidebarContext.Provider>
        </>
    );
}

export default App;
