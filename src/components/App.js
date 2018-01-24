import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginAction } from '../actions/auth';

class App extends Component {
  goTo = route => {
    this.props.history.replace(`/${route}`);
  };
  isAuthenticated = () => {
    return false;
  };

  userHasScopes = scopes => {
    return true;
  };

  render() {
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
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {this.isAuthenticated() &&
              this.userHasScopes(['write:messages']) && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.goTo.bind(this, 'admin')}
                >
                  Admin
                </Button>
              )}
            {!this.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.props.login}
              >
                Log In
              </Button>
            )}
            {this.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'profile')}
              >
                Profile
              </Button>
            )}
            {this.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'patients')}
              >
                Patients
              </Button>
            )}
            {this.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'ping')}
              >
                Ping
              </Button>
            )}
            {this.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind(this)}
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

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(loginAction())
  };
};

export default connect(null, mapDispatchToProps)(App);
