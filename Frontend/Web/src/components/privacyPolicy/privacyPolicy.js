import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../common/header';
import Footer from '../common/footer';
import { getPrivacyPolicy } from '../../store/actions/customers'

import 'react-responsive-modal/styles.css';
import 'react-dropdown/style.css';

class PrivacyPolicy extends Component {
    state = {
        privacyPolicy: []
    }
    componentDidMount = async () => {
        await this.getPrivacyPolicy()
    }
    getPrivacyPolicy = async () => {
        await this.props.getPrivacyPolicy({})
        if (this.props.privacyPolicySuccessRes && this.props.privacyPolicySuccessRes.code == 1) {
            this.setState({ privacyPolicy: this.props.privacyPolicySuccessRes.data });

            console.log("privacyPolicy ==>>", this.state.privacyPolicy)
        }
    } 
    render() {
        return (
            <div>
                <Header />
                <section className="section1" style={{ padding: "31px 0 !important" }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-12 wow" data-wow-delay="0.4s">
                                <h2 className="FaqMainHeading mainHeading" style={{ textAlign: "center" }}>Privacy Policy</h2>
                                {
                                    this.state.privacyPolicy && this.state.privacyPolicy.length > 0
                                        ?
                                        this.state.privacyPolicy.map(terms => (<div style={{ padding: '20px', margin: '20px' }} dangerouslySetInnerHTML={{ __html: terms.description }}></div>))
                                        :
                                        null
                                }
                            </div>
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
        privacyPolicySuccessRes: state.customers.privacyPolicySuccessRes,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPrivacyPolicy: (reqData) => dispatch(getPrivacyPolicy(reqData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy));
