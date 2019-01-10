import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
const LoginRoute = ({ component: Component, ...rest }) => ( 
  <Route {...rest} render={ props => (
    localStorage.getItem('starwar_user') ? (
      
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
        }}
      />
    ) : (
        <Component {...props} />
    )
  )} 
  />
);
export default LoginRoute;