import React from 'react';
import { Route, Redirect , Switch } from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
import { isLoggedIn } from '../helper';

const BeforeLoginLayout = asyncComponent(() => import('../layout/BeforeLoginLayout'));
const Login = asyncComponent(() => import('../users/Login'))
const routes = () => (
    <Switch>
      <BeforeLoginLayout exact path="/user" component={Login} />

      <PrivateRoute exact path="/user" component={Login} />
    </Switch>
);
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/user',
            state: { from: props.location }
          }}
        />
      )}
  />
);
export default routes;