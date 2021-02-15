import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

class LeftPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {			
		};
	}
	render() {
		return (
			<div>
				<div className="dashboardLeft">
                    <ul className="leftMenu">
                        <li><a href="#" className="active">Notices</a></li>
                        <li><a href="#">Properties</a></li>
                        <li><a href="#">Tenants</a></li>
                    </ul>
					{/* <ul className="leftMenu nav nav-pills">
                        <li><a className="active" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Notices</a></li>
                        <li><a data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Properties</a></li>
                        <li><a data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Tenants</a></li>
                    </ul> */}
                </div>
            </div>
		);
	}
}

export default LeftPanel;
