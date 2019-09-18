import React from 'react';

import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import User from './page/User';
import Trash from './page/Trash'

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={User} />
            <Route path="trash" component={Trash} />
        </Switch>
    </Router>

);

export default Routes;