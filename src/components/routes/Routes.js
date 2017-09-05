import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
import { isLoggedIn } from '../Helper';

const BeforeLoginLayout = asyncComponent(() => import ('../layout/BeforeLoginLayout'));
const AfterLoginLayout = asyncComponent(() => import ('../layout/user/AfterLoginLayout'));
const LoginLayout = asyncComponent(() => import ('../layout/user/LoginLayout'));
const Login = asyncComponent(() => import ('../users/Login'));
const Todo = asyncComponent(() => import ('../users/todo/Todo.jsx'));
const Home = asyncComponent(() => import ('../Home'));
const routes = () => (
  <Switch>
    <BeforeLoginLayout exact path="/" component={Home}/>
    <LoginLayout exact path="/user" component={Login}/>
    <AfterLoginLayout>
      <PrivateRoute exact path="/todos" component={Todo}/>
    </AfterLoginLayout>

  </Switch>
);
export default routes;

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