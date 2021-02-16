import React from "react";
import { NavLink } from 'react-router-dom';

import * as common from '../../utils/functions';
import config from '../../utils/config';
import routes from '../../Routes';
import logo from "../../images/logo.png"


function Header() {
    return (
        <header>
            <div className="logoSection">
                <div className="container">
                    <div className="logoContent d-flex align-items-center">
                        <NavLink className="logo" to={routes.HOME}><img src={logo} alt="logo" height='75px' /></NavLink>
                        <nav className="header">
                            <ul className="d-flex align-items-center snip menu">
                                <li><NavLink to={routes.FAQ}>Home</NavLink></li>
                                <li><NavLink to={routes.ABOUTUS}>Register Your Taxi</NavLink></li>
                                {localStorage.getItem(config.STORAGE_KEYS.AUTH_TOKEN) ?
                                    <li><a style={{ cursor: 'pointer' }} onClick={() => common.logout()}>Log Out,{localStorage.getItem('name')}</a></li>
                                    :
                                    <li className="signInUpBtn">
                                        <NavLink className="" to={routes.SIGNIN}>Sign In</NavLink>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
