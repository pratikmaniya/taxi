import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../common/header';
import Footer from '../common/footer';
import { getTermsOfUse } from '../../store/actions/customers'

import 'react-responsive-modal/styles.css';
import 'react-dropdown/style.css';

class TermsOfUse extends Component {
    state = {
        termsOfUse: []
    }
    componentDidMount = async () => {
        await this.getTermsOfUse()
    }
    getTermsOfUse = async () => {
        await this.props.getTermsOfUse({})
        if (this.props.termsOfUseSuccessRes && this.props.termsOfUseSuccessRes.code == 1) {
            this.setState({ termsOfUse: this.props.termsOfUseSuccessRes.data });

            console.log("termsOfUse ==>>", this.state.termsOfUse)
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
                                <h2 className="FaqMainHeading mainHeading" style={{ textAlign: "center" }}>Terms of Use</h2>
                                {
                                    this.state.termsOfUse && this.state.termsOfUse.length > 0
                                        ?
                                        this.state.termsOfUse.map(terms => (<div style={{ padding: '20px', margin: '20px' }} dangerouslySetInnerHTML={{ __html: terms.description }}></div>))
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
        termsOfUseSuccessRes: state.customers.termsOfUseSuccessRes,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTermsOfUse: (reqData) => dispatch(getTermsOfUse(reqData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TermsOfUse));
