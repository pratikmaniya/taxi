import React, { Component } from 'react';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span>&copy; 2020 <span style={{ color: '#ff0000' }}>LOGGY</span>.</span>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;