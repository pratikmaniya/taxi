import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Button, Input } from 'reactstrap';
import Joi from 'joi-browser';
import { withRouter, Link } from 'react-router-dom';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import XLSX from 'xlsx'

import * as common from '../utils/common';
import { validateSchema, formValueChangeHandler, apiCall, displayLog, confirmBox } from '../utils/common';
import loading_img from '../assets/images/loading_img.png'
import Dialog from './Dialog';
import config from '../config';
import store from '../utils/store'
import * as actionTypes from '../store/actionTypes'

class DefaultHeader extends Component {
  state = {
    isDialogOpen: false,
    modalSize: "md",
    modalTitle: "",
    modalBody: "",
    modalBodyFooter: "",
    modalFooter: "",
    form: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    csv_file: "",
    error: {
      status: false,
      message: ''
    },
    processStatus: false
  }

  async componentDidMount() {
    const res = await fetch(config.API_BASE_URL + 'getStatusOfData');
    const blocks = await res.json();
    if (blocks.data.status) {
      this.setState({ processStatus: blocks.data.status })
      this.setTimer();
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
      csv_file: "",
      modalTitle: "",
      modalBody: "",
      modalBodyFooter: "",
      modalFooter: "",
      error: {
        status: false,
        message: ''
      }
    })
  }
  fileSelectHandler = (event) => {
    const validColumnNames = ["Vehicle Type", "Brand", "Year", "Model", "Trim"]
    if (event.target.files && event.target.files[0]) {
      store.dispatch({
        type: actionTypes.START_LOADER
      })
      let reader = new FileReader(), file = event.target.files[0]
      reader.readAsBinaryString(event.target.files[0])
      reader.onloadend = (e) => {
        if (e.target.readyState === FileReader.DONE) {
          let workbook = XLSX.read(e.target.result, { type: "binary" }),
            json = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)
          console.log(Object.keys(json[0]))
          if (Object.keys(json[0]).every(columnName => validColumnNames.includes(columnName))) {
            let html = XLSX.utils.sheet_to_html(workbook.Sheets.Sheet1)
            html = <div>
              <h6 style={{ color: 'red' }}>{file.name}</h6>
              <p style={{ fontWeight: 400 }}>Data to be updated:</p>
              <div className="csv-table-container" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            this.setState({ csv_file: file, modalBodyFooter: html });
            store.dispatch({
              type: actionTypes.STOP_LOADER
            })
          } else {
            store.dispatch({
              type: actionTypes.STOP_LOADER
            })
            displayLog(0, "Invalid file structure, Please select file with valid structure!")
          }
          store.dispatch({
            type: actionTypes.STOP_LOADER
          })
        }
      }
    }
  }
  isDialogOpenHandler = (flag, modalIsFor) => {
    let modalTitle, modalBody, modalFooter, modalSize = "md"
    if (modalIsFor === "CP") {
      modalTitle = "Change Password"
      modalBody = <form>
        <Input className="cp-dialog-input" type="password" name="oldPassword" id="oldPassword" value={this.state.form.oldPassword} onChange={this.inputChangeHandler} placeholder="Old Password" />
        <Input className="cp-dialog-input" type="password" name="newPassword" id="newPassword" value={this.state.form.newPassword} onChange={this.inputChangeHandler} placeholder="New Password" />
        <Input className="cp-dialog-input" type="password" name="confirmPassword" id="confirmPassword" value={this.state.form.confirmPassword} onChange={this.inputChangeHandler} placeholder="Confirm Password" />
      </form>
      modalFooter = <React.Fragment>
        <Button color="secondary" className="black-btn" onClick={this.submitClickHandler}>Submit</Button>{' '}
        <Button color="secondary" className="black-btn" onClick={() => this.isDialogOpenHandler(false)}>Cancel</Button>
      </React.Fragment>
    } else if (modalIsFor === "ID") {
      modalSize = "lg"
      modalTitle = "Select CSV File"
      modalBody = <form>
        <div>
          <label className="custom-file-upload-btn csv-dialog-btn" title="Upload CSV to import">
            <span className="fa fa-picture-o"></span>&nbsp;Upload a file
            <input type="file" accept=".csv" name="csv_file" id="csv_file" onChange={this.fileSelectHandler} />
          </label>
          <a className="custom-file-upload-btn csv-dialog-btn" href={config.SampleCSVURL} title="Download sample CSV" target="_blank" rel="noopener noreferrer">
            <span className="fa fa-download"></span> Get Sample
          </a>
        </div>
      </form>
      modalFooter = <React.Fragment>
        <Button color="secondary" className="black-btn" onClick={this.submitFileClickHandler}>Submit</Button>{' '}
        <Button color="secondary" className="black-btn" onClick={() => this.isDialogOpenHandler(false)}>Cancel</Button>
      </React.Fragment>
    }
    this.resetChangeFormState();
    this.setState({ isDialogOpen: flag, modalSize: modalSize, modalTitle: modalTitle, modalBody: modalBody, modalFooter: modalFooter })
  }

  async setTimer() {
    try {
      this.myInterval = setInterval(async () => {
        const res = await fetch(config.API_BASE_URL + 'getStatusOfData');
        const blocks = await res.json();
        if (!blocks.data.status) {
          this.setState({ processStatus: blocks.data.status })
          clearInterval(this.myInterval);
          confirmBox('Moto-Logs', "Data from Excel sheet added successfully.");
        }
      }, 1000);
    } catch (e) {
      clearInterval(this.myInterval);
      console.log('IN CACH', e);
    }
  }
  submitFileClickHandler = async () => {
    if (typeof this.state.csv_file === "string") {
      displayLog(0, "Please select file")
    } else {
      let data = new FormData()
      data.append("excel_sheet", this.state.csv_file)
      await apiCall('POST', 'importExcelSheet', data, undefined, undefined, 'blob')
        .then(res => {
          displayLog(res.code, res.message);
          if (res.code === 1) {
            this.setState({ processStatus: true })
            this.isDialogOpenHandler(false, "ID")
            this.setTimer();
          }
        })
      // this.resetChangeFormState();
      // this.props.history.go(0)
    }
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
          size={this.state.modalSize}
          modalTitle={this.state.modalTitle}
          modalBody={this.state.modalBody}
          modalBodyFooter={this.state.modalBodyFooter}
          modalFooter={this.state.modalFooter}
          isModalOpen={this.state.isDialogOpen}
          toggle={this.isDialogOpenHandler}
        />
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Link style={{textDecoration:"none"}} to={process.env.PUBLIC_URL + "/dashboard"}>
          {/* <AppNavbarBrand
            tag="span"
            full={{ src: logo, width: 100, alt: 'motologs Logo' }}
            minimized={{ src: loading_img, alt: 'motologs Logo' }}
          /> */}
          <h3 className="main-header">LOGGY</h3>
        </Link>
        <AppSidebarToggler className="d-md-down-none disable-outline" display="lg" />

        <Nav className="ml-auto" navbar>
          {
            this.state.processStatus &&
            <div>
              <span className="uploadData">Csv file uploading....</span>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>

          }

          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="fas fa-chevron-down"></i>
            </DropdownToggle>

            <DropdownMenu right>
              <DropdownItem onClick={() => this.isDialogOpenHandler(true, "CP")}><i className="fa fa-key"></i> Change Password</DropdownItem>
              <DropdownItem onClick={() => this.isDialogOpenHandler(true, "ID")} disabled={this.state.processStatus}><i className="fa fa-download"></i> Import Data</DropdownItem>
              <DropdownItem onClick={event => this.props.onLogout(event)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

      </React.Fragment >
    );
  }
}

export default withRouter(DefaultHeader);