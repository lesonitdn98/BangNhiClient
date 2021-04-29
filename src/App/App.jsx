import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { NotePage } from '../NotePage';
import { MyNotePage } from '../MyNotePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
    render() {
        return (
            <Router>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/notes" component={NotePage} />
                <PrivateRoute exact path="/mynotes" component={MyNotePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Router>
        );
    }
}

export { App };