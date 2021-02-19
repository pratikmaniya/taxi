import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { Card, CardBody, CardHeader, Col, Row, Table, Input } from 'reactstrap';
import Img from 'react-image';
import { connect } from 'react-redux';

import { apiCall, getFormatedDateFromTimeStamp } from '../../utils/common';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';

class Taxis extends Component {
    state = {
        taxis: [],
        totalItemCount: '',
        page_no: this.props.global_page_no,
        limit: this.props.global_page_no
    }
    getTaxis = async (data) => {
        let response = await apiCall('GET', `taxis?page_no=${this.state.page_no}`, data);
        this.setState({ taxis: response.data.taxis, totalItemCount: response.data.total_taxis });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        }
        this.getTaxis(data)
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
            await this.getTaxis(data);
            this.setState({
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            })

        }
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
    tableRow = (taxi, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{(this.state.page_no - 1) * this.state.limit + index + 1}</td>
                <td className="align-middle">
                    <Img
                        className="table-cell-img"
                        src={taxi.vehicle_image}
                        loader={<img className="table-cell-img loading-img" alt="motologs" src={loading_image} />}
                        unloader={<img className="table-cell-img" alt="motologs" title="No Image Found" src={default_img} />}
                    />
                </td>
                <td className="align-middle">{taxi.model}</td>
                <td className="align-middle">{taxi.brand}</td>
                <td className="align-middle">{taxi.vehicle_type}</td>
                <td className="align-middle">{taxi.year}</td>
                <td className="align-middle">{getFormatedDateFromTimeStamp(taxi.created_date)}</td>
                <td className="align-middle">
                    <span className="fa fa-info-circle action-icon" title="View Taxi Details" onClick={() => this.isDialogOpenHandler(true, taxi.id)} ></span>
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

export default connect(mapStateToProps)(Taxis);
