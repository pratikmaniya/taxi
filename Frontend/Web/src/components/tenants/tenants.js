import React, { Component } from "react";

import { Dropdown } from 'primereact/dropdown';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

import Header2 from '../common/header2';
import Footer2 from '../common/footer2';
import LeftPanel from '../common/left-side-panel';

class Tenants extends Component {
	constructor(props) {
		super(props);
		this.state = {	
            // selectedCity1: null
        };
        // this.cities = [
        //     { name: 'New York', code: 'NY' },
        //     { name: 'Rome', code: 'RM' },
        //     { name: 'London', code: 'LDN' },
        //     { name: 'Istanbul', code: 'IST' },
        //     { name: 'Paris', code: 'PRS' }
        // ];
        // this.onCityChange = this.onCityChange.bind(this);        
    }
    
    // onCityChange(e) {
    //     this.setState({ selectedCity1: e.value });
    // }

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
                
				<div className={this.state.toggle ? "slideToggle dashboardMain" : "dashboardMain"}>
                    <div className="container">
                        <div className="dashboardSectionMain d-flex">
                            <LeftPanel />
                            <div className="dashboardContent">                                
                                <div className="dashboardTable">
                                    <div className="noticeMain">
                                        <div className="mainTab">
                                            <div class="noticeHeader d-flex justify-content-between align-items-center">
                                                <h2>Tenants</h2>
                                            </div>
                                            <div class="noticeTable">                                                                                       
                                                <table>  
                                                    <tr>
                                                        <th><span class="arrow">First Name</span></th>
                                                        <th><span class="arrow">Last Name</span></th>
                                                        <th><span class="arrow">Premise Address</span></th>
                                                    </tr>  
                                                    <tr>
                                                        <td>Alice</td>
                                                        <td>Smith</td>
                                                        <td>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</td>                                                            
                                                    </tr>
                                                    <tr>
                                                        <td>Joe</td>
                                                        <td>Smith</td>
                                                        <td>21964 S 1900th Rd, Milo, MO, 64767</td>                                                            
                                                    </tr>
                                                    <tr>
                                                        <td>Ross</td>
                                                        <td>Vintage</td>
                                                        <td>1801 N R Ave, Tahoka, TX, 79373</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Allen</td>
                                                        <td>Jones</td>
                                                        <td>1872 Old Whiteville Rd, Lumberton, NC, 28358</td>                                                            
                                                    </tr>
                                                    <tr>
                                                        <td>Luis</td>
                                                        <td>Smith</td>
                                                        <td>175 Rainbow Ridge #APT 1001, Oak Creek, WI, 53</td>
                                                    </tr>
                                                    <tr>
                                                        <td>June</td>
                                                        <td>Deo</td>
                                                        <td>5989 Chickasaw Ln, Braselton, GA, 30517</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jams</td>
                                                        <td>Smith</td>
                                                        <td>3 Whitehorse Rd, Hingham, MA, 02043</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Piter</td>
                                                        <td>Johnson</td>
                                                        <td>5820 Eastman Ave, Midland, MI, 48640</td>
                                                    </tr>
                                                    <tr>
                                                        <td>John</td>
                                                        <td>Smith</td>
                                                        <td>716 Beaver Rd, Glenview, IL, 60025</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Lue</td>
                                                        <td>Vintage</td>
                                                        <td>18246 110th Ave NE, Thief River Falls, MN, 56701</td>
                                                    </tr>                                                    
                                                </table>
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

export default Tenants;
