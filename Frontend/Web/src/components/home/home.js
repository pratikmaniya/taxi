import React, { Component } from "react";
import WOW from "wowjs";
import { Dropdown } from 'primereact/dropdown';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getStateReq } from '../../store/actions/customers';
import Header from '../common/header';
import Footer from '../common/footer';

class Home extends Component {
    state = {
        stateList: [],
        selectedState: null
    }
    async componentDidMount() {
        //   wow animation 
        const wow = new WOW.WOW();
        wow.init();
        // Sticky Header    
        window.addEventListener('scroll', () => {
            var element = document.getElementById("body");
            element.classList.add("stickyHeader");
            if (window.scrollY === 0) {
                element.classList.remove("stickyHeader");
            }
        });
        await this.getState()
    }
    getState = async () => {
        let reqData =
        {
            getAllStateListNames: "TRUE",
            page_no: 1,
            limit: 10
        }
        await this.props.getStateReq(reqData)
        if (this.props.getStateSuccessRes && this.props.getStateSuccessRes.code == 1) {
            this.setState({ stateList: this.props.getStateSuccessRes.data, selectedState: this.props.getStateSuccessRes.data[0] })
        }
    }
    onStateChange = (e) => {
        this.setState({ selectedState: e.value });
    }
    createInvoiceClickHandler = () => {
        this.props.history.push(process.env.PUBLIC_URL + `noticeordering`, { stateId: this.state.selectedState.id })
    }
    render() {
        return (
            <div>
                <Header />
                <section className="bannerSection position-relative">
                    <div className="container">
                        <div className="bannerContent position-absolute text-center">
                            <h1 className="textWhite wow fadeInUp" data-wow-delay="0.2s">Lorem Ipsum is simply dummy text</h1>
                            <h3 className="textWhite wow fadeInUp" data-wow-delay="0.4s">Create and Serve a legal Notice to Tenants in minutes</h3>
                            <div className="selectStateBox d-flex justify-content-between wow fadeInUp" data-wow-delay="0.8s">
                                <div className="custom-select sources noCheck">
                                    <Dropdown value={this.state.selectedState} options={this.state.stateList} onChange={this.onStateChange} optionLabel="name" placeholder="Select State" />
                                </div>
                                <button type="button" onClick={() => this.createInvoiceClickHandler()} className="noticeBtn" >Create New Notice</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section1">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="leftImg wow fadeInLeft" data-wow-delay="0.4s"><img src="images/Graphics.jpg" alt="" /></div>
                            </div>
                            <div className="col-md-6 wow fadeInRight" data-wow-delay="0.4s">
                                <h2 className="mainHeading">Attention New York Landlords</h2>
                                <ul className="attentionList">
                                    <li>Under Newly passed NY Law, landlords are required to send notice to tenants under many new circumstances.</li>
                                    <li>Not sending notice could impact future eviction to the detriment of the landlord.</li>
                                    <li>Notice Tenant is a revolutionary web based platform for landlords to send and track all notices online, including ones requiring certified mail, and even in person delivery via a process server.</li>
                                    <li>Notice Tenant makes it easy to order, track, and monitor, with status updates and digital receipts, without ever having to leave your computer!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section2">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-4">
                                <div className="leftText wow fadeInLeft" data-wow-delay="0.2s">
                                    <h2 className="mainHeading">How it Works</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="workBlock d-flex">
                                    <div className="workBlockOne">
                                        <div className="workBox wow zoomIn" data-wow-delay="0.2s">
                                            <img src="images/icon-1.svg" alt="" />
                                            <h3>Lorem Ipsum is simply dummy text</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text</p>
                                        </div>
                                        <div className="workBox box2 wow zoomIn" data-wow-delay="0.8s">
                                            <img src="images/icon-1.svg" alt="" />
                                            <h3>Lorem Ipsum is simply dummy text</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text</p>
                                        </div>
                                    </div>
                                    <div className="workBlockTwo wow zoomIn" data-wow-delay="0.5s">
                                        <div className="workBox">
                                            <img src="images/icon-1.svg" alt="" />
                                            <h3>Lorem Ipsum is simply dummy text</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text</p>
                                        </div>
                                        <div className="workBox box2 wow zoomIn" data-wow-delay="1.1s">
                                            <img src="images/icon-1.svg" alt="" />
                                            <h3>Lorem Ipsum is simply dummy text</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section3">
                    <div className="container">
                        <div className="section3Content text-center">
                            <h3 className="textWhite wow fadeInUp" data-wow-delay="0.2s">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
                            <button type="button" className="Btn wow fadeInUp" data-wow-delay="0.6s">Contact Us</button>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        getStateSuccessRes: state.customers.getStateSuccessRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStateReq: (reqData) => dispatch(getStateReq(reqData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));