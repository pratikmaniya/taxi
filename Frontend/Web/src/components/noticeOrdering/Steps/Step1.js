import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';

import { getStateReq } from '../../../store/actions/customers';
import { getNoticesReq } from '../../../store/actions/noticeOrdering';

class Step1 extends Component {
    state = {
        stateList: [],
        selectedState: null,
        notices: []
    }
    async componentDidMount() {
        await this.getState()
        await this.getNotices()
    }
    getState = async () => {
        let reqData = {
            getAllStateListNames: "TRUE",
            page_no: 1,
            limit: 10
        }
        await this.props.getStateReq(reqData)
        if (this.props.getStateSuccessRes && this.props.getStateSuccessRes.code == 1) {
            this.setState({ stateList: this.props.getStateSuccessRes.data, selectedState: this.props.getStateSuccessRes.data.find(state => (state.id === this.props.location.state.stateId)) })
        }
    }
    getNotices = async () => {
        let reqData = {
            state_id: this.state.selectedState.id
        }
        await this.props.getNoticesReq(reqData)
        if (this.props.getNoticesSuccessRes && this.props.getNoticesSuccessRes.code == 1) {
            this.setState({ notices: this.props.getNoticesSuccessRes.data.notice })
        }
    }
    onStateChange = async e => {
        await this.setState({ selectedState: e.value })
        await this.getNotices()
    }
    render() {
        console.log(this.state)
        if (this.props.currentStep !== 1) {
            return null
        }
        return (
            <div className="form-group">
                <div className="numbering">
                    <ul className="d-flex">
                        <li className="select d-flex flex-wrap justify-content-center text-center"> <span>1</span> <label>Select Notice</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>2</span> <label>Lessor Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>3</span> <label>Premises Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>4</span> <label>Tenant Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>5</span> <label>Notice Information</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>6</span> <label>review &amp; sign</label></li>
                        <li className="d-flex flex-wrap justify-content-center text-center"> <span>7</span> <label>Send or Download</label></li>
                    </ul>
                </div>
                <div className="noticeMain">
                    <div className="noticeHeader d-flex justify-content-between align-items-center">
                        <h2>Select Notice Type <span>(As per State)</span></h2>
                        <div className="cityDropdown">
                            <div className="custom-select sources noCheck">
                                <Dropdown value={this.state.selectedState} options={this.state.stateList} onChange={this.onStateChange} optionLabel="name" placeholder="Select State" />
                            </div>
                        </div>
                    </div>
                    <div className="noticeTable">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Type of Notice</th>
                                    <th>Required Delivery Method</th>
                                    <th className="text-center">Prerequisites/Requirements</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>Failure of rent payment with in 5 days</td>
                                    <td>Certified Mail</td>
                                    <td className="text-center">
                                        <div className="notification">
                                            <img src="images/notification-icon.svg" />
                                            <div className="noteText">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>

                                    </td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Expiration of Lease of Rent Increase</td>
                                    <td>Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td></td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>14 Days Notice to quit</td>
                                    <td> Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td className="text-center">
                                        <div className="notification">
                                            <img src="images/notification-icon.svg" />
                                            <div className="noteText">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>

                                    </td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>30 Days Notice to cure / quit for Non-Compliance</td>
                                    <td>Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td></td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>30 Days Notice to quit from Month to Month tenancy</td>
                                    <td>Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td></td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Failure of rent payment with in 5 days</td>
                                    <td>Certified Mail</td>
                                    <td className="text-center">
                                        <div className="notification">
                                            <img src="images/notification-icon.svg" />
                                            <div className="noteText">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Expiration of Lease of Rent Increase</td>
                                    <td>Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td className="text-center">
                                        <div className="notification">
                                            <img src="images/notification-icon.svg" />
                                            <div className="noteText">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>14 Days Notice to quit</td>
                                    <td>Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td></td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>30 Days Notice to cure / quit for Non-Compliance</td>
                                    <td>Certified Mail, Regular Mail &amp; Process server delivery</td>
                                    <td className="text-center">
                                        <div className="notification">
                                            <img src="images/notification-icon.svg" />
                                            <div className="noteText">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="last d-flex justify-content-end">
                                        <button type="button" className="BtnSmall">Preview</button>
                                        <button type="button" className="BtnSmall">Select</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        getStateSuccessRes: state.customers.getStateSuccessRes,
        getNoticesSuccessRes: state.noticeOrdering.getNoticesSuccessRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStateReq: (reqData) => dispatch(getStateReq(reqData)),
        getNoticesReq: (reqData) => dispatch(getNoticesReq(reqData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Step1))