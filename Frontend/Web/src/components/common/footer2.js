import React, { Component } from "react";

class Footer2 extends Component {
	constructor(props) {
		super(props);
		this.state = {			
		};
	}
	render() {
		return (
			<div>
				<footer className="footer2">
                    <div className="container">
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-7">
                                    <p>Copyrights © 2020 Notice Tenant. All rights reserved.</p>                            
                                </div>
                                <div className="col-md-5">
                                    <ul className="footerMenu d-flex">
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Terms of Use</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
		);
	}
}

export default Footer2;
