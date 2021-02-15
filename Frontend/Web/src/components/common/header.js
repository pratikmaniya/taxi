import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import * as common from '../../utils/functions';
import { STORAGE_KEYS, LANGUAGE, APP_NAME } from '../../utils/constants';
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
                                {localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ?
                                    <ul class="navbar-nav">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {localStorage.getItem('name')}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <a class="dropdown-item" href="javascript:void(0)" onClick={() => common.logout()}>Log Out</a>
                                            </div>
                                        </li>
                                    </ul>
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
