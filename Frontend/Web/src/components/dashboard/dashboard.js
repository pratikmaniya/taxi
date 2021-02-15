import React, { Component } from "react";

import { Dropdown } from 'primereact/dropdown';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

import Header2 from '../common/header2';
import Footer2 from '../common/footer2';
import LeftPanel from '../common/left-side-panel';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            selectedCity1: null
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

    componentDidMount() {        

        // Sticky Header    
        window.addEventListener('scroll', () => {
            var element = document.getElementById("body");
            element.classList.add("stickyHeader");
            if(window.scrollY === 0){
                element.classList.remove("stickyHeader");
            }
        });
    }
    toggle = () => {
        this.setState({toggle : !this.state.toggle})
    }

	render() {
        console.log(this.state)
		return (
			<div>               

                <Header2 
                    toggle={this.toggle}
                />                            
                                
                {/* <div className="col-9">
                    <div className="tab-content">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="">Slider One</div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel">Slider Two</div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel">Slider Three</div>                                    
                    </div>
                </div> */}                            
                
				<div className={this.state.toggle ? "slideToggle dashboardMain" : "dashboardMain"}>
                    <div className="container">
                        <div className="dashboardSectionMain d-flex">
                            
                            <LeftPanel />

                            <div className="dashboardContent">
                                <div className="dashboardHead d-flex justify-content-between">
                                    <h2>Dashboard</h2>
                                    <button type="button" className="smallBtn">Create New Notice</button>
                                </div>
                                <div className="dashboardTable">
                                    <div className="noticeMain">
                                        <div className="mainTab">
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="started-tab" data-toggle="tab" href="#started" role="tab" aria-controls="started" aria-selected="false">Started<span className="badge">2</span></a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="completed-tab" data-toggle="tab" href="#completed" role="tab" aria-controls="completed" aria-selected="false">Completed</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content subTab">
                                                <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                                                    <ul className="nav nav-tabs" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link active" id="notSent-tab" data-toggle="tab" href="#notSent" role="tab" aria-controls="notSent" aria-selected="true">Not Sent</a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" id="inProgress-tab" data-toggle="tab" href="#inProgress" role="tab" aria-controls="inProgress" aria-selected="false">Notices In Progress of Being Sent</a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" id="sent-tab" data-toggle="tab" href="#sent" role="tab" aria-controls="sent" aria-selected="false">Sent Notices</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div className="tab-pane fade show active" id="notSent" role="tabpanel" aria-labelledby="notSent-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '176px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '120px'}} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="inProgress" role="tabpanel" aria-labelledby="inProgress-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '146px'}}>Process Server Status</th>
                                                                            <th style={{width: '146px'}}>Certified Mail Status</th>
                                                                            <th style={{width: '120px'}}>Regular Mail Status</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="sent" role="tabpanel" aria-labelledby="sent-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th>premise Address</th>
                                                                            <th style={{width: '316px'}}>Type of Notice</th>
                                                                            <th style={{width: '120px'}} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="started" role="tabpanel" aria-labelledby="started-tab">
                                                    <ul className="nav nav-tabs" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link active" id="notSent2-tab" data-toggle="tab" href="#notSent2" role="tab" aria-controls="notSent2" aria-selected="true">Not Sent</a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" id="inProgress2-tab" data-toggle="tab" href="#inProgress2" role="tab" aria-controls="inProgress2" aria-selected="false">Notices In Progress of Being Sent</a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" id="sent2-tab" data-toggle="tab" href="#sent2" role="tab" aria-controls="sent2" aria-selected="false">Sent Notices</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div className="tab-pane fade show active" id="notSent2" role="tabpanel" aria-labelledby="notSent2-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '120px'}} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="inProgress2" role="tabpanel" aria-labelledby="inProgress2-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '146px'}}>Process Server Status</th>
                                                                            <th style={{width: '146px'}}>Certified Mail Status</th>
                                                                            <th style={{width: '120px'}}>Regular Mail Status</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="sent2" role="tabpanel" aria-labelledby="sent2-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '120px'}} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="completed-tab">
                                                    <ul className="nav nav-tabs" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link active" id="notSent3-tab" data-toggle="tab" href="#notSent3" role="tab" aria-controls="notSent3" aria-selected="true">Not Sent</a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" id="inProgress3-tab" data-toggle="tab" href="#inProgress3" role="tab" aria-controls="inProgress3" aria-selected="false">Notices In Progress of Being Sent</a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a className="nav-link" id="sent3-tab" data-toggle="tab" href="#sent3" role="tab" aria-controls="sent3" aria-selected="false">Sent Notices</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div className="tab-pane fade show active" id="notSent3" role="tabpanel" aria-labelledby="notSent3-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '120px'}} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="inProgress3" role="tabpanel" aria-labelledby="inProgress3-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '146px'}}>Process Server Status</th>
                                                                            <th style={{width: '146px'}}>Certified Mail Status</th>
                                                                            <th style={{width: '120px'}}>Regular Mail Status</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="pending">Pending</td>
                                                                            <td className="last pending">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="sent3" role="tabpanel" aria-labelledby="sent3-tab">
                                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                                <h2>Not Sent</h2>
                                                            </div>
                                                            <div className="noticeTable">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th style={{width: '192px'}}><span className="arrow">Tenant/s</span></th>
                                                                            <th><span className="arrow">Landlord</span></th>
                                                                            <th style={{width: '220px'}}>premise Address</th>
                                                                            <th>Type of Notice</th>
                                                                            <th style={{width: '120px'}} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Alice N Smith</td>
                                                                            <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Joe Smith</td>
                                                                            <td>21964 S 1900th Rd, Milo, MO, 64767</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Ross Smith</td>
                                                                            <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Allen Smith</td>
                                                                            <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Luis Smith</td>
                                                                            <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53154</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>June W Smith</td>
                                                                            <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                                            <td>Failure of rent payment within 5 days</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>J Smith</td>
                                                                            <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                                            <td>Expiration of lease of rent increase</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>Ej Johnson</td>
                                                                            <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                                            <td>14 Day Notice to Quit</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Alice, Joe, Ross, Allen</td>
                                                                            <td>Arthur C Smith</td>
                                                                            <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Luis, June, Johnson, Arthur</td>
                                                                            <td>I Johnson</td>
                                                                            <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                                            <td>30 Day Notice to cure/Quit for Non-Compliance</td>
                                                                            <td className="last">
                                                                                <button type="button" className="BtnSmall">Send</button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <Footer2 />
                        </div>
                    </div>
                </div>                
            </div>
		);
	}
}

export default Dashboard;
