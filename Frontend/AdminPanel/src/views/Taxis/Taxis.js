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

class Taxis extends Component {
    state = {
        taxis: [],
        search_keyword: "",
        totalItemCount: 0,
        page_no: this.props.global_page_no
    }
    getTaxis = async (data) => {
        let response = await apiCall('GET', `taxis?page_no=${data.page_no}${data.query_string ? `&query_string=${data.query_string}` : ""}`);
        this.setState({ taxis: response.data.taxis, totalItemCount: response.data.total_taxis });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getTaxis(data)
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
            await this.getTaxis(data);
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
    activeClickHandler = async (taxi, flag, index) => {
        console.log(taxi, flag, index)
        let reqData = {
            taxi_id: taxi.id,
            flag: flag
        }
        let response = await apiCall('POST', 'taxi', reqData);
        if (response.code === 1) {
            let taxis = this.state.taxis;
            taxis[index].is_approved = flag;
            this.setState({ taxis: taxis });
        }
        displayLog(response.code, response.message);
    }
    stolenClickHandler = async (taxi, flag, index) => {
        console.log(taxi, flag, index)
        let reqData = {
            taxi_id: taxi.id,
            stolen_flag: flag
        }
        let response = await apiCall('POST', 'taxi', reqData);
        if (response.code === 1) {
            let taxis = this.state.taxis;
            taxis[index].is_stolen = flag;
            this.setState({ taxis: taxis });
        }
        displayLog(response.code, response.message);
    }
    taxiDetailsClickHandler = (taxi_id) => {
        this.props.history.push(process.env.PUBLIC_URL + `/taxi-details/${taxi_id}`)
    }
    tableRow = (taxi, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{(this.state.page_no - 1) * config.LIMIT + index + 1}</td>
                <td className="align-middle">
                    <Img
                        className="table-cell-img"
                        src={taxi.vehicle_image}
                        loader={<img className="table-cell-img loading-img" alt="motologs" src={loading_image} />}
                        unloader={<img className="table-cell-img" alt="motologs" title="No Image Found" src={default_img} />}
                    />
                </td>
                <td className="align-middle">{taxi.plate_no}</td>
                <td className="align-middle">{taxi.brand_name}</td>
                <td className="align-middle">{taxi.brand_model}</td>
                <td className="align-middle">{taxi.colour}</td>
                <td className="align-middle">{getFormatedDateFromTimeStamp(taxi.created_date)}</td>
                <td className="align-middle text-center">
                    {
                        taxi.is_approved === true
                            ?
                            <span className={"fa fa-toggle-on active action-icon"} title={"Deactivate Taxi"} onClick={() => this.activeClickHandler(taxi, false, index)}  ></span>
                            :
                            <span className={"fa fa-toggle-off active action-icon"} title={"Activate Taxi"} onClick={() => this.activeClickHandler(taxi, true, index)}  ></span>
                    }
                    {
                        taxi.is_stolen === true
                            ?
                            <span className={"fa fa-toggle-on danger action-icon"} title={"Unmark Taxi as stolen"} onClick={() => this.stolenClickHandler(taxi, false, index)}  ></span>
                            :
                            <span className={"fa fa-toggle-off danger action-icon"} title={"MArk Taxi as stolen"} onClick={() => this.stolenClickHandler(taxi, true, index)}  ></span>
                    }
                    <span className="fa fa-info-circle action-icon" title="View Taxi Details" onClick={() => this.taxiDetailsClickHandler(taxi.id)} ></span>
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
                                <h4 className="card-header-custom">Taxis</h4>
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
                                            <th scope="col" className="align-middle">Vehicle Image</th>
                                            <th scope="col" className="align-middle">Plate Number</th>
                                            <th scope="col" className="align-middle">Brand Name</th>
                                            <th scope="col" className="align-middle">Model</th>
                                            <th scope="col" className="align-middle">Colour</th>
                                            <th scope="col" className="align-middle">Created date</th>
                                            <th scope="col" className="align-middle text-center">Approve/View Driver</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.taxis.length > 0
                                            ?
                                            <tbody>
                                                {this.state.taxis.map((taxi, index) =>
                                                    this.tableRow(taxi, index)
                                                )}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className="text-center"><td colSpan={8}> No Data Found </td></tr>
                                            </tbody>
                                    }
                                </Table>
                                {
                                    this.state.taxis.length > 0
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

export default connect(mapStateToProps)(Taxis);
