import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

const Header2 = (props) => {
     
		return (
			<div>
				<header className="header2">
                    <div className="headerTop bgSky">
                        <div className="container">
                            <ul className="socialIcon d-flex">
                                <li>
                                    <a href="#"><img src="images/facebook-icon.svg" alt="" /></a>
                                </li>                                
                                <li>
                                    <a href="#"><img src="images/instagram-icon.svg" alt="" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="logoSection">
                        <div className="container">
                            <div className="logoContent d-flex align-items-center">
                                <button type="button" onClick={() => props.toggle()} className="toggleIcon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                                <NavLink className="logo" to={routes.HOME}><img src="images/logo.svg" alt="" /></NavLink>
                                <nav className="header">
                                    <input className="menu-btn" type="checkbox" id="menu-btn" /> <label className="menu-icon" htmlFor="menu-btn"><span className="navicon" /></label>
                                    <ul className="d-flex align-items-center snip menu">
                                        <li><a href="#">FAQs</a></li>                                       
                                        <li><a href="#">About Us</a></li>
                                        <li className="signInUpBtn">
                                            <NavLink className="" to={routes.SIGNIN}>Sign In</NavLink> / <NavLink className="" to={routes.SIGNUP}>Sign Up</NavLink>
                                        </li>
                                        {/* <li>
                                            <div class="user_dropdown">
                                                <a href="" class="userdropdownClick"><span class="">John Doe</span></a>
                                                <ul class="user_menu m-0 pullDown" style="display: none;">
                                                    <li class="active"><a href="#dashboard.html"><label>Dashboard</label></a></li>
                                                    <li><a href="profile-setting.html"><label>Profile Settings</label></a></li> 
                                                    <li><a href="sign-in.html"><label>Logout</label></a></li>
                                                </ul>
                                            </div>
                                        </li> */}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
		);
	}


export default Header2;
