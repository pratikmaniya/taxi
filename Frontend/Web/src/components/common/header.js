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
                    <nav class="navbar navbar-expand-lg navbar-dark logoContent d-flex align-items-center">
                        <NavLink className="logo" to={process.env.PUBLIC_URL + '/'}><img src={logo} alt="logo" height='75px' /></NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav d-flex align-items-center snip menu">
                                <li class="nav-item">
                                    <NavLink to={process.env.PUBLIC_URL + '/'}>Home</NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink to={process.env.PUBLIC_URL + '/register'}>Driver Registration</NavLink>
                                </li>
                                {(props.loginRes.data && props.loginRes.data.auth_token) || localStorage.getItem('RIDESAFETT-TOKEN') ?
                                    <li class="nav-item"><a style={{ cursor: 'pointer' }} onClick={() => common.logout()}>Log Out</a></li>
                                    :
                                    <li class="nav-item">
                                        <NavLink className="" to={process.env.PUBLIC_URL + '/signin'}>Register/SignIn</NavLink>
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>
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