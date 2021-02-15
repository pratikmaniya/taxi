import React, { Component } from "react";
// import { Dropdown } from 'primereact/dropdown';
import routes from '../../Routes';
// import { withRouter, Link } from 'react-router-dom';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Header from '../common/header';
import Footer2 from '../common/footer2';
import * as common from '../../utils/functions';
import { changePassword } from '../../store/actions/auth';
import { editProfile } from '../../store/actions/salon'
import { profileSetup, getStateReq, getCityReq } from '../../store/actions/customers'
import { EMAIL_REGEX, STORAGE_KEYS, APP_NAME } from '../../utils/constants';
import { Alert } from 'reactstrap';
import $ from 'jquery';
import * as Types from '../../store/actions/actionTypes';
import store from '../../utils/store';
import alertify from 'alertifyjs';
import 'react-responsive-modal/styles.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
import messages from '../../utils/messages';

class ProfileSetup1 extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            selectedCity1: null,
            selectedState: '',
            selectedCity: '',	
            formValues: {
                company_name:'',
                street1:'',
                street2:'',
                state_id:'',
                city_id:'',
                zipcode:'',
                phone_number:'',
            },
            error: '',
            errorField: '',
            stateList: [],
            cityList: [],
            selectedState: '',
            selectedCity: '',
            user_type: JSON.parse(localStorage.getItem('DATA')).user_type 
        };
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        this.onCityChange = this.onCityChange.bind(this);        
    }
    
    onCityChange(e) {
        this.setState({ selectedCity1: e.value });
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

    onClickSubmit = () => {
        console.log('onClickSubmit',this.state.formValues)
        this.validateFormData(this.state.formValues)
    }

    submitHandler = async () => {
        console.log(this.state.formValues)        
        let obj = []
        if(this.state.user_type== 2)
        {
            obj = {
                company_name: this.state.formValues.company_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.formValues.state_id,
                city: this.state.formValues.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else
        {
            obj = {
                law_firm_name: this.state.formValues.law_firm_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.formValues.state_id,
                city: this.state.formValues.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        console.log(obj)
        this.validateFormData(obj);
        // this.validateFormData(this.state.formValues);
    }
    validateFormData = (body) => {
        let schema
        // console.log('====Validate====', JSON.parse(localStorage.getItem('DATA')).user_type)
        if(this.state.user_type == 2)
        {
             schema = Joi.object().keys({
                company_name: Joi.string().trim().required(),
                street1: Joi.string().trim().required(),
                street2: Joi.string().trim().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().trim().required(),
                phone_number: Joi.number().required(),
                // Agree_to_terms_and_Conditions: Joi.string().required()
            })
        }
        else
        {
             schema = Joi.object().keys({
                law_firm_name: Joi.string().trim().required(),
                street1: Joi.string().trim().required(),
                street2: Joi.string().trim().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().trim().required(),
                phone_number: Joi.number().required(), 
                // Agree_to_terms_and_Conditions: Joi.string().required()
            })
        } 
         
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
                    if(this.state.user_type == 2)
                    {
                        reqData = {
                            company_name: this.state.formValues.company_name,
                            street1: this.state.formValues.street1,
                            street2: this.state.formValues.street2,
                            state: this.state.formValues.state_id,
                            city: this.state.formValues.city_id,
                            zipcode: this.state.formValues.zipcode,
                            phone_number: this.state.formValues.phone_number,
                        }
                    }
                    else
                    {
                        reqData = {
                            law_firm_name: this.state.formValues.law_firm_name,
                            street1: this.state.formValues.street1,
                            street2: this.state.formValues.street2,
                            state: this.state.formValues.state_id,
                            city: this.state.formValues.city_id,
                            zipcode: this.state.formValues.zipcode,
                            phone_number: this.state.formValues.phone_number,
                        }
                    }
                    
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
        
        await this.props.profileSetup(reqData);
        store.dispatch({
            type: Types.STOP_LOADER
        })
        // var msg = alertify.success('Default message');
        // msg.delay(1.5).setContent('suc');
        // common.displayLog(1, 'suc');
        // console.log("================",this.props.signUpRes)
        if (this.props.profileSetupSuccessRes && this.props.profileSetupSuccessRes.code === 1) 
        {
            /* await localStorage.clear()
            await localStorage.setItem('signUpUser', JSON.stringify(this.state))
            await localStorage.setItem(STORAGE_KEYS.AUTH, true)            
            await localStorage.setItem('DATA', JSON.stringify(this.props.signUpRes.data.user))
            await localStorage.setItem('name', this.props.signUpRes.data.user.first_name)
            await localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, this.props.signUpRes.auth_token) */
            var msg = alertify.success('Default message');
            msg.delay(1.5).setContent(this.props.profileSetupSuccessRes.message);
            common.displayLog(1, this.props.profileSetupSuccessRes.message);
                    this.props.history.push({
                        pathname: process.env.PUBLIC_URL + '/',
                        state: { user: this.props.profileSetupSuccessRes.data}
                    })
        }
    }

	render() {
		return (
			<div>
                <Header />   
				<div className="signIn profileSetup">
                    <div className="signInContent">
                        <form>
                            <h1 className="mainHeading">Profile Set Up</h1>
                            <div className="fieldset">
                                <label>Company Name</label>
                                <input type="text" placeholder name="company_name" onChange={(e) => this.changeValuesHandler(e)} />
                            </div>
                            <h6>Address</h6>
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
                            {
                                this.state.error !== '' ?
                                    <Alert color="danger">
                                    {this.state.error}
                                    </Alert>
                                    : null
                            }
                            <div className="btnGroup d-flex justify-content-center">
                                <button type="button" className="smallBtn" onClick={() => {this.submitHandler()}}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer2/>
            </div>
		);
	}
}

// export default ProfileSetup1;
const mapStateToProps = state => {
    return {
        getStateSuccessRes: state.customers.getStateSuccessRes,
        getCitySuccessRes: state.customers.getCitySuccessRes,
        profileSetupSuccessRes: state.customers.profileSetupSuccessRes,
        
    }
}

//Send data to redux action
const mapDispatchToProps = dispatch => {
    return {
        getStateReq: (reqData) => dispatch(getStateReq(reqData)),
        getCityReq: (reqData) => dispatch(getCityReq(reqData)),
        profileSetup: (reqData) => dispatch(profileSetup(reqData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileSetup1));
