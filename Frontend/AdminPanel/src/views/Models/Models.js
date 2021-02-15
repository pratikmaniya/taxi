import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { apiCall, displayLog } from '../../utils/common';
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';

class Models extends Component {
    state = {
        models: [],
        totalItemCount: 0,
        search_keyword: "",
        page_no: this.props.global_page_no,
        limit: this.props.global_page_no
    }
    getModels = async (data) => {
        let response = await apiCall('POST', 'getAllModels', data);
        this.setState({ models: response.data.models, totalItemCount: response.data.total_models });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getModels(data);
        this.setState({
            page_no: this.props.global_page_no,
            limit: this.props.global_limit,
            search_keyword: this.props.global_search_keyword
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
            await this.getModels(data);
            this.setState({
                search_keyword: this.props.global_search_keyword,
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            })
        }
    }
    addModel = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/models/add');
    }
    editModel = (model) => {
        this.props.history.push(process.env.PUBLIC_URL + '/models/edit/' + model.id);
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
    activeClickHandler = async (model, flag, index) => {
        let data = {
            model_id: model.id,
            flag: flag
        }
        let response = await apiCall('POST', 'updateActiveStatusOfModel', data);
        if (response.code === 1) {
            let models = this.state.models;
            models[index].is_active = flag;
            this.setState({ models: models });
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
    tableRow = (model, index) => {
        return (
            <tr key={index}>
                <td className="text-center align-middle">{(this.state.page_no - 1) * this.state.limit + index + 1}</td>
                <td className="align-middle">{model.model}</td>
                <td className="align-middle">{model.year}</td>
                <td className="align-middle">{model.brand}</td>
                <td className="align-middle">{model.vehicle_type}</td>
                <td className="align-middle">
                    {
                        model.is_active === true
                            ?
                            <span className={"fa fa-toggle-off active action-icon"} title={"Deactivate model"} onClick={() => this.activeClickHandler(model, false, index)}  ></span>
                            :
                            <span className={"fa fa-toggle-on active action-icon"} title={"Activate model"} onClick={() => this.activeClickHandler(model, true, index)}  ></span>
                    }
                    <span className="fa fa-edit edit action-icon" title="Edit model" onClick={() => this.editModel(model)} ></span>
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
                                <h4 className="card-header-custom">Models</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-right">
                                    <Col sm="12" md="1" xl className="mb-3 mb-xl-0">
                                        <Input type="select" name="type" className="w-25" onChange={(event) => { this.changeLimitHandler(event) }} value={this.props.global_limit} >
                                            <option value="10"> 10 </option>
                                            <option value="20"> 20 </option>
                                            <option value="30"> 30 </option>
                                        </Input>
                                    </Col>
                                    <Col sm="12" md="6" xl="8" className="mb-3 mb-xl-0">
                                        <Row className="justify-content-end">
                                            <Col sm="12" md="3" xs xl="5" className="mb-3 mb-xl-0">
                                                <Input type="text" placeholder={`Search by name`}
                                                    value={this.state.search_keyword}
                                                    name="search_keyword" onChange={(event) => this.changeSearch(event)}
                                                    onKeyPress={(event) => this.enterPressed(event)} />
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.search()}>Search</Button>
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.addModel()}>Add</Button>
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
                                            <th scope="col" className="align-middle">Model name</th>
                                            <th scope="col" className="align-middle">Year</th>
                                            <th scope="col" className="align-middle">Brand name</th>
                                            <th scope="col" className="align-middle">Vehicle type</th>
                                            <th scope="col" className="align-middle">Actions</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.models.length > 0
                                            ?
                                            <tbody>
                                                {this.state.models.map((model, index) =>
                                                    this.tableRow(model, index)
                                                )}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className="text-center"><td colSpan={6}> No Data Found </td></tr>
                                            </tbody>
                                    }
                                </Table>
                                {
                                    this.state.models.length > 0
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

export default connect(mapStateToProps)(Models);
