import React, { Component } from "react";

import { Dropdown } from 'primereact/dropdown';

import Header from '../common/header';
import Footer2 from '../common/footer2';

class TenantInofService extends Component {
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
				<section className="tenantInfo tenantInfoService noticesSection">
                    <div className="container">
                        <div className="noticeMain">
                            <div className="noticeInfoSecion">
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
                                </div>
                                <div className="btmSection downloadNotice">
                                    <h3>Notices</h3>
                                    <p className="textLeft">
                                        <label>Type of Notice :</label> Failure of rent payment within 5 days
                                    </p>
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
                                <div className="btmSection downloadNotice ">
                                    <h3>Certificates of Service</h3>                                
                                    <div className="downloadpdfFiles downloadpdfSer d-flex flex-wrap">
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
                            
                            <div className="processService">
                                <div className="head">
                                    <h2 className="subHeading">Delivery Methods</h2>
                                </div>
                                <div className="proSer">
                                    <h4>Process Server</h4>
                                </div>

                                <div className="processServiceTable noticeTable">
                                    <div className="processTable">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '176px'}}>Name</th>
                                                    <th>ATTEMPTS</th>
                                                    <th style={{width: '220px'}}>Latitude/Longitude</th>
                                                    <th>GPS TIMESTAMP</th>
                                                    <th>Location &amp; Time</th>
                                                </tr>
                                                <tr>
                                                    <td>Alice Jones</td>
                                                    <td className="complete text-center"><img src="images/correct.png"/> Complete</td>
                                                    <td className="text-center">34.69888 | 135.534146</td>
                                                    <td className="text-center">15 Jul, 2020 21:30</td>
                                                    <td>9841 Old Fayetteville Rd</td>
                                                </tr>
                                                <tr>
                                                    <td>Joe Bredy</td>
                                                    <td className="inProgress text-center" ><img src="images/inprogress.png"/> In Progress</td>
                                                    <td className="text-center">34.69888 | 135.534146</td>
                                                    <td className="text-center">15 Jul, 2020 21:15</td>                                                    
                                                    <td >226 Gaines Thrifty Ln</td>
                                                </tr>
                                                <tr>
                                                    <td>Ross Heffelman</td>
                                                    <td className="pending text-center"><img src="images/pending.png"/> Pending</td>
                                                    <td className="text-center">34.69888 | 135.534146</td>
                                                    <td className="text-center">15 Jul, 2020 21:30</td>
                                                    <td>226 Gaines Thrifty Ln</td>
                                                </tr>                                                
                                            </tbody>
                                        </table>
                                    </div>  
                                    <div className="processTable certifiedTable">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '176px'}}>Certified Mail</th>
                                                    <th>status</th>
                                                    <th style={{width: '220px'}}>date sent</th>
                                                    <th>date delivered</th>
                                                    <th>sign card</th>
                                                </tr>
                                                <tr>
                                                    <td>Alice Jones</td>
                                                    <td className="complete text-center"> Delivered</td>
                                                    <td className="text-center">September 1, 2020</td>
                                                    <td className="text-center">September 2, 2020</td>
                                                    <td className="text-center"><img src="images/file-img.png"/></td>
                                                </tr>
                                                <tr>
                                                    <td>Joe Bredy</td>
                                                    <td className="inProgress text-center">In Progress</td>
                                                    <td className="text-center">34.69888 | 135.534146</td>
                                                    <td className="text-center"></td>                                                    
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Ross Heffelman</td>
                                                    <td className="complete text-center"> Delivered</td>
                                                    <td className="text-center">September 1, 2020</td>
                                                    <td className="text-center">September 2, 2020</td>
                                                    <td className="text-center"><img src="images/file-img.png"/></td>
                                                </tr>                                                
                                            </tbody>
                                        </table>
                                    </div>  
                                    <div className="processTable regularTable">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '176px'}}>regular Mail</th>
                                                    <th style={{width: '220px'}}>status</th>
                                                    <th className="text-left">date sent</th>                                                    
                                                </tr>
                                                <tr>
                                                    <td>Alice Jones</td>
                                                    <td className="complete text-center"> Delivered</td>
                                                    <td className="">September 1, 2020</td>                                                    
                                                </tr>
                                                <tr>
                                                    <td>Joe Bredy</td>
                                                    <td className="complete text-center"> Delivered</td>
                                                    <td className="">September 1, 2020</td>    
                                                </tr>
                                                <tr>
                                                    <td>Ross Heffelman</td>
                                                    <td className="complete text-center"> Delivered</td>
                                                    <td className="">September 1, 2020</td>    
                                                </tr>                                                
                                            </tbody>
                                        </table>
                                    </div>                                    
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


export default TenantInofService;
