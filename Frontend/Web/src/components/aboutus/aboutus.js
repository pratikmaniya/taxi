import React, { Component } from "react";
// import { Dropdown } from 'primereact/dropdown';
import routes from '../../Routes';
// import { withRouter, Link } from 'react-router-dom';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Header from '../common/header';
import Footer from '../common/footer';
import * as common from '../../utils/functions';
import { changePassword } from '../../store/actions/auth';
import { editProfile } from '../../store/actions/salon'
import {
    getAbout,
}
    from '../../store/actions/customers'
import { EMAIL_REGEX, STORAGE_KEYS, APP_NAME } from '../../utils/constants';
import { Alert } from 'reactstrap';
import $ from 'jquery';
import * as Types from '../../store/actions/actionTypes';
import store from '../../utils/store';
import alertify from 'alertifyjs';
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
import messages from '../../utils/messages';

class AboutUs extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            selectedCity1: null,
            toggle: false,
            about:[]
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
        await this.getAbout()
    }

    getAbout = async () => {
        let statessss = []
        let reqData = []
        await this.props.getAbout(reqData)
        if (this.props.aboutSuccessRes && this.props.aboutSuccessRes.code == 1) {
            this.setState({ about: this.props.aboutSuccessRes.data });
            
            console.log("About ==>>",this.state.about) 
        }
    }
    
    toggle = () => {
        this.setState({toggle : !this.state.toggle})
    }    
    
	render() {
        // console.log(this.state)
		return (
			<div>   
                <Header />     				
                <section className="section1" style={{padding:"31px 0 !important"}}>
                    <div className="container">
                        <div className="row align-items-center">
                            {/* <div className="col-md-6">
                                <div className="leftImg wow fadeInLeft" data-wow-delay="0.4s"><img src="images/Graphics.jpg" alt="" /></div>
                            </div> */}
                            <div className="col-md-12 wow" data-wow-delay="0.4s">
                                <h2 className="FaqMainHeading mainHeading" style={{textAlign:"center"}}>About Us</h2>
                                
                                {
                                    this.state.about && this.state.about.length > 0
                                        ?
                                        this.state.about.map(about => (<div style={{ padding: '20px', margin: '20px' }} dangerouslySetInnerHTML={{ __html: about.description }}></div>))
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>				
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        aboutSuccessRes: state.customers.aboutSuccessRes,
        loading: state.auth.loading,
        // propertyAddressRes: state.customers.getPropertyAddressRes
    }
}
//Send data to redux action
const mapDispatchToProps = dispatch => {
    return {
        getAbout: (reqData) => dispatch(getAbout(reqData)),        
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutUs));
