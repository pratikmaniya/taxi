import React, { Component } from "react";

import Header from '../common/header';
import Footer2 from '../common/footer2';
import Step1 from './Steps/Step1'

class NoticeOrdering extends Component {
    state = {
        currentStep: 1
    }
    onStateChange = (e) => {
        this.setState({ selectedState: e.value });
    }
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 6 ? 7 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }
    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary prevBtn"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        return null;
    }
    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 7) {
            return (
                <button
                    className="btn btn-primary float-right nextBtn"
                    type="button" onClick={this._next}>
                    Next
                </button>
            )
        }
        return null;
    }
    render() {
        return (
            <div>
                <Header />
                <section className="noticesSection">
                    <div className="container">
                        {/* <p>Step {this.state.currentStep}</p>  */}
                        <form onSubmit={this.handleSubmit} className="stepForm">
                            <Step1
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                noticetype={this.state.noticetype}
                            />
                            <Step2
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                lessorinfo={this.state.lessorinfo}
                            />
                            <Step3
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                premisesinfo={this.state.premisesinfo}
                            />
                            <Step4
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                tenantinfo={this.state.tenantinfo}
                            />
                            <Step5
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                noticeinfo={this.state.noticeinfo}
                            />
                            <Step6
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                reviewSign={this.state.reviewSign}
                            />
                            <Step7
                                currentStep={this.state.currentStep}
                                handleChange={this.handleChange}
                                paySend={this.state.paySend}
                            />
                            {this.previousButton()}
                            {this.nextButton()}
                        </form>
                    </div>
                </section>

                <Footer2 />
            </div>
        );
    }
}


