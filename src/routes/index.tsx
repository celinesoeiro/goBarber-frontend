import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute path="/" exact component={SignIn}/>
    <PrivateRoute path="/signup" component={SignUp}/>

    <PrivateRoute path='/dashboard' component={Dashboard} isPrivate/>
  </Switch>
);

export default Routes;
