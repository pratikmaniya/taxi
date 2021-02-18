import React, { Component } from "react";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {			
		};
	}
	render() {
		return (
			<div>
				<footer>
                    <div className="container">
                        <div className="footerContent">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="footerTaxi">
                                        <h3 className="textWhite">Taxi</h3>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <ul className="footerSocialIcon d-flex">
                                            <li>
                                                <a href="#"><i className="fab fa-facebook-f" /></a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fab fa-instagram" /></a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fab fa-linkedin-in" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    {/* <h4 className="textWhite">Others</h4>
                                    <ul className="others">
                                        <li><a href="#">Process Server Login</a></li>
                                    </ul> */}
                                </div>
                                <div className="col-lg-3 contactBlock">
                                    <h4 className="textWhite">Contact Us</h4>
                                    <ul className="others contactUs">
                                        <li className="d-flex"><img src="images/location.svg" alt="" /><a href="#">10 Mohol, New york, NY, 25365 USA</a></li>
                                        <li className="d-flex"><img src="images/phone.svg" alt="" /><a href="#">Support: +1 (516) 231 1313</a></li>
                                        <li className="d-flex"><img src="images/mail.svg" alt="" /><a href="#">Email: info@yourmail.com</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-7"><p>Copyrights © 2020 Taxi. All rights reserved.</p></div>
                                <div className="col-md-5">
                                    <ul className="footerMenu d-flex">
                                        <li><a href={process.env.PUBLIC_URL + "/privacy-policy"}>Privacy Policy</a></li>
                                        <li><a href={process.env.PUBLIC_URL + "/terms-of-use"}>Terms of Use</a></li>
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

export default Footer;
