import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header';

const BeforeLoginLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        <div>
          <Header />
          <Component {...matchProps} />
          
        </div>}
    />
  );
};
export default BeforeLoginLayout;
