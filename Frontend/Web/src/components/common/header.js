import React from "react";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as common from '../../utils/functions';
import logo from "../../images/logo.png"

function Header(props) {
    return (
        <header>
            <div className="logoSection">
                <div className="container">
                    <div className="logoContent d-flex align-items-center">
                        <NavLink className="logo" to={process.env.PUBLIC_URL + '/'}><img src={logo} alt="logo" height='75px' /></NavLink>
                        <nav className="header">
                            <ul className="d-flex align-items-center snip menu">
                                <li><NavLink to={process.env.PUBLIC_URL + '/'}>Home</NavLink></li>
                                <li><NavLink to={process.env.PUBLIC_URL + '/register'}>Register Taxi</NavLink></li>
                                {(props.loginRes.data && props.loginRes.data.auth_token) || localStorage.getItem('INCOOGNITO-TOKEN') ?
                                    <li><a style={{ cursor: 'pointer' }} onClick={() => common.logout()}>Log Out</a></li>
                                    :
                                    <li className="signInUpBtn">
                                        <NavLink className="" to={process.env.PUBLIC_URL + '/signin'}>Sign In</NavLink>
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

const mapStateToProps = state => {
    return {
        loginRes: state.reducer.loginRes,
    }
}

export default withRouter(connect(mapStateToProps)(Header));