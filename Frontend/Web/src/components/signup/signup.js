import React, { Component } from "react";
import routes from '../../Routes';
// import { withRouter, Link } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Header from '../common/header';
import Footer2 from '../common/footer2';
import * as common from '../../utils/functions';
import { signUp } from '../../store/actions/auth';
import { EMAIL_REGEX, STORAGE_KEYS } from '../../utils/constants';
import { Alert } from 'reactstrap';
import $ from 'jquery';
import * as Types from '../../store/actions/actionTypes';
import store from '../../utils/store';
import alertify from 'alertifyjs';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import { 
    getStateReq, 
    getCityReq, 
} from '../../store/actions/customers'
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                user_type: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
                company_name:'',
                street1:'',
                street2:'',
                state_id:'',
                city_id:'',
                zipcode:'',
                phone_number:'',
                terms:'',
            },
            error: '',
            errorField: '',
            stateList: [],
            cityList: [],
            selectedState: '',
            selectedCity: '',

        };
    }

    componentDidMount = async () => {
        await this.getState()
    }

    getState = async () => {
        let statessss = []
        let reqData = 
        { 
            getAllStateListNames: "TRUE", 
            page_no: 1, 
            limit: 10 
        }
        await this.props.getStateReq(reqData)
        if (this.props.getStateSuccessRes && this.props.getStateSuccessRes.code == 1) {
            this.setState({ stateList: this.props.getStateSuccessRes.data });
            this.state.stateList.map(el => (
                statessss.push({ value: el.name, label: el.name })
            ))  
            this.setState({ stateList: statessss });
            console.log("Options ==>>",statessss)
        }
    }

    getCity = async () => {
        let cityOption = []
        let reqData2 = 
        { 
            state_id : this.state.state_id
        }
        await this.props.getCityReq(reqData2)
        if (this.props.getCitySuccessRes && this.props.getCitySuccessRes.code == 1) {            
            this.setState({ cityList: this.props.getCitySuccessRes.data });
            this.state.cityList.map(el => (
                cityOption.push({ value: el.city, label: el.city })
            ))   
            await this.setState({ cityList: cityOption });            
        }
    }

    changeValuesHandler = (e) => {

        var formValues = this.state.formValues;
        var name = e.target.name;
        if (name == 'email') {

            formValues[name] = e.target.value.replace(/^\s+|\s+$/gm, '');
        } 
        else if (name == 'terms') {
            if(e.target.checked == true) {
                formValues['terms'] = 'true'
            } else {
                formValues['terms'] = ''
            }
            // formValues['terms'] = e.target.checked
        }
        else {
            formValues[name] = common.capitalizeFirstLetter(e.target.value.replace(/^\s+/g, ''));

        }
 
        this.setState({ formValues: formValues });
    }

    handleChangeState = async selectedState => {
        this.setState(
          { selectedState }
          ,() => console.log(`Option selected:`, this.state.selectedState)
        );
        let stateId = selectedState.value
        this.setState({ state_id : stateId })
        this.setState({ formValues: { ...this.state.formValues, state_id: stateId } });
        let cityOption = [];
        let reqData2 = 
        { 
            state_id : stateId,
        }
        await this.props.getCityReq(reqData2)
        if (this.props.getCitySuccessRes && this.props.getCitySuccessRes.code == 1) {            
            this.setState({ cityList: this.props.getCitySuccessRes.data });
            this.state.cityList.map(el => (
                cityOption.push({ value: el.city, label: el.city })
            ))   
            await this.setState({ cityList: cityOption });            
        }

      };

      handleChangeCity = selectedCity => {
        this.setState(
          { selectedCity }
          ,() => console.log(`Option selected:`, this.state.selectedCity)
        );
        let cityId = selectedCity.value
        this.setState({ city_id : cityId })
        this.setState({ formValues: { ...this.state.formValues, city_id: cityId } });
      }
    changeUsertype = e => {
        console.log("--------------------------------------")
        const { name, value } = e.target;
        // this.setState({ formValues: { ...this.state.formValues, user_type: e.target.value } });
    }
    handleChange = e => {
        const { name, value } = e.target;
        console.log('=========>',value)
        this.setState({ formValues: { ...this.state.formValues, user_type: value } });
        /* this.setState({
          [name]: value
        }); */
      };
    onClickSubmit = () => {
        console.log('onClickSubmit',this.state.formValues)
        this.validateFormData(this.state.formValues)
    }
    signUpHandler = async () => {
        console.log(this.state.formValues)        
        let obj = []
        /* if(this.state.formValues.user_type== 2)
        {
            obj = {
                user_type: this.state.formValues.user_type,
                first_name: this.state.formValues.first_name,
                last_name: this.state.formValues.last_name,
                email: this.state.formValues.email,
                password: this.state.formValues.password,
                confirm_password: this.state.formValues.confirm_password,
                company_name: this.state.formValues.company_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.formValues.state_id,
                city: this.state.formValues.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else if (this.state.formValues.user_type== 3)
        {
            obj = {
                user_type: this.state.formValues.user_type,
                first_name: this.state.formValues.first_name,
                last_name: this.state.formValues.last_name,
                email: this.state.formValues.email,
                password: this.state.formValues.password,
                confirm_password: this.state.formValues.confirm_password,
                law_firm_name: this.state.formValues.law_firm_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.formValues.state_id,
                city: this.state.formValues.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else
        { */
            obj = {
                user_type: this.state.formValues.user_type,
                first_name: this.state.formValues.first_name,
                last_name: this.state.formValues.last_name,
                email: this.state.formValues.email,
                password: this.state.formValues.password,
                confirm_password: this.state.formValues.confirm_password,
            }
        // }
        obj['Agree_to_terms_and_Conditions'] = this.state.formValues.terms
        console.log('obj',obj)
        this.validateFormData(obj);
        // this.validateFormData(this.state.formValues);
    }
    validateFormData = (body) => {
        let schema
        // console.log('====Validate====')
        /* if(this.state.formValues.user_type == 2)
        {
             schema = Joi.object().keys({
                user_type: Joi.string().trim().required(),
                first_name: Joi.string().trim().required(),
                last_name: Joi.string().trim().required(),
                email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
                password: Joi.string().trim().min(6).required(),
                confirm_password: Joi.string()
                    .valid(this.state.formValues.password)
                    .required()
                    .label('Confirm Password')
                    .error(
                        errors => 'Password and Confirm Password must be same!'
                    ),
                company_name: Joi.string().trim().required(),
                street1: Joi.string().trim().required(),
                street2: Joi.string().trim().required(),
                state_id: Joi.string().required(),
                city_id: Joi.string().required(),
                zipcode: Joi.string().trim().required(),
                phone_number: Joi.number().required(),
                Agree_to_terms_and_Conditions: Joi.string().required()
            })
        }
        else if(this.state.formValues.user_type == 3)
        {
             schema = Joi.object().keys({
                user_type: Joi.string().trim().required(),
                first_name: Joi.string().trim().required(),
                last_name: Joi.string().trim().required(),
                email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
                password: Joi.string().trim().min(6).required(),
                confirm_password: Joi.string()
                    .valid(this.state.formValues.password)
                    .required()
                    .label('Confirm Password')
                    .error(
                        errors => 'Password and Confirm Password must be same!'
                    ),
                law_firm_name: Joi.string().trim().required(),
                street1: Joi.string().trim().required(),
                street2: Joi.string().trim().required(),
                state_id: Joi.string().required(),
                city_id: Joi.string().required(),
                zipcode: Joi.string().trim().required(),
                phone_number: Joi.number().required(),
                Agree_to_terms_and_Conditions: Joi.string().required()
            })
        } 
        else 
        { */
            schema = Joi.object().keys({
                user_type: Joi.string().trim().required(),
                first_name: Joi.string().trim().required(),
                last_name: Joi.string().trim().required(),
                email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
                password: Joi.string().trim().min(6).required(),
                confirm_password: Joi.string()
                    .valid(this.state.formValues.password)
                    .required()
                    .label('Confirm Password')
                    .error(
                        errors => 'Password and Confirm Password must be same!'
                    ),
                Agree_to_terms_and_Conditions: Joi.string().required()
            })
        // }
        Joi.validate(body, schema, (error, value) => {
            if (error) {
                // console.log = function() { return error};
                if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
                    let errorLog = common.validateSchema(error)
                    this.setState({ error: errorLog.error, errorField: errorLog.errorField });
                }
            }
            else {
                this.setState({ error: '', errorField: '' }, () => {
                    let reqData = []
                    /* if(this.state.formValues.user_type == 2)
                    {
                        reqData = {
                            user_type: this.state.formValues.user_type,
                            first_name: this.state.formValues.first_name,
                            last_name: this.state.formValues.last_name,
                            email: this.state.formValues.email,
                            password: this.state.formValues.password,
                            company_name: this.state.formValues.company_name,
                            street1: this.state.formValues.street1,
                            street2: this.state.formValues.street2,
                            state: this.state.formValues.state_id,
                            city: this.state.formValues.city_id,
                            zipcode: this.state.formValues.zipcode,
                            phone_number: this.state.formValues.phone_number,
                        }
                    }
                    else if(this.state.formValues.user_type == 3)
                    {
                        reqData = {
                            user_type: this.state.formValues.user_type,
                            first_name: this.state.formValues.first_name,
                            last_name: this.state.formValues.last_name,
                            email: this.state.formValues.email,
                            password: this.state.formValues.password,
                            law_firm_name: this.state.formValues.law_firm_name,
                            street1: this.state.formValues.street1,
                            street2: this.state.formValues.street2,
                            state: this.state.formValues.state_id,
                            city: this.state.formValues.city_id,
                            zipcode: this.state.formValues.zipcode,
                            phone_number: this.state.formValues.phone_number,
                        }
                    }
                    else
                    { */
                         reqData = {
                            user_type: this.state.formValues.user_type,
                            first_name: this.state.formValues.first_name,
                            last_name: this.state.formValues.last_name,
                            email: this.state.formValues.email,
                            password: this.state.formValues.password,
                        }
                    // }
                    // console.log(reqData)
                    this.userSignUpReq(reqData);
                });
            }
        })
        // alert("Click event works");
        // let reqData = {
        //     user_type: this.state.formValues.user_type,
        //     first_name: this.state.formValues.first_name,
        //     last_name: this.state.formValues.last_name,
        //     email: this.state.formValues.email,
        //     password: this.state.formValues.password,
        // }
        // this.userSignUpReq(reqData);
    }
    userSignUpReq = async (reqData) => {
        console.log("========== Now calling function from props...");
        store.dispatch({
            type: Types.START_LOADER
        })
        
        await this.props.signUp(reqData);
        store.dispatch({
            type: Types.STOP_LOADER
        })
        // var msg = alertify.success('Default message');
        // msg.delay(1.5).setContent('suc');
        // common.displayLog(1, 'suc');
        // console.log("================",this.props.signUpRes)
        if (this.props.signUpRes && this.props.signUpRes.code === 1) 
        {
            await localStorage.clear()
            await localStorage.setItem('signUpUser', JSON.stringify(this.state))
            await localStorage.setItem(STORAGE_KEYS.AUTH, true)            
            await localStorage.setItem('DATA', JSON.stringify(this.props.signUpRes.data.user))
            await localStorage.setItem('name', this.props.signUpRes.data.user.first_name)
            await localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, this.props.signUpRes.auth_token)
            var msg = alertify.success('Default message');
            msg.delay(1.5).setContent(this.props.signUpRes.message);
            common.displayLog(1, this.props.signUpRes.message);
            if(reqData.user_type==2)
            {
                this.props.history.push({
                    pathname: process.env.PUBLIC_URL + '/profilesetup',
                    state: { user: this.props.signUpRes.data, user_id: this.props.signUpRes.data.id, user_type: this.props.signUpRes.data.user_type}
                })
            } 
            else if(reqData.user_type==3)
            {
                this.props.history.push({
                    pathname: process.env.PUBLIC_URL + '/profilesetup-attorney',
                    state: { user: this.props.signUpRes.data, user_id: this.props.signUpRes.data.id, user_type: this.props.signUpRes.data.user_type}
                })
            }
            else
            {
                setTimeout(() => {
                    this.props.history.push({
                        pathname: process.env.PUBLIC_URL + '/',
                        state: { user: this.props.signUpRes.data}
                    })
                }, 1000)
            }
            
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="signIn signUp">
                    <div className="signInContent">
                        <form>
                            <h1 className="mainHeading">Sign Up</h1>

                            {/* <div className="addBox unitOption">
                                 <div className="option">
                                    <input type="radio" id="1" name='1' value='1' checked={this.state.formValues.user_type == "1"} onChange={this.changeUsertype} />
                                    <label htmlFor="unit1" aria-label="unit1">
                                        <span /> Landlord
                                        <div className="card card--blue card--sm"><div className="card__chip" /></div>
                                    </label>
                                </div>
                                <div className="option">
                                    <input type="radio" id="2" name='2' value='2' checked={this.state.formValues.user_type == "2"} onChange={this.changeUsertype} />
                                    <label htmlFor="unit2" aria-label="unit2">
                                        <span /> Property Manager
                                        <div className="card card--blue card--sm"><div className="card__chip" /></div>
                                    </label>
                                </div>
                                <div className="option">
                                    <input type="radio" id="3" name='3' value='3' checked={this.state.formValues.user_type == "3"} onChange={this.changeUsertype} />
                                    <label htmlFor="unit3" aria-label="unit3">
                                        <span /> Attorney
                                        <div className="card card--blue card--sm"><div className="card__chip" /></div>
                                    </label>
                                </div> 
                            </div> */}

                                <div className="radio-buttons unitOption">
                                    <label htmlFor="option1" aria-label="unit3">
                                        <input
                                        id="option1"
                                        value="1"
                                        name="user_type"
                                        type="radio"
                                        onChange={this.handleChange}
                                        /> <span>Landlord</span>
                                    </label>
                                    <label htmlFor="option2" aria-label="unit3">
                                        <input
                                        id="option2"
                                        value="2"
                                        name="user_type"
                                        type="radio"
                                        onChange={this.handleChange}
                                        /><span>Property Manager </span>
                                    </label>
                                    <label htmlFor="option3" aria-label="unit3">
                                        <input
                                        id="option3"
                                        value="3"
                                        name="user_type"
                                        type="radio"
                                        onChange={this.handleChange}
                                        /><span>Attorney</span>
                                    </label>
                                </div>

                            
                            <div className="fieldset"><label>First Name</label> <input type="text" name="first_name" onChange={(e) => this.changeValuesHandler(e)} /></div>
                            <div className="fieldset"><label>Last Name</label> <input type="text" name="last_name" onChange={(e) => this.changeValuesHandler(e)} /></div>
                            <div className="fieldset"><label>Email</label> <input type="text" name="email" onChange={(e) => this.changeValuesHandler(e)} /></div>
                            <div className="fieldset"><label>Password</label> <input type="password" name="password" onChange={(e) => this.changeValuesHandler(e)} /></div>
                            <div className="fieldset"><label>Confirm Password</label> <input type="password" name="confirm_password" onChange={(e) => this.changeValuesHandler(e)} /></div>
                            
                            
                            {/* {this.state.formValues.user_type != 1 && this.state.formValues.user_type != ''  && this.state.formValues.user_type == 2 ?
                                <div className="fieldset">
                                <label>Your Company Name</label>
                                <input type="text" placeholder name="company_name" onChange={(e) => this.changeValuesHandler(e)} />
                            </div> : ("") }
                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != ''  && this.state.formValues.user_type == 3 ?
                                <div className="fieldset">
                                <label>Enter your Law firm name</label>
                                <input type="text" placeholder name="law_firm_name" onChange={(e) => this.changeValuesHandler(e)} />
                            </div> : ("") }
                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != ''  && this.state.formValues.user_type == 2 ?
                            ( <h6>Address</h6> ) : this.state.formValues.user_type == 3 ?
                             (
                            <h6>Company Address</h6> )
                            : ("") }
                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != '' ?
                            <div>
                            <div className="fieldset">
                                <label>Street 1</label>
                                <input type="text" placeholder name="street1" onChange={(e) => this.changeValuesHandler(e)} />
                            </div>
                            <div className="fieldset">
                                <label>Street 2</label>
                                <input type="text" placeholder name="street2" onChange={(e) => this.changeValuesHandler(e)} />
                            </div> 
                            <div className="twoField d-flex justify-content-between">
                            <div className="fieldset">
                                <label>State</label>
                                <Select
                                    value={this.state.selectedState}
                                    onChange={this.handleChangeState}
                                    options={this.state.stateList} />   
                            </div>                            
                                <div className="fieldset">
                                    <label>City</label>
                                    <Select
                                        value={this.state.selectedCity}
                                        onChange={this.handleChangeCity}
                                        options={this.state.cityList}/> 
                                </div>
                            </div>
                                <div className="fieldset">
                                    <label>Zip Code</label>
                                    <input type="text" placeholder name="zipcode" onChange={(e) => this.changeValuesHandler(e)} />
                                </div>
                            
                            <div className="fieldset">
                                <label>Phone Number</label>
                                <input type="text" placeholder name="phone_number" onChange={(e) => this.changeValuesHandler(e)} />
                            </div> 
                            </div>
                            : ("") } */}
                            <div className="control-group">
                                <label className="control control--checkbox">
                                    {/* Agree to terms and Conditions */}<input type="checkbox" name="terms" onChange={(e) => this.changeValuesHandler(e)}/>
                                    <div className="control__indicator" />
                                </label>
                                <p>By creating an account you agree to <a target="_blank" href={process.env.PUBLIC_URL + "/terms-of-use"}>the terms of use</a> and <a target="_blank" href={process.env.PUBLIC_URL + "/privacy-policy"}> our privacy policy</a></p>
                            </div>
                            {
                                this.state.error !== '' ?
                                    <Alert color="danger">
                                    {this.state.error}
                                    </Alert>
                                    : null
                            }
                            <div className="btnGroup d-flex justify-content-center"><button type="button" onClick={() => {
                                this.signUpHandler()
                            }} className="smallBtn">Sign Up</button>
                                {/* <button type="button" className="smallBtn nobg">Process Server Sign Up</button> */}
                            </div>
                        </form>
                    </div>
                </div>
                <Footer2 />
            </div>
        );
    }
}

// export default Signup;
const mapStateToProps = state => {
    return {
        signUpRes: state.auth.signUpData,
        getStateSuccessRes: state.customers.getStateSuccessRes,
        getCitySuccessRes: state.customers.getCitySuccessRes,
        // verifyOTPRes: state.auth.verifyOTPRes,
        // resendOTPRes: state.auth.resendOTPRes,
        // verifyDetailsRes: state.auth.verifyDetailsRes,
        // loading: state.auth.loading
    }
}

//Send data to redux action
const mapDispatchToProps = dispatch => {
    return {
        signUp: (reqData) => dispatch(signUp(reqData)),
        getStateReq: (reqData) => dispatch(getStateReq(reqData)),
        getCityReq: (reqData) => dispatch(getCityReq(reqData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
