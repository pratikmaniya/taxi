import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import Img from 'react-image';
import { connect } from 'react-redux';

import { apiCall, getFormatedDateFromTimeStamp, displayLog } from '../../utils/common';
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'
import config from '../../config';

class Drivers extends Component {
    state = {
        drivers: [],
        search_keyword: "",
        totalItemCount: 0,
        page_no: this.props.global_page_no
    }
    getDrivers = async (data) => {
        let response = await apiCall('GET', `drivers?page_no=${data.page_no}${data.query_string ? `&query_string=${data.query_string}` : ""}`);
        this.setState({ drivers: response.data.drivers, totalItemCount: response.data.total_drivers });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getDrivers(data)
        this.setState({
            page_no: this.props.global_page_no,
            search_keyword: this.props.global_search_keyword
        })
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.global_page_no !== this.props.global_page_no
            || prevProps.global_search_keyword !== this.props.global_search_keyword) {
            let data = {
                page_no: this.props.global_page_no
            }
            if (this.props.global_search_keyword) {
                data.query_string = this.props.global_search_keyword
            }
            await this.getDrivers(data);
            this.setState({
                search_keyword: this.props.global_search_keyword,
                page_no: this.props.global_page_no
            })

        }
    }
    changeSearch = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.search()
        }
    }
    search() {
        if ((this.state.search_keyword.length === 0 && this.state.search_keyword.trim().length === 0) || (this.state.search_keyword.trim().length > 0)) {
            let query_string = this.state.search_keyword.trim().length === 0 ? undefined : this.state.search_keyword.trim()
            store.dispatch({
                type: actionTypes.SET_PAGE_NO,
                page_no: 1
            })
            store.dispatch({
                type: actionTypes.SET_SEARCH_KEYWORD,
                search_keyword: query_string ? query_string : ""
            })
        }
    }
    handlePageChange = pageNumber => {
        store.dispatch({
            type: actionTypes.SET_PAGE_NO,
            page_no: pageNumber
        })
    }
    activeClickHandler = async (driver, flag, index) => {
        console.log(driver, flag, index)
        let reqData = {
            driver_id: driver.id,
            flag: flag
        }
        let response = await apiCall('POST', 'driver', reqData);
        if (response.code === 1) {
            let drivers = this.state.drivers;
            drivers[index].is_approved = flag;
            this.setState({ drivers: drivers });
        }
        displayLog(response.code, response.message);
    }
    stolenClickHandler = async (driver, flag, index) => {
        console.log(driver, flag, index)
        let reqData = {
            driver_id: driver.id,
            stolen_flag: flag
        }
        let response = await apiCall('POST', 'driver', reqData);
        if (response.code === 1) {
            let drivers = this.state.drivers;
            drivers[index].is_stolen = flag;
            this.setState({ drivers: drivers });
        }
        displayLog(response.code, response.message);
    }
    driverDetailsClickHandler = (driver_id) => {
        this.props.history.push(process.env.PUBLIC_URL + `/driver-details/${driver_id}`)
    }
    tableRow = (driver, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{(this.state.page_no - 1) * config.LIMIT + index + 1}</td>
                <td className="align-middle text-center">
                    <Img
                        className="table-cell-img"
                        src={driver.license_image_front}
                        loader={<img className="table-cell-img loading-img" alt="motologs" src={loading_image} />}
                        unloader={<img className="table-cell-img" alt="motologs" title="No Image Found" src={default_img} />}
                    />
                </td>
                <td className="align-middle">{driver.plate_no}</td>
                <td className="align-middle">{driver.driver_permit_number}</td>
                <td className="align-middle">{driver.first_name}</td>
                <td className="align-middle">{driver.last_name}</td>
                <td className="align-middle">{driver.phone_no}</td>
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
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-header-custom">Drivers</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-right">
                                    <Col sm="12" md="6" xl="4" className="mb-3 mb-xl-0">
                                    </Col>
                                    <Col sm="12" md="6" xl="8" className="mb-3 mb-xl-0">
                                        <Row className="justify-content-end">
                                            <Col sm="12" md="6" xs xl="5" className="mb-3 mb-xl-0">
                                                <Input type="text" placeholder={`Search by name`}
                                                    value={this.state.search_keyword}
                                                    name="search_keyword" onChange={(event) => this.changeSearch(event)}
                                                    onKeyPress={(event) => this.enterPressed(event)} />
                                            </Col>
                                            <Col sm="12" md="4" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.search()}>Search</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody>
                                <Table bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">No</th>
                                            <th scope="col" className="align-middle text-center">Driver Image</th>
                                            <th scope="col" className="align-middle">Plate Number</th>
                                            <th scope="col" className="align-middle">Permit Number</th>
                                            <th scope="col" className="align-middle">First Name</th>
                                            <th scope="col" className="align-middle">Last Name</th>
                                            <th scope="col" className="align-middle">Phone Number</th>
                                            <th scope="col" className="align-middle">Created date</th>
                                            <th scope="col" className="align-middle text-center">Approve/View Driver</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.drivers.length > 0
                                            ?
                                            <tbody>
                                                {this.state.drivers.map((driver, index) =>
                                                    this.tableRow(driver, index)
                                                )}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className="text-center"><td colSpan={10}> No Data Found </td></tr>
                                            </tbody>
                                    }
                                </Table>
                                {
                                    this.state.drivers.length > 0
                                        ?
                                        <div className="float-right">
                                            <Pagination
                                                activePage={this.props.global_page_no}
                                                itemsCountPerPage={config.LIMIT}
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        global_page_no: state.reducer.page_no,
        global_search_keyword: state.reducer.search_keyword
    }
}

export default connect(mapStateToProps)(Drivers);
