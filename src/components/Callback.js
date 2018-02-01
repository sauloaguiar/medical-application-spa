// src/components/Callback.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Callback extends Component {
  render() {
    if (this.props.isLogged) {
      return <Redirect to="/patients" />;
    }
    return <span>Loading...</span>;
  }
}

export default Callback;
