import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginAction } from '../actions/auth';

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={() => history.push('home')}
            >
              Home
            </Button>
            {this.props.isAuthenticated && (
              // this.userHasScopes(['write:messages']) && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={() => history.push('admin')}
              >
                Admin
              </Button>
            )}
            {/* )} */}
            {!this.props.isAuthenticated && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.props.login}
              >
                Log In
              </Button>
            )}
            {this.props.isAuthenticated && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={() => history.push('profile')}
              >
                Profile
              </Button>
            )}
            {this.props.isAuthenticated && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={() => history.push('patients')}
              >
                Patients
              </Button>
            )}
            {this.props.isAuthenticated && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={() => history.push('ping')}
              >
                Ping
              </Button>
            )}
            {this.props.isAuthenticated && (
              <Button bsStyle="primary" className="btn-margin">
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
    login: () => dispatch(loginAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
