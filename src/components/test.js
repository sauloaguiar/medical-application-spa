import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {
  render() {
    return <div onClick={this.props.test}>Some Button</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    test: () => dispatch({ type: 'TEST' })
  };
};

export default connect(null, mapDispatchToProps)(Test);
