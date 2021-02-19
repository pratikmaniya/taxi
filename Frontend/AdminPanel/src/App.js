import React, { Component } from 'react';
import { Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import LoaderComponent from './utils/Loader';
import store from './utils/store';
import * as actionTypes from './store/actionTypes'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const DefaultLayout = React.lazy(() => import('./DefaultLayout'));
const Login = React.lazy(() => import('./views/Login/Login'));
const ForgotPass = React.lazy(() => import('./views/ForgotPassword/ForgotPassword'))

class App extends Component {
  render() {
    if (this.props.redirect_to_login) {
      store.dispatch({
        type: actionTypes.SET_REDRECT_TO_LOGIN_FALSE
      })
      localStorage.removeItem("MOTO_AUTH_TOKEN")
      this.props.history.push(process.env.PUBLIC_URL + '/')
    }
    return (
      <BrowserRouter>
        {this.props.loading === true ? <LoaderComponent /> : null}
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/login"} name="Login Page" render={props => <Login {...props} />} />
            <Route path={process.env.PUBLIC_URL + "/resetpassword/:token"} exact component={ForgotPass} />
            <Route path={process.env.PUBLIC_URL + "/"} name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.reducer.loading,
    redirect_to_login: state.reducer.redirect_to_login
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
