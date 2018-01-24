import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';

class Test extends Component {
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
            onClick={this.props.test}
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
    test: () => dispatch({ type: 'TEST' })
  };
};

export default connect(null, mapDispatchToProps)(Test);
