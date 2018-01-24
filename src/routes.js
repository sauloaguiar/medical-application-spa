// src/routes.js

import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './components/App';
import Home from './components/home';
import Admin from './components/Admin';
import Callback from './components/Callback';
import Auth from './auth/auth';
import history from './history';
import Profile from './components/Profile';
import Ping from './components/Ping';
import Patients from './containers/Patients';
import Schedule from './containers/Schedule';
import { connect } from 'react-redux';
import { verifyLogin } from './actions/auth';
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    // auth.handleAuthentication();
  }
};

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={props => <App auth={auth} {...props} />} />
          <Route
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            exact
            path="/patients/:id"
            render={props =>
              !auth.isAuthenticated() ? (
                <Redirect to="/home" />
              ) : (
                <Schedule auth={auth} {...props} />
              )}
          />
          <Route
            exact
            path="/patients"
            render={props =>
              !auth.isAuthenticated() ? (
                <Redirect to="/home" />
              ) : (
                <Patients auth={auth} {...props} />
              )}
          />

          <Route
            path="/profile"
            render={props =>
              !auth.isAuthenticated() ? (
                <Redirect to="/home" />
              ) : (
                <Profile auth={auth} {...props} />
              )}
          />
          <Route
            path="/ping"
            render={props =>
              !auth.isAuthenticated() ? (
                <Redirect to="/home" />
              ) : (
                <Ping auth={auth} {...props} />
              )}
          />
          <Route
            path="/callback"
            render={props => {
              this.props.verifyLogin(props);
              // handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <Route
            path="/admin"
            render={props =>
              !auth.isAuthenticated() ||
              !auth.userHasScopes(['write:messages']) ? (
                <Redirect to="/home" />
              ) : (
                <Admin auth={auth} {...props} />
              )}
          />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyLogin: props => dispatch(verifyLogin(props))
  };
};

export default connect(null, mapDispatchToProps)(Routes);
