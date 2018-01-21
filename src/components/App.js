import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginAction } from '../actions/auth';

class App extends Component {
  isAuthenticated = () => {
    return false;
  };

  userHasScopes = scopes => {
    return true;
  };

  render() {
    return (
      <div>
        {!this.isAuthenticated() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={this.props.login}
          >
            Log In
          </Button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(loginAction)
  };
};
// export default App;
export default connect(null, mapDispatchToProps)(App);
