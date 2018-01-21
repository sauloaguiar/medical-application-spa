// src/components/Callback.js

import React, { Component } from 'react';
import history from '../history';

class Callback extends Component {
  render() {
    if (this.props.loaded) {
      // history.push()
    }
    return <span>Loading...</span>;
  }
}

export default Callback;
