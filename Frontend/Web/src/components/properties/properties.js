import React, { Component } from "react";

import { Dropdown } from 'primereact/dropdown';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

import Header2 from '../common/header2';
import Footer2 from '../common/footer2';
import LeftPanel from '../common/left-side-panel';

class Properties extends Component {
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
                
				<div className={this.state.toggle ? "slideToggle dashboardMain properties" : "dashboardMain properties"}>
                    <div className="container">
                        <div className="dashboardSectionMain d-flex">
                            <LeftPanel />
                            <div className="dashboardContent">                                
                                <div className="dashboardTable">
                                    <h2 className="mainHeading">
                                        Properties
                                    </h2>
                                    <div className="noticeMain">                                    
                                        <div className="mainTab">                                            
                                            <div className="noticeHeader d-flex justify-content-between align-items-center">
                                                <div className="headLeft">
                                                    <h2>Address</h2>
                                                    <p>9841 Old Fayetteville Rd, Fayetteville, NC, 28312</p>
                                                </div>
                                                <div className="cityDropdown unitDropdown">
                                                    <label>Unit:</label>
                                                    <div className="custom-select sources noCheck">
                                                        <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="Select Unit" />                    
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="noticeHeader d-flex justify-content-between align-items-center">
                                                <h2>Tenant Group</h2>
                                            </div>
                                            <div class="noticeTable">                                                                                       
                                                <table>  
                                                    <tr>
                                                        <th style={{width: '76px'}}>No</th>
                                                        <th>Name</th>
                                                    </tr>  
                                                    <tr>
                                                        <td>1</td>
                                                        <td>John Deo,  Jenifer Vintage, William Jem</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Avram Tarasios, Quintin Ed, </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>William Jem, Quintin Ed, Avram Tarasios</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>John Deo,  Jenifer Vintage, William Jem</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Avram Tarasios, Quintin Ed,</td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>William Jem, Quintin Ed, Avram Tarasios</td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>John Deo,  Jenifer Vintage, William Jem</td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>Avram Tarasios, Quintin Ed, </td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>William Jem, Quintin Ed, Avram Tarasios</td>
                                                    </tr>
                                                    <tr>
                                                        <td>10</td>
                                                        <td>John Deo,  Jenifer Vintage, William Jem</td>
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

export default Properties;
