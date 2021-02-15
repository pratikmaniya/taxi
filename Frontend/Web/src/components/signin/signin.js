import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import MicrosoftLogin from "react-microsoft-login";

import { login } from '../../store/actions/auth';

class Signin extends Component {
  facebookSuccess = (response) => {
    console.log(response);
  }
  facebookFailed = (response) => {
    console.log(response);
  }
  googleSuccess = (response) => {
    console.log(response);
  }
  googleFailed = (response) => {
    console.log(response);
  }
  microdoftCallback = (response) => {
    console.log(response);
  }
  render() {
    return (
      <div>
        <div className="signIn">
          <div className="signInContent">
            <h2 className="login-text">Login</h2>
            <div className="login-btn-container">
              <FacebookLogin
                appId="1088597931155576"
                cssClass='btn facebook-login-btn'
                autoLoad={false}
                fields="name,email,picture"
                callback={this.facebookSuccess}
                onFailure={this.facebookFailed} />
            </div>
            <div className="login-btn-container">
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                className='google-login-btn'
                buttonText="Login with Google"
                onSuccess={this.googleSuccess}
                onFailure={this.googleFailed}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="login-btn-container">
              <MicrosoftLogin clientId={'YOUR_CLIENT_ID'} authCallback={this.microdoftCallback} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginRes: state.auth.loginData,
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (reqData) => dispatch(login(reqData)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
