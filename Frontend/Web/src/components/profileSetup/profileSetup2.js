import React, { Component } from "react";

import { Dropdown } from 'primereact/dropdown';

import Header from '../common/header';
import Footer2 from '../common/footer2';

class ProfileSetup2 extends Component {
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

	render() {
		return (
			<div>
                <Header />   
				<div className="signIn profileSetup">
                    <div className="signInContent">
                        <form>
                            <h1 className="mainHeading">Profile Set Up</h1>
                            <div className="fieldset">
                                <label>Your Company Name</label>
                                <input type="text" placeholder />
                            </div>
                            <h6 className="mt-4">Company Address</h6>
                            <div className="fieldset">
                                <label>Street 1</label>
                                <input type="text" placeholder />
                            </div>
                            <div className="fieldset">
                                <label>Street 2</label>
                                <input type="text" placeholder />
                            </div>
                            <div className="fieldset">
                                <label>State</label>
                                <div className="selectOption">
                                    <div className="custom-select sources noCheck">
                                        <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="" />                    
                                    </div>
                                </div>
                            </div>
                            <div className="twoField d-flex justify-content-between">
                                <div className="fieldset">
                                    <label>City</label>
                                    <div className="selectOption">
                                        <div className="custom-select sources noCheck">
                                            <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="" />                    
                                        </div>
                                    </div>
                                </div>
                                <div className="fieldset">
                                    <label>Zip Code</label>
                                    <input type="text" placeholder />
                                </div>
                            </div>
                            <div className="fieldset">
                                <label>Phone Number</label>
                                <input type="text" placeholder />
                            </div>
                            <div className="btnGroup d-flex justify-content-center">
                                <button type="button" className="smallBtn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer2/>
            </div>
		);
	}
}

export default ProfileSetup2;
