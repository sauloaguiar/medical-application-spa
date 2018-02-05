// src/routes.js

import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './components/App';
import Home from './components/home';
import Admin from './components/Admin';
import Callback from './components/Callback';
import history from './history';
import Profile from './components/Profile';
import Ping from './components/Ping';
import Patients from './containers/Patients';
import Schedule from './containers/Schedule';
import { connect } from 'react-redux';
import { verifyLogin } from './actions/auth';
import PrivateRoute from './components/PrivateRoute';

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={props => <App {...props} />} />
          <Route path="/home" render={props => <Home {...props} />} />
          <Route
            path="/callback"
            render={props => {
              this.props.verifyLogin(props);
              return <Callback isLogged={this.props.isLogged} />;
            }}
          />
          <PrivateRoute exact path="/patients/:id" component={Schedule} />
          <PrivateRoute path="/patients" component={Patients} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/ping" component={Ping} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.auth.accessToken && Date.now() < state.auth.expiresAt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyLogin: props => dispatch(verifyLogin(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
