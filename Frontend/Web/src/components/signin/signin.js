import React, { Component } from "react";
import routes from '../../Routes';
// import { withRouter, Link } from 'react-router-dom';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import joi from 'joi-browser';
import Header from '../common/header';
import Footer2 from '../common/footer2';
import * as common from '../../utils/functions';
import { login } from '../../store/actions/auth';
import { EMAIL_REGEX, STORAGE_KEYS } from '../../utils/constants';
import { Alert } from 'reactstrap';
import $ from 'jquery';
import * as Types from '../../store/actions/actionTypes';
import store from '../../utils/store';
import alertify from 'alertifyjs';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            formValues: {
                email: '',
                password: '',
            },
            error: '',
            errorField: '',		
		};
    }
    changeValuesHandler = (e) => {

        var formValues = this.state.formValues;
        var name = e.target.name;
        if (name == 'email') {
            formValues[name] = e.target.value;
        }
        else {
            formValues[name] = e.target.value;
        }
        this.setState({ formValues: formValues });
    }
    // enterPressed = (event) => {
    //     var code = event.keyCode || event.which;
    //     if (code === 13) { //13 is the enter keycode
    //       this.loginHandler()
    //     }
    //   }
      loginHandler = async () => {
        this.validateFormData(this.state.formValues);
      }
      validateFormData = (body) => {
        let schema = joi.object().keys({
          email: joi.string().trim().regex(EMAIL_REGEX).email().required(),
          password: joi.string().trim().required(),
        })
        joi.validate(body, schema, (error, value) => {
          if (error) {
            if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
              let errorLog = common.validateSchema(error)
              this.setState({ error: errorLog.error, errorField: errorLog.errorField });
            }
          }
          else {
            this.setState({ error: '', errorField: '' }, () => {
              let reqData = {
                email: this.state.formValues.email,
                password: this.state.formValues.password,
              }
              this.adminLoginReq(reqData);
            });
          }
        })
      }
      adminLoginReq = async (reqData) => {
        store.dispatch({
          type: Types.START_LOADER
        })
        await this.props.login(reqData);
        store.dispatch({
          type: Types.STOP_LOADER
        })
        if (this.props.loginRes && this.props.loginRes.code === 1) {
    
        console.log(this.props.loginRes)
          await localStorage.clear()
          await localStorage.setItem(STORAGE_KEYS.AUTH, true)
        //   await localStorage.setItem('REFRESH_TOKEN', this.props.loginRes.data.refresh_token)
          await localStorage.setItem('DATA', JSON.stringify(this.props.loginRes.data))
          await localStorage.setItem('name', this.props.loginRes.data.first_name)
        //   await localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, common.encrypt(this.props.loginRes.data.auth_token))
          await localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, this.props.loginRes.auth_token)
        //   await localStorage.setItem('AUTH_TOKEN', this.props.loginRes.auth_token)
        //   console.log("token => ",localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN))
        //   await localStorage.setItem('salon_type', this.props.loginRes.data.salon_type)
          this.props.history.push(process.env.PUBLIC_URL + '/')
        }
      }
    
     /*  onClickForgotPassword = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/forgotPassword')
        // this.props.history.push(process.env.PUBLIC_URL + '/resetPassword')
    
      } */
    
	render() {
		return (
			<div>
                <Header />   
				<div className="signIn">            
                    <div className="signInContent">                
                        <form>
                            <h1 className="mainHeading">Sign In</h1>
                            <div className="fieldset">
                                <label>Email</label>
                                <input type="text" name="email" placeholder="Email" onChange={(e) => this.changeValuesHandler(e)} />
                            </div>
                            <div className="fieldset">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Password" onChange={(e) => this.changeValuesHandler(e)} />
                            </div>
                            {
                                this.state.error !== '' ?
                                    <Alert color="danger">
                                    {this.state.error}
                                    </Alert>
                                    : null
                            }
                            <a href="#" className="forgotPwd d-flex justify-content-center">Forgot Password?</a>
                            <div className="btnGroup d-flex justify-content-center">
                                <button type="button" className="smallBtn" onClick={() => {this.loginHandler()}}>Sign In</button>
                                {/* <button type="button" className="smallBtn nobg">Process Server Sign In</button> */}
                            </div>                    
                        </form>
                        <p className="dontacc d-flex justify-content-center">Don’t have an account?<NavLink className="" to={routes.SIGNUP}>Sign Up</NavLink></p>
                    </div>            
                </div>
                <Footer2/>
            </div>
		);
	}
}

// export default Signin;
//Get data stored in reducer state
const mapStateToProps = state => {
    return {
      loginRes: state.auth.loginData,
    //   forgotPasswordRes: state.auth.forgotPasswordRes,
      loading: state.auth.loading
    }
  }
  
  //Send data to redux action
  const mapDispatchToProps = dispatch => {
    return {
      login: (reqData) => dispatch(login(reqData)),
  
      // forgotPassword: (reqData) => dispatch(forgotPassword(reqData))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
