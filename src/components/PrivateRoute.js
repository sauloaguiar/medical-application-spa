import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: props.location }
            }}
          />
        )}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.accessToken && Date.now() < state.auth.expiresAt
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
