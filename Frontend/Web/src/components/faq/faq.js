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
    getFaq,
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

class Faq extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            selectedCity1: null,
            toggle: false,
            faq:[]
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
        await this.getFaq()
    }

    getFaq = async () => {
        let statessss = []
        let reqData = []
        await this.props.getFaq(reqData)
        if (this.props.faqSuccessRes && this.props.faqSuccessRes.code == 1) {
            this.setState({ faq: this.props.faqSuccessRes.data });
            
            console.log("Faq ==>>",this.state.faq) 
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
                                <h2 className="FaqMainHeading mainHeading" style={{textAlign:"center"}}>FAQ</h2>
                               
                                {this.state.faq && this.state.faq.length > 0 ?
                                 <ol className="attentionList"> 
                                    {this.state.faq.map(ad => (
                                    <>
                                    <li className="lifontbold" style={{marginBottom:"0 !important"}}>{ad.question}</li>
                                    <ul className="attentionList" style={{paddingTop:"0 !important"}}>
                                        <li style={{marginBottom:"0 !important"}}>{ad.answer}</li>    
                                    </ul> 
                                    </>                                
                                )) }

                                 </ol>
                                 
                                : <div></div>
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
        faqSuccessRes: state.customers.faqSuccessRes,
        loading: state.auth.loading,
        // propertyAddressRes: state.customers.getPropertyAddressRes
    }
}
//Send data to redux action
const mapDispatchToProps = dispatch => {
    return {
        getFaq: (reqData) => dispatch(getFaq(reqData)),        
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Faq));
