import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Button, Input } from 'reactstrap';
import Joi from 'joi-browser';
import { withRouter, Link } from 'react-router-dom';
import { AppSidebarToggler,AppNavbarBrand } from '@coreui/react';

import * as common from '../utils/common';
import { validateSchema, formValueChangeHandler, apiCall, displayLog } from '../utils/common';
import Dialog from './Dialog';

class DefaultHeader extends Component {
  state = {
    isDialogOpen: false,
    form: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    error: {
      status: false,
      message: ''
    }
  }
  resetChangeFormState() {
    this.setState({
      isDialogOpen: false,
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      error: {
        status: false,
        message: ''
      }
    })
  }
  isDialogOpenHandler = (flag) => {
    this.resetChangeFormState();
    this.setState({ isDialogOpen: flag })
  }
  submitClickHandler = async () => {
    let schema = Joi.object().keys({
      oldPassword: Joi.string().strict().trim().min(6).label('Old Password').required(),
      newPassword: Joi.string().strict().trim().min(6).label('New Password').required(),
      confirmPassword: Joi.string().strict().trim().min(6).label('Confirm Password').required()
    })
    this.setState({ error: await validateSchema(this.state.form, schema) });
    if (this.state.form.newPassword !== this.state.form.confirmPassword) {
      common.displayLog(0, 'New Password and confirm password must be same!');
      this.setState({
        error: {
          status: true,
          message: 'New Password and confirm password must be same!'
        }
      });
    }
    if (!this.state.error.status) {
      let data = {
        old_password: this.state.form.oldPassword,
        new_password: this.state.form.newPassword,
        confirm_new_password: this.state.form.confirmPassword
      }
      const response = await apiCall('POST', 'changePassword', data);
      displayLog(response.code, response.message);
      this.resetChangeFormState();
    } else {
      displayLog(0, this.state.error.message);
    }
  }
  inputChangeHandler = (event) => {
    this.setState({ form: formValueChangeHandler(event, this.state.form) });
  }
  render() {
    return (
      <React.Fragment>
        <Dialog
          size="md"
          modalTitle="Change Password"
          modalBody={<form>
            <Input className="cp-dialog-input" type="password" name="oldPassword" id="oldPassword" value={this.state.form.oldPassword} onChange={this.inputChangeHandler} placeholder="Old Password" />
            <Input className="cp-dialog-input" type="password" name="newPassword" id="newPassword" value={this.state.form.newPassword} onChange={this.inputChangeHandler} placeholder="New Password" />
            <Input className="cp-dialog-input" type="password" name="confirmPassword" id="confirmPassword" value={this.state.form.confirmPassword} onChange={this.inputChangeHandler} placeholder="Confirm Password" />
          </form>}
          modalFooter={<React.Fragment>
            <Button color="secondary" className="black-btn" onClick={this.submitClickHandler}>Submit</Button>{' '}
            <Button color="secondary" className="black-btn" onClick={() => this.isDialogOpenHandler(false)}>Cancel</Button>
          </React.Fragment>}
          isModalOpen={this.state.isDialogOpen}
          toggle={this.isDialogOpenHandler}
        />
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Link style={{ textDecoration: "none" }} to={process.env.PUBLIC_URL + "/taxis"}>
          <AppNavbarBrand
            tag="span"
            full={{ src: 'https://taxi-review.s3-us-west-1.amazonaws.com/logo.png', width: 100, alt: 'motologs Logo' }}
            minimized={{ src: 'https://taxi-review.s3-us-west-1.amazonaws.com/logo.png', alt: 'motologs Logo' }}
          />
          {/* <h3 className="main-header">INCOOGNITO</h3> */}
        </Link>
        <AppSidebarToggler className="d-md-down-none disable-outline" display="lg" />
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="fas fa-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => this.isDialogOpenHandler(true, "CP")}><i className="fa fa-key"></i> Change Password</DropdownItem>
              <DropdownItem onClick={event => this.props.onLogout(event)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment >
    );
  }
}

export default withRouter(DefaultHeader);