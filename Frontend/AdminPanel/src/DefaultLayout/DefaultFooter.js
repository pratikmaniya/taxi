import React, { Component } from 'react';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span>&copy; 2021 <span style={{ color: '#ff0000' }}>Ridesafett</span>.</span>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;