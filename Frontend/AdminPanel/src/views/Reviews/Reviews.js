import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import Img from 'react-image';

import { apiCall, displayLog } from '../../utils/common';
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'

class VehicleTypes extends Component {
    state = {
        vehicle_types: [],
        totalItemCount: 0,
        search_keyword: "",
        page_no: this.props.global_page_no,
        limit: this.props.global_page_no
    }
    getVehicleTypes = async (reqData) => {
        let response = await apiCall('POST', 'getAllvehicleTypes', reqData);
        this.setState({ vehicle_types: response.data.vehicle_types, totalItemCount: response.data.total_vehicle_types });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getVehicleTypes(data);
        this.setState({
            search_keyword: this.props.global_search_keyword,
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        })

    }
    async componentDidUpdate(prevProps) {
        if (prevProps.global_page_no !== this.props.global_page_no
            || prevProps.global_limit !== this.props.global_limit
            || prevProps.global_search_keyword !== this.props.global_search_keyword) {
            let data = {
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            }
            if (this.props.global_search_keyword) {
                data.query_string = this.props.global_search_keyword
            }
            await this.getVehicleTypes(data);
            this.setState({
                page_no: this.props.global_page_no,
                limit: this.props.global_limit,
                search_keyword: this.props.global_search_keyword
            })
        }
    }
    addVehicleType = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/vehicleTypes/add');
    }
    editVehicleType = (vehicle_types) => {
        this.props.history.push(process.env.PUBLIC_URL + '/vehicleTypes/edit/' + vehicle_types.id);
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
    activeClickHandler = async (vehicle_type, flag, index) => {
        let reqData = {
            vehicle_type_id: vehicle_type.id,
            flag: flag
        }
        let response = await apiCall('POST', 'updateActiveStatusOfVehicleType', reqData);
        if (response.code === 1) {
            let vehicle_types = this.state.vehicle_types;
            vehicle_types[index].is_active = flag;
            this.setState({ vehicle_types: vehicle_types });
        }
        displayLog(response.code, response.message);
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
    tableRow = (vehicle_type, index) => {
        return (
            <tr key={index}>
                <td className="text-center align-middle">{(this.state.page_no - 1) * this.state.limit + index + 1}</td>
                <td className="align-middle">
                    <Img
                        className="table-cell-img"
                        src={vehicle_type.image}
                        loader={<img className="table-cell-img loading-img" alt="motologs" src={loading_image} />}
                        unloader={<img className="table-cell-img" alt="motologs" title="No Image Found" src={default_img} />}
                    />
                </td>
                <td className="text-center align-middle">{vehicle_type.vehicle_type}</td>
                <td className="text-center align-middle">
                    {
                        vehicle_type.is_active === true
                            ?
                            <span className={"fa fa-toggle-off active action-icon"} title={"Deactivate vehicle type"} onClick={() => this.activeClickHandler(vehicle_type, false, index)}  ></span>
                            :
                            <span className={"fa fa-toggle-on active action-icon"} title={"Activate vehicle type"} onClick={() => this.activeClickHandler(vehicle_type, true, index)}  ></span>
                    }
                    <span className="fa fa-edit edit action-icon" title="Edit vehicle type" onClick={() => this.editVehicleType(vehicle_type)} ></span>
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
                                <h4 className="card-header-custom">Vehicle Types</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-right">
                                    <Col sm="12" md="1" xl="4" className="mb-3 mb-xl-0">
                                        <Input type="select" name="type" className="w-25" onChange={(event) => { this.changeLimitHandler(event) }} value={this.props.global_limit}>
                                            <option value="10"> 10 </option>
                                            <option value="20"> 20 </option>
                                            <option value="30"> 30 </option>
                                        </Input>
                                    </Col>
                                    <Col sm="12" md="6" xl="8" className="mb-3 mb-xl-0">
                                        <Row className="justify-content-end">
                                            <Col sm="12" md="3" xs xl="5" className="mb-3 mb-xl-0">
                                                <Input type="text" placeholder={`Search by name`}
                                                    className="custom-search-input"
                                                    value={this.state.search_keyword}
                                                    name="search_keyword" onChange={(event) => this.changeSearch(event)}
                                                    onKeyPress={(event) => this.enterPressed(event)} />
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.search()}>Search</Button>
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.addVehicleType()}>Add</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody>
                                <Table bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th className="text-center">No</th>
                                            <th className="text-center">Image</th>
                                            <th className="text-center">Type Name</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    {this.state.vehicle_types.length > 0 ?
                                        <tbody>
                                            {this.state.vehicle_types.map((vehicle_type, index) =>
                                                this.tableRow(vehicle_type, index)
                                            )}
                                        </tbody>
                                        :
                                        <tbody>
                                            <tr className="text-center"><td colSpan={6}> No Data Found </td></tr>
                                        </tbody>
                                    }
                                </Table>
                                {
                                    this.state.vehicle_types.length > 0 ?
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

export default connect(mapStateToProps)(VehicleTypes);