function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <div className="form-group">
            <div className="numbering">
                <ul className="d-flex">
                    <li className="select selectBorder d-flex flex-wrap justify-content-center text-center"> <span>1</span> <label>select Notice</label></li>
                    <li className="select d-flex flex-wrap justify-content-center text-center"> <span>2</span> <label>Lessor Information</label></li>
                    <li className="d-flex flex-wrap justify-content-center text-center"> <span>3</span> <label>Premises Information</label></li>
                    <li className="d-flex flex-wrap justify-content-center text-center"> <span>4</span> <label>Tenant Information</label></li>
                    <li className="d-flex flex-wrap justify-content-center text-center"> <span>5</span> <label>Notice Information</label></li>
                    <li className="d-flex flex-wrap justify-content-center text-center"> <span>6</span> <label>review &amp; sign</label></li>
                    <li className="d-flex flex-wrap justify-content-center text-center"> <span>7</span> <label>Send or Download</label></li>
                </ul>
            </div>
            <div className="noticeMain">
                <div className="landlordInfo">
                    <div className="landlordAdd">
                        <div className="head">
                            <h2 className="subHeading">Lessor Information</h2>
                            <p>(Enter lessor details or select from the stored data)</p>
                        </div>
                        <div className="addBlock">
                            <div className="addBox">
                                <div className="option">
                                    <input type="radio" name="card" id="silver" defaultValue="silver" defaultChecked />
                                    <label htmlFor="silver" aria-label="Silver">
                                        <span />
                                        <div className="addText">
                                            <p>Trinity</p>
                                            <p>+1 123 45 678 90</p>
                                            <p>8954 William Ave. Deer Park, NY 11729</p>
                                        </div>
                                        <div className="card card--white card--sm">
                                            <div className="card__chip" />
                                            <div className="card__content">
                                                <div className="card__symbol">
                                                    <span /> <span />
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="option">
                                    <input type="radio" name="card" id="royal" defaultValue="royal" />
                                    <label htmlFor="royal" aria-label="Royal blue">
                                        <span />
                                        <div className="addText">
                                            <p>Gogozoom</p>
                                            <p>123-456-7890</p>
                                            <p>894 Williams Ave Deer Park, NY 11729</p>
                                        </div>
                                        <div className="card card--blue card--sm">
                                            <div className="card__chip" />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button type="button" id="addNewAdd" className="newAddressBtn">Add New Address<img src="images/plus.svg" /></button>

                            <div id="newAddBlock" className="addAddress">
                                <div className="formField">
                                    <div className="two d-flex">
                                        <div className="fieldset width">
                                            <label>Lessor Name</label>
                                            <input type="text" placeholder="Enter State" />
                                        </div>
                                        <div className="fieldset width">
                                            <label>Phone Number</label>
                                            <input type="text" placeholder="Enter City" />
                                        </div>
                                    </div>
                                    <div className="two d-flex">
                                        <div className="fieldset width full">
                                            <label>Street 1</label>
                                            <input type="text" placeholder="Alabama" />
                                        </div>
                                        <div className="fieldset width">
                                            <label>Unit (Optional )</label>
                                            <input type="text" placeholder="Washington" />
                                        </div>
                                    </div>
                                    <div className="two d-flex">
                                        <div className="fieldset width">
                                            <label>State</label>
                                            <input type="text" placeholder="Enter State" />
                                        </div>
                                        <div className="fieldset width">
                                            <label>City</label>
                                            <input type="text" placeholder="Enter City" />
                                        </div>
                                        <div className="fieldset width">
                                            <label>Zipcode</label>
                                            <input type="text" placeholder="Enter Zipcode" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btmSection d-flex flex-wrap">
                    <div className="btnGroup">
                        <button type="button" className="smallBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return (
        <React.Fragment>
            <div className="form-group">
                <div className="numbering">
                    <ul className="d-flex">
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center"> <span>1</span> <label>select Notice</label></li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center"> <span>2</span> <label>Landlord Information</label></li>
                        <li className="select d-flex flex-wrap justify-content-center text-center"> <span>3</span> <label>Premises Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>4</span> <label>Tenant Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>5</span> <label>Notice Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>6</span> <label>review &amp; sign</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>7</span> <label>Send or Download</label></li>
                    </ul>
                </div>
                <div className="noticeMain premisesInfo">
                    <div className="landlordInfo">
                        <h2 className="topHeading">Premises Information</h2>
                        <div className="landlordAdd">
                            <div className="head">
                                <h2 className="subHeading">Address</h2>
                                <p>(Enter address details or select from the stored addresses)</p>
                            </div>
                            <div className="addBlock">
                                <div className="addBox">
                                    <div className="option">
                                        <input type="radio" name="card2" id="silver2" defaultValue="silver2" defaultChecked />
                                        <label htmlFor="silver2" aria-label="Silver2">
                                            <span /> 8954 William Ave. Deer Park, NY 11729
                                                <div className="card card--white card--sm">
                                                <div className="card__chip" />
                                                <div className="card__content">
                                                    <div className="card__symbol"> <span /> <span />
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="option">
                                        <input type="radio" name="card2" id="royal2" defaultValue="royal2" />
                                        <label htmlFor="royal2" aria-label="Royal2 blue">
                                            <span /> 107 W. Glendale Drive Oshkosh, WI 54901
                                                <div className="card card--blue card--sm">
                                                <div className="card__chip" />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <button type="button" id="addNewAdd2" className="newAddressBtn">Add New Address<img src="images/plus.svg" /></button>
                                <div id="newAddBlock2" className="addAddress">
                                    <div className="formField">
                                        <div className="two d-flex">
                                            <div className="fieldset width full">
                                                <label>Street 1</label>
                                                <input type="text" placeholder="Alabama" />
                                            </div>
                                            <div className="fieldset width">
                                                <label>Unit (Optional )</label>
                                                <input type="text" placeholder="Washington" />
                                            </div>
                                        </div>
                                        <div className="two d-flex">
                                            <div className="fieldset width">
                                                <label>State</label>
                                                <input type="text" placeholder="Enter State" />
                                            </div>
                                            <div className="fieldset width">
                                                <label>City</label>
                                                <input type="text" placeholder="Enter City" /></div>
                                            <div className="fieldset width"> <label>Zipcode</label> <input type="text" placeholder="Enter Zipcode" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="unitNumberBlock">
                                <h2 className="subHeading">Unit Number</h2>
                                <div className="addBox unitOption">
                                    <div className="option"> <input type="radio" name="card3" id="unit1" defaultValue="unit" defaultChecked /> <label htmlFor="unit1" aria-label="unit"> <span /> Premise Has Unit #<div className="card card--white card--sm"><div className="card__chip" /><div className="card__content"><div className="card__symbol"> <span /> <span /></div></div></div> </label></div>
                                    <div
                                        className="option"> <input type="radio" name="card3" id="unit2" defaultValue="unit2" /> <label htmlFor="unit2" aria-label="unit2"> <span /> Unit # Is N/A (Such As A Single Family House)<div className="card card--blue card--sm"><div className="card__chip" /></div> </label></div>
                                </div>
                                <div className="formField">
                                    <div className="fieldset width"> <input type="text" placeholder="Enter Number" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btmSection d-flex flex-wrap"> {/*
                            <p class="textLeft"> <em>*</em>Please Login / Register to Save</p> */}
                        <div className="btnGroup d-flex flex-wrap align-items-center">
                            <p className="textLeft"> <em>*</em>Please Login / Register to Save</p> <button type="button" className="smallBtn">Save</button> {/* <button type="button" class="smallBtn">Save & Complete Later</button> */}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return (
        <React.Fragment>
            <div className="form-group">
                <div className="numbering">
                    <ul className="d-flex">
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>1</span>
                            <label>select Notice</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>2</span>
                            <label>Landlord Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>3</span>
                            <label>Premises Information</label>
                        </li>
                        <li className="select d-flex flex-wrap justify-content-center text-center">
                            <span>4</span>
                            <label>Tenant Information</label>
                        </li>
                        <li className="d-flex flex-wrap justify-content-center text-center">
                            <span>5</span>
                            <label>Notice Information</label>
                        </li>
                        <li className="d-flex flex-wrap justify-content-center text-center">
                            <span>6</span>
                            <label>review &amp; sign</label>
                        </li>
                        <li className="d-flex flex-wrap justify-content-center text-center">
                            <span>7</span>
                            <label>Send or Download</label>
                        </li>
                    </ul>
                </div>
                <div className="noticeMain">
                    <div className="TenantInfo">
                        <div className="head">
                            <h2 className="subHeading">Tenant Information</h2>
                            <div className="numberTenant d-flex flex-wrap align-items-center">
                                <h5>how many tenants are on the lease?</h5>
                                <div className="cityDropdown numberDropDown">
                                    <select name="sources" id="sources" className="custom-select sources formField noCheck" placeholder="No of Tenant">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="tenantInfoTable">
                            <table>
                                <tbody>
                                    <tr>
                                        <th style={{ width: '60px' }}>No</th>
                                        <th>First Name<em className="mandatory">*</em></th>
                                        <th>Last Name<em className="mandatory">*</em></th>
                                        <th>Phone Number (Optional)</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="First Name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="Last Name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="Phone Number" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="First Name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="Last Name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="Phone Number" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="First Name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="Last Name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fieldset width">
                                                <input type="text" placeholder="Phone Number" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="btmSection d-flex flex-wrap">
                        <div className="btnGroup d-flex flex-wrap align-items-center">
                            <p className="textLeft">
                                <em>*</em>Please Login / Register to Save
                                </p>
                            <button type="button" className="smallBtn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return (
        <React.Fragment>
            <div className="form-group">
                <div className="numbering">
                    <ul className="d-flex">
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>1</span>
                            <label>select Notice</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>2</span>
                            <label>Landlord Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>3</span>
                            <label>Premises Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>4</span>
                            <label>Tenant Information</label>
                        </li>
                        <li className="select d-flex flex-wrap justify-content-center text-center">
                            <span>5</span>
                            <label>Notice Information</label>
                        </li>
                        <li className="d-flex flex-wrap justify-content-center text-center">
                            <span>6</span>
                            <label>review &amp; sign</label>
                        </li>
                        <li className="d-flex flex-wrap justify-content-center text-center">
                            <span>7</span>
                            <label>Send or Download</label>
                        </li>
                    </ul>
                </div>
                <div className="noticeMain">
                    <div className="TenantInfo noticeInform">
                        <div className="head">
                            <h2 className="subHeading">Notice Information</h2>
                            <div className="numberTenant d-flex flex-wrap align-items-center">
                                <div className="fieldset width">
                                    <label>Due Date</label>
                                    <input type="text" placeholder />
                                </div>
                                <div className="fieldset width">
                                    <label>Total Money Owed</label>
                                    <input type="text" placeholder />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btmSection d-flex flex-wrap align-items-center">
                        <div className="btnGroup d-flex flex-wrap align-items-center">
                            <p className="textLeft">
                                <em>*</em>Please Login / Register to Save
                                </p>
                            <button type="button" className="smallBtn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return (
        <React.Fragment>
            <div className="form-group">
                <div className="numbering">
                    <ul className="d-flex">
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>1</span>
                            <label>select Notice</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>2</span>
                            <label>Landlord Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>3</span>
                            <label>Premises Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>4</span>
                            <label>Tenant Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>5</span>
                            <label>Notice Information</label>
                        </li>
                        <li className="select d-flex flex-wrap justify-content-center text-center">
                            <span>6</span>
                            <label>review &amp; sign</label>
                        </li>
                        <li className="d-flex flex-wrap justify-content-center text-center">
                            <span>7</span>
                            <label>Send or Download</label>
                        </li>
                    </ul>
                </div>
                <div className="noticeMain">
                    <div className="reviewSign">
                        <div className="head">
                            <h2 className="subHeading">Review &amp; Sign</h2>
                        </div>
                        <div className="reviewSignContent">
                            <address>
                                <span className="name">Alice</span>
                                <label className="add">Postal Address:</label> 8954 William Ave. Deer Park, NY 11729
                                    <div className="mobileNo"><label>Mo&nbsp;:</label> 210-270-7768</div>
                                <div className="date"><label>Dated&nbsp;:</label> 10-07-2020</div>
                            </address>
                            <div className="reviewSignText">
                                <p>Dear&nbsp;Alice, </p>
                                <p>I am writing to give you one month’s written notice to vacate the property&nbsp;(property address you’re renting)&nbsp;which I currently rent from yourself. Please accept this written notice in accordance with the tenancy agreement as my intention to vacate the property on or before&nbsp;(tenancy end date or date you intend to move).</p>
                                <p>I will be cleaning the property to make sure to leave it in a good condition. Please send me any specific move out cleaning instructions if you have any? I will remove my personal belongings and turn in my keys on or before&nbsp;(tenancy end date or date you intend to move).</p>
                                <p> I would like to meet you at the property on the last day I am in possession of the keys, so that you have the opportunity to inspect the property in my company so that the final condition of the property can be agreed. Please could you contact me to confirm an appropriate time of day? </p><p>As you are aware, and in accordance to the tenancy deposit protection provisions, you will need to return my security deposit to me within 10 days, however, if you are able to return this to me anytime sooner it would be greatly appreciated. I look forward to hearing from you soon regarding these matters.</p>
                                <p className="mb-0">Yours faithfully,</p>
                                <div className="nameSign">
                                    <div className="fieldset width">
                                        <input type="text" placeholder="Name" />
                                    </div>
                                    <span className="sign">John Smith</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btmSection d-flex flex-wrap align-items-center">
                        <div className="btnGroup">
                            <button type="button" className="smallBtn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    }
    return (
        <React.Fragment>
            <div className="form-group">
                <div className="numbering">
                    <ul className="d-flex">
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>1</span>
                            <label>select Notice</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>2</span>
                            <label>Landlord Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>3</span>
                            <label>Premises Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>4</span>
                            <label>Tenant Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>5</span>
                            <label>Notice Information</label>
                        </li>
                        <li className="select selectBorder d-flex flex-wrap justify-content-center text-center">
                            <span>6</span>
                            <label>review &amp; sign</label>
                        </li>
                        <li className="select d-flex flex-wrap justify-content-center text-center">
                            <span>7</span>
                            <label>Send or Download</label>
                        </li>
                    </ul>
                </div>
                <div className="noticeMain">
                    <div className="downloadSend">
                        <div className="downloadHead">
                            <h6>NOTICE IS COMPLETE &amp; SAVED TO DASHBOARD</h6>
                        </div>
                        <div className="head">
                            <h2 className="subHeading">Send/Serve via NoticeTenant</h2>
                        </div>
                        <div className="downloadSendContent">
                            <p>According to NY law, this notice requires delivery</p>
                            <p>1. by process server for each tenant named,</p>
                            <p>1b.  including a notarized affidavit of service for each tenant named.</p>
                            <p>1c. The original affidavits of service must then be mailed from the process server to the landlord for future court filings.</p>
                            <p>2. By certified mail for each tenant named</p>
                            <p>3. By regular mail for each tenant named</p>
                            <p>NoticeTenant can do this all, including status updates, gps and time stamps, without the landlord ever having to leave their computer.”</p>

                            <div className="downloadTable">
                                {/* <h5>Then the user is prompted to pay for the correct amount :</h5> */}
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>3 Process Server</td>
                                            {/* <td className="text-right">$30.00</td>                                                 */}
                                        </tr>
                                        <tr>
                                            <td>3 Certified mail</td>
                                            {/* <td className="text-right">$45.00</td>                                                 */}
                                        </tr>
                                        <tr>
                                            <td>3 Regular Mail</td>
                                            {/* <td className="text-right">$270.00</td> */}
                                        </tr>
                                        {/* <tr>
                                                <td colSpan={2}>
                                                    <p>(Including 3 notarized affidavits of service mailed back to landlord)</p>
                                                </td>
                                            </tr> */}
                                        <tr>
                                            {/* <td></td> */}
                                            <td className="totalAmt"><label>Total:</label> $500.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="btmSection d-flex flex-wrap justify-content-between align-items-center">
                        <div className="totalCost d-flex flex-warp align-items-center">
                            <h3><label>Total Cost :</label>$345</h3>
                            <button type="button" className="payBtn">Pay &amp; Send</button>
                        </div>
                        <div className="btnGroup d-flex flex-wrap">
                            <a href="dashboard.html" type="button" className="smallBtn">Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


export default NoticeOrdering;
