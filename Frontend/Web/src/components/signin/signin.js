import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import MicrosoftLogin from "react-microsoft-login";

import { login } from '../../store/actions';
import { displayLog } from "../../utils/functions";

class Signin extends Component {
  facebookSuccess = (response) => {
    console.log(response.first_name, response.last_name, response.email);
    const reqData = {
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email
    }
    this.signin(reqData)
  }
  facebookFailed = (response) => {
    console.log(response);
    displayLog(0, "Something went wrong!")
  }
  googleSuccess = (response) => {
    console.log(response.profileObj.givenName, response.profileObj.familyName, response.profileObj.email);
    const reqData = {
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      email: response.profileObj.email
    }
    this.signin(reqData)
  }
  googleFailed = (response) => {
    console.log(response);
    displayLog(0, "Something went wrong!")
  }
  microdoftCallback = (response) => {
    console.log(response);
  }
  signin = async (data) => {
    await this.props.login(data)
    if (this.props.loginRes && this.props.loginRes.code === 1) {
      this.props.history.push({ pathname: process.env.PUBLIC_URL + '/' })
      displayLog(1, this.props.loginRes.message)
    } else {
      displayLog(0, this.props.loginRes.message)
    }
  }
  render() {
    return (
      <div>
        <div className="signIn">
          <div className="signInContent">
            <h2 className="login-text">Login</h2>
            <div className="login-btn-container">
              <FacebookLogin
                appId="219859449859240"
                cssClass='btn facebook-login-btn'
                autoLoad={false}
                fields="first_name,last_name,email"
                callback={this.facebookSuccess}
                onFailure={this.facebookFailed} />
            </div>
            <div className="login-btn-container">
              <GoogleLogin
                clientId="643561685580-ldjpadlh1gdr0hqrv53evsnrv5ikbs3v.apps.googleusercontent.com"
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
    loginRes: state.reducer.loginRes,
    loading: state.reducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (reqData) => dispatch(login(reqData)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
