import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Switch>
            <Route exact path='/'>
                Content
            </Route>
        </Switch>
    );
}

export default App;
