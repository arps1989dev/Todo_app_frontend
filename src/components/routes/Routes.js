import React from 'react';
import {Switch} from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
// import { isLoggedIn } from '../helper';

const BeforeLoginLayout = asyncComponent(() => import ('../layout/BeforeLoginLayout'));
// const Login = asyncComponent(() => import ('../users/Login'));
const Todo = asyncComponent(() => import('../Todo'));
const routes = () => (
  <Switch>
    <BeforeLoginLayout exact path="/" component={Todo}/> 
    <BeforeLoginLayout exact path="/todos" component={Todo} />
  </Switch>
);
export default routes;