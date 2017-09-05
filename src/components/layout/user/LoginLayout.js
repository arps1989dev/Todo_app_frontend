import React from 'react';
import {Route} from 'react-router-dom';
// import Header from './Header';

const LoginLayout = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={matchProps => <div className="app-wrap">
      {/* <Header handler={this.handler}/> */}
      <Component {...matchProps}/>
    </div>}/>
  );
};
export default LoginLayout;
