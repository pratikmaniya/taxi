import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';
import * as common from '../../utils/functions';
import { STORAGE_KEYS, LANGUAGE, APP_NAME } from '../../utils/constants';
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {			
		};
	}
	render() {
		return (
			<div>
				<header>
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
                                <NavLink className="logo" to={routes.HOME}><img src="images/logo.svg" alt="" /></NavLink>
                                <nav className="header">
                                    <input className="menu-btn" type="checkbox" id="menu-btn" /> <label className="menu-icon" htmlFor="menu-btn"><span className="navicon" /></label>
                                    <ul className="d-flex align-items-center snip menu">
                                        {/* <li><a href="#">FAQs</a></li>   */}
                                        <li><NavLink to={routes.FAQ}>FAQs</NavLink></li>                                   
                                        <li><NavLink to={routes.ABOUTUS}>About Us</NavLink></li>
                                        {localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ?
                                            // <li className="signInUpBtn">
                                            // <NavLink className="" to={routes.PROFILESETTING}>Profile</NavLink>
                                            // </li>
                                            //  <div class="collapse navbar-collapse" id="navbar-list-4">
                                             <ul class="navbar-nav">
                                                 <li class="nav-item dropdown">
                                                 <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                   {/* AAA<img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle"></img> */}
                                                   {localStorage.getItem('name')}
                                                 </a>
                                                 <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                   {/* <a class="dropdown-item" href="#">Dashboard</a> */}
                                                   <NavLink class="dropdown-item" to={routes.PROFILESETTING}>Edit Profile</NavLink>
                                                   <a class="dropdown-item" href="javascript:void(0)" onClick={() => common.logout()}>Log Out</a>
                                                 </div>
                                               </li>   
                                             </ul>
                                        //    </div>
                                        :
                                            <li className="signInUpBtn">
                                            <NavLink className="" to={routes.SIGNIN}>Sign In</NavLink> / <NavLink className="" to={routes.SIGNUP}>Sign Up</NavLink>
                                            </li>
                                        }
                                                                                
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
		);
	}
}

export default Header;
