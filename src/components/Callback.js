// src/components/Callback.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyLogin } from '../actions/auth';

class Callback extends Component {
  componentDidMount() {
    if (!this.props.isLogged) {
      this.props.verifyLogin();
    }
  }

  render() {
    if (this.props.isLogged) {
      return <Redirect to="/patients" />;
    }
    return <span>Loading...</span>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
