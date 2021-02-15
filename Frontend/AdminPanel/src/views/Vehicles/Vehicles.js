import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import Img from 'react-image';
import { connect } from 'react-redux';

import Dialog from '../../DefaultLayout/Dialog'
import { apiCall, getFormatedDateFromTimeStamp } from '../../utils/common';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'
import { getDialogBody } from './VehiclesFunctions'
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';

class Vehicles extends Component {
    state = {
        vehicles: [],
        totalItemCount: '',
        isDialogOpen: false,
        selected_vehicle: {},
        page_no: this.props.global_page_no,
        limit: this.props.global_page_no
    }
    getVehicles = async (data) => {
        let response = await apiCall('POST', 'getAllvehicles', data);
        this.setState({ vehicles: response.data.vehicles, totalItemCount: response.data.total_vehicles });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        }
        this.getVehicles(data)
        this.setState({
            page_no: this.props.global_page_no,
            limit: this.props.global_limit,
        })
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.global_page_no !== this.props.global_page_no
            || prevProps.global_limit !== this.props.global_limit) {
            let data = {
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            }
            await this.getVehicles(data);
            this.setState({
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            })

        }
    }
    isDialogOpenHandler = async (flag, vehicle_id) => {
        let selected_vehicle = {}
        if (flag) {
            let data = {
                vehicle_id: vehicle_id
            }
            let response = await apiCall('POST', 'getSinglevehicle', data);
            selected_vehicle = response.data
        }
        this.setState({ isDialogOpen: flag, selected_vehicle: selected_vehicle })
    }
    changeLimitHandler = event => {
        store.dispatch({
            type: actionTypes.SET_PAGE_NO,
            page_no: 1
        })
        store.dispatch({
            type: actionTypes.SET_PAGE_LIMIT,
            limit: event.target.value
        })
    }
    handlePageChange = pageNumber => {
        store.dispatch({
            type: actionTypes.SET_PAGE_NO,
            page_no: pageNumber
        })
    }
    tableRow = (vehicle, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{(this.state.page_no - 1) * this.state.limit + index + 1}</td>
                <td className="align-middle">
                    <Img
                        className="table-cell-img"
                        src={vehicle.vehicle_image}
                        loader={<img className="table-cell-img loading-img" alt="motologs" src={loading_image} />}
                        unloader={<img className="table-cell-img" alt="motologs" title="No Image Found" src={default_img} />}
                    />
                </td>
                <td className="align-middle">{vehicle.model ? vehicle.model : vehicle.custom_model ? vehicle.custom_model + "(custom)" : "N/A"}</td>
                <td className="align-middle">{vehicle.brand}</td>
                <td className="align-middle">{vehicle.vehicle_type}</td>
                <td className="align-middle">{vehicle.year}</td>
                <td className="align-middle">{getFormatedDateFromTimeStamp(vehicle.created_date)}</td>
                <td className="align-middle">
                    <span className="fa fa-info-circle action-icon" title="View Vehicle Details" onClick={() => this.isDialogOpenHandler(true, vehicle.id)} ></span>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-header-custom">Vehicles</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-right">
                                    <Col sm="12" md="6" xl="4" className="mb-3 mb-xl-0">
                                        <Input type="select" name="type" className="w-25" onChange={(event) => { this.changeLimitHandler(event) }} value={this.props.global_limit} >
                                            <option value="10"> 10 </option>
                                            <option value="20"> 20 </option>
                                            <option value="30"> 30 </option>
                                        </Input>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody>
                                <Table bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">No</th>
                                            <th scope="col" className="align-middle">Image</th>
                                            <th scope="col" className="align-middle">Model</th>
                                            <th scope="col" className="align-middle">Brand</th>
                                            <th scope="col" className="align-middle">Vehicle type</th>
                                            <th scope="col" className="align-middle">Year</th>
                                            <th scope="col" className="align-middle">Created date</th>
                                            <th scope="col" className="align-middle">Actions</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.vehicles.length > 0
                                            ?
                                            <tbody>
                                                {this.state.vehicles.map((vehicle, index) =>
                                                    this.tableRow(vehicle, index)
                                                )}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className="text-center"><td colSpan={8}> No Data Found </td></tr>
                                            </tbody>
                                    }
                                </Table>
                                {
                                    this.state.vehicles.length > 0
                                        ?
                                        <div className="float-right">
                                            <Pagination
                                                activePage={this.props.global_page_no}
                                                itemsCountPerPage={this.props.global_limit}
                                                totalItemsCount={Number(this.state.totalItemCount)}
                                                itemClass='page-item'
                                                linkClass='page-link'
                                                onChange={this.handlePageChange}
                                            />
                                        </div>
                                        :
                                        null
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Dialog
                    modalTitle="Vehicle Details"
                    className="dialog-height"
                    modalBody={getDialogBody(this.state.selected_vehicle)}
                    modalFooter={
                        <React.Fragment>
                            <Button color="secondary" className="black-btn" onClick={() => this.isDialogOpenHandler(false, -1)}>Ok</Button>
                        </React.Fragment>
                    }
                    isModalOpen={this.state.isDialogOpen}
                    toggle={this.isDialogOpenHandler}
                    size="lg"
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        global_page_no: state.reducer.page_no,
        global_limit: state.reducer.limit,
        global_search_keyword: state.reducer.search_keyword
    }
}

export default connect(mapStateToProps)(Vehicles);
