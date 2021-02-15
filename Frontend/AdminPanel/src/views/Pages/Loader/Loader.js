import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;

class LoaderComponent extends Component {
  state = {
    loading: true
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={75}
          color={'red'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default LoaderComponent;