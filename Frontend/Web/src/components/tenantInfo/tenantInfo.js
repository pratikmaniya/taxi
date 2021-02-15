import React, { Component } from "react";

import { Dropdown } from 'primereact/dropdown';

import Header from '../common/header';
import Footer2 from '../common/footer2';

class TenantInof extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            selectedCity1: null,
            
            currentStep: 1,
            // email:  '',
            // username: '',
            // password: '', 
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


	render() {
		return (
			<div>
                <Header />   
				<section className="tenantInfo noticesSection">
                    <div className="container">
                        <div className="noticeMain">
                            <div className="head">
                                <h2 className="subHeading">Tenant Information</h2>
                            </div>
                            <div className="tenantInfoBlock d-flex flex-wrap">
                                <div className="box">
                                    <div className="userBox d-flex">
                                        <img src="images/user.svg" alt="" />
                                        <span>Alice</span>
                                    </div>
                                    <div className="contactBox d-flex">
                                        <img src="images/mobile.svg" alt="" />
                                        <span>210-270-7768</span>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="userBox d-flex">
                                        <img src="images/user.svg" alt="" />
                                        <span>Joe</span>
                                    </div>
                                    <div className="contactBox d-flex">
                                        <img src="images/mobile.svg" alt="" />
                                        <span>210-845-0045</span>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="userBox d-flex">
                                        <img src="images/user.svg" alt="" />
                                        <span>Ross</span>
                                    </div>
                                    <div className="contactBox d-flex">
                                        <img src="images/mobile.svg" alt="" />
                                        <span>220-187-1901</span>
                                    </div>
                                </div>
                            </div>
                            <div className="premiseAdd">
                                <h5>Premise Address</h5>
                                <div className="add d-flex">
                                    <img src="images/home.svg" alt="" />
                                    <p>8954 William Ave, Deer Park, NY 11729</p>
                                </div>
                            </div>
                            <div className="landlordInfo d-flex justify-content-between">
                                <div className="landlordInfoLeft">
                                    <div className="head">
                                        <h2 className="subHeading">Landlord Information</h2>
                                    </div>
                                    <div className="detail d-flex">
                                        <img src="images/user.svg" alt="" />
                                        <span>John Smith</span>
                                    </div>
                                    <div className="detail d-flex">
                                        <img src="images/mobile.svg" alt="" />
                                        <span>220-187-1901</span>
                                    </div>
                                    <div className="detail d-flex">
                                        <img src="images/home.svg" alt="" />
                                        <span className="address">1872 Old Whiteville Rd, Lumberton, NC, 28358</span>
                                    </div>
                                </div>
                                <div className="landlordInfoRight">
                                    <button type="button" className="smallBtn">Edit</button>
                                    <button type="button" className="smallBtn">Send</button>
                                </div>
                            </div>
                            <div className="btmSection downloadNotice d-flex flex-wrap justify-content-between align-items-center">
                                <p className="textLeft">
                                    <label>Type of Notice :</label> Failure of rent payment within 5 days
                                </p>
                                {/* <div className="btnGroup">
                                    <img src="images/download-doc-img.svg" />
                                    <button type="button" className="payBtn">Download Notice</button>
                                    <span className="notice">( 3- Notices )</span>
                                </div> */}
                            </div>
                            <div className="downloadpdfFiles d-flex flex-wrap">
                                <div className="pdfBox d-flex flex-wrap align-items-center">
                                    <div className="pdfImg">
                                        <img src="images/pdf-img.svg" alt="" />
                                    </div>
                                    <h4>Alice Jones Notice</h4>
                                    <img src="images/download-icon.svg" alt=""  class="downloadIcon" />
                                </div>
                                <div className="pdfBox d-flex flex-wrap align-items-center">
                                    <div className="pdfImg">
                                        <img src="images/pdf-img.svg" alt="" />
                                    </div>
                                    <h4>Alice Jones Notice</h4>
                                    <img src="images/download-icon.svg" alt=""  class="downloadIcon" />
                                </div>
                                <div className="pdfBox d-flex flex-wrap align-items-center">
                                    <div className="pdfImg">
                                        <img src="images/pdf-img.svg" alt="" />
                                    </div>
                                    <h4>Alice Jones Notice</h4>
                                    <img src="images/download-icon.svg" alt=""  class="downloadIcon" />
                                </div>
                                <div className="pdfBox d-flex flex-wrap align-items-center">
                                    <div className="pdfImg">
                                        <img src="images/pdf-img.svg" alt="" />
                                    </div>
                                    <h4>Alice Jones Notice</h4>
                                    <img src="images/download-icon.svg" alt=""  class="downloadIcon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer2/>
            </div>
		);
	}
}   


export default TenantInof;
