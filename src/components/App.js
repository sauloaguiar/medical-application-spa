import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login, logout } from '../actions/auth';
import { Link } from 'react-router-dom';
import { startupAction } from '../actions/startup';

class App extends Component {
  componentDidMount() {
    this.props.startupAction();
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a>Auth0 - React</a>
            </Navbar.Brand>
            <Link to={`/home`}>
              <Button bsStyle="primary" className="btn-margin">
                Home
              </Button>
            </Link>

            {this.props.isAuthenticated && (
              // this.userHasScopes(['write:messages']) && (
              <Link to={`/admin`}>
                <Button bsStyle="primary" className="btn-margin">
                  Admin
                </Button>
              </Link>
            )}
            {/* )} */}
            {!this.props.isAuthenticated && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.props.loginAction}
              >
                Log In
              </Button>
            )}
            {this.props.isAuthenticated && (
              <Link to={`/profile`}>
                <Button bsStyle="primary" className="btn-margin">
                  Profile
                </Button>
              </Link>
            )}
            {this.props.isAuthenticated && (
              <Link to={`/patients`}>
                <Button bsStyle="primary" className="btn-margin">
                  Patients
                </Button>
              </Link>
            )}
            {this.props.isAuthenticated && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.props.logoutAction}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.accessToken && Date.now() < state.auth.expiresAt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(login()),
    logoutAction: () => dispatch(logout()),
    startupAction: () => dispatch(startupAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
