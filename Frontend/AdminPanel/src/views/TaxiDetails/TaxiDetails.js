import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody, CardTitle, Row, Col, Table } from 'reactstrap';

import Img from 'react-image';

import { apiCall, displayLog, getFormatedDateFromTimeStamp } from '../../utils/common';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'

class Taxis extends Component {
    state = {
        taxiDetails: {}
    }
    async componentDidMount() {
        console.log(this.props.match.params.taxi_id)
        const response = await apiCall('GET', `taxi/${this.props.match.params.taxi_id}`);
        if (response && response.code === 1) {
            this.setState({ taxiDetails: response.data });
        } else {
            displayLog(0, response.message)
        }
    }
    activeClickHandler = async (driver, flag, index) => {
        console.log(driver, flag, index)
        let reqData = {
            driver_id: driver.id,
            flag: flag
        }
        let response = await apiCall('POST', 'driver', reqData);
        if (response.code === 1) {
            let drivers = this.state.taxiDetails.drivers;
            drivers[index].is_approved = flag;
            this.setState({ taxiDetails: { ...this.state.taxiDetails, drivers: [...drivers] } });
        }
        displayLog(response.code, response.message);
    }
    driverDetailsClickHandler = (driver_id) => {
        this.props.history.push(process.env.PUBLIC_URL + `/driver-details/${driver_id}`)
    }
    tableRow = (driver, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="align-middle">{driver.phone_no}</td>
                <td className="align-middle">{driver.first_name}</td>
                <td className="align-middle">{driver.last_name}</td>
                <td className="align-middle">{driver.driver_permit_number}</td>
                <td className="align-middle">{getFormatedDateFromTimeStamp(driver.created_date)}</td>
                <td className="align-middle text-center">
                    {
                        driver.is_approved === true
                            ?
                            <span className={"fa fa-toggle-on active action-icon"} title={"Deactivate Driver"} onClick={() => this.activeClickHandler(driver, false, index)}  ></span>
                            :
                            <span className={"fa fa-toggle-off active action-icon"} title={"Activate Driver"} onClick={() => this.activeClickHandler(driver, true, index)}  ></span>
                    }
                    <span className="fa fa-info-circle action-icon" title="View Driver Details" onClick={() => this.driverDetailsClickHandler(driver.id)} ></span>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <>
                <div className="animated fadeIn">
                    <Card>
                        <CardHeader>
                            <h4 className="card-header-custom">Taxi Details</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md='4' sm='12' style={{ textAlign: "center", borderRight: '1px solid #00000036', padding: '0 30px' }}>
                                    <div className="taxi-card-img-container">
                                        <label className="text-muted m-0">Vehicle Image</label>
                                        <Img
                                            className="taxi-card-img"
                                            src={this.state.taxiDetails.vehicle_image}
                                            loader={<img className="taxi-card-img loading-img" alt="taxi" src={loading_image} />}
                                            unloader={<img className="taxi-card-img" alt="taxi" title="No Image Found" src={default_img} />}
                                        />
                                    </div>
                                </Col>
                                <Col md='8' sm='12' className="taxi-details-container">
                                    <CardTitle style={{ fontSize: '28px' }}><span className="mb-2 text-muted">Plate Number: </span>{this.state.taxiDetails.plate_no}</CardTitle>
                                    <CardText style={{ fontSize: '18px' }}><span className="text-muted">Brand: </span>{this.state.taxiDetails.brand_name}</CardText>
                                    <CardText style={{ fontSize: '18px' }}><span className="text-muted">Model: </span>{this.state.taxiDetails.brand_model}</CardText>
                                    <CardText style={{ fontSize: '18px' }}><span className="text-muted">Colour: </span>{this.state.taxiDetails.colour}</CardText>
                                    <CardText style={{ fontSize: '18px' }}><span className="text-muted">Insurance Provider: </span>{this.state.taxiDetails.insurance_provider}</CardText>
                                    <CardText style={{ fontSize: '18px' }}><span className="text-muted">Registered on: </span>{getFormatedDateFromTimeStamp(this.state.taxiDetails.created_date)}</CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
                <div className="animated fadeIn">
                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-header-custom">Drivers</h4>
                                </CardHeader>
                                <CardBody>
                                    <Table bordered striped responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center">No</th>
                                                <th scope="col" className="align-middle">Phone Number</th>
                                                <th scope="col" className="align-middle">First Name</th>
                                                <th scope="col" className="align-middle">Last Name</th>
                                                <th scope="col" className="align-middle">Permit Number</th>
                                                <th scope="col" className="align-middle">Created date</th>
                                                <th scope="col" className="align-middle text-center">Approve/View Driver</th>
                                            </tr>
                                        </thead>
                                        {
                                            this.state.taxiDetails && this.state.taxiDetails.drivers && this.state.taxiDetails.drivers.length > 0
                                                ?
                                                <tbody>
                                                    {this.state.taxiDetails.drivers.map((driver, index) =>
                                                        this.tableRow(driver, index)
                                                    )}
                                                </tbody>
                                                :
                                                <tbody>
                                                    <tr className="text-center"><td colSpan={8}> No Data Found </td></tr>
                                                </tbody>
                                        }
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default Taxis;
