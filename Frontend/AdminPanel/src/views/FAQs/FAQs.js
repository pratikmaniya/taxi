import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';

import { apiCall, displayLog, confirmBox } from '../../utils/common';
import Messages from '../../utils/messages';
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';

class FAQs extends Component {
    state = {
        faqs: [],
        totalItemCount: 0,
        search_keyword: "",
        page_no: this.props.global_page_no,
        limit: this.props.global_page_no
    }
    getFAQs = async (reqData) => {
        let response = await apiCall('POST', 'getAllFAQs', reqData);
        this.setState({ faqs: response.data.faqs, totalItemCount: response.data.total_faqs });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getFAQs(data)
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
            await this.getFAQs(data);
            this.setState({
                search_keyword: this.props.global_search_keyword,
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            })
        }
    }
    addFAQs = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/FrequantlyAskQuestions/add');
    }
    editFAQs = (FAQ) => {
        this.props.history.push(process.env.PUBLIC_URL + '/FrequantlyAskQuestions/edit/' + FAQ.id);
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
    deleteFAQ = async (id) => {
        let a = await confirmBox(Messages.EN.CONFIRM_BOX_TITLE, Messages.EN.ASK_TO_DELETE_FAQ);
        if (a) {
            let pageNo = this.state.totalItemCount > this.props.global_limit && this.state.faqs.length === 1 ? Number(this.props.global_page_no) - 1 : this.props.global_page_no,
                response = await apiCall('POST', 'deleteFAQ', { faq_id: id }),
                data = {
                    page_no: pageNo,
                    limit: this.props.global_limit
                }
            store.dispatch({
                type: actionTypes.SET_PAGE_NO,
                page_no: pageNo
            })
            displayLog(response.code, response.message);
            this.getFAQs(data);
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
    tableRow = (faq, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{(this.state.page_no - 1) * this.state.limit + index + 1}</td>
                <td className="text-left">{faq.question}</td>
                <td className="text-left">{faq.answer}</td>
                <td>
                    <span className="fa fa-edit edit action-icon" title="Edit FAQ" onClick={() => this.editFAQs(faq)} ></span>
                    <span className="fa fa-trash-o action-icon" title="Delete FAQ" onClick={() => this.deleteFAQ(faq.id)} ></span>
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
                                <h4 className="card-header-custom">FAQs</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-right">
                                    <Col sm="12" md="1" xl="4" className="mb-3 mb-xl-0">
                                        <Input type="select" name="type" className="w-25" onChange={(event) => { this.changeLimitHandler(event) }} value={this.props.global_limit} >
                                            <option value="10"> 10 </option>
                                            <option value="20"> 20 </option>
                                            <option value="30"> 30 </option>
                                        </Input>
                                    </Col>
                                    <Col sm="12" md="6" xl="8" className="mb-3 mb-xl-0">
                                        <Row className="justify-content-end">
                                            <Col sm="12" md="3" xs xl="5" className="mb-3 mb-xl-0">
                                                <Input type="text" placeholder={`Search by question`}
                                                    value={this.state.search_keyword}
                                                    name="search_keyword" onChange={(event) => this.changeSearch(event)}
                                                    onKeyPress={(event) => this.enterPressed(event)} />
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.search()}>Search</Button>
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.addFAQs()}>Add</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody>
                                <Table bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" rowSpan="2" className="text-center">No</th>
                                            <th scope="col" rowSpan="2" className="text-left">Quastion</th>
                                            <th scope="col" rowSpan="2" className="text-left">Answer</th>
                                            <th scope="col" rowSpan="2" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.faqs.length > 0
                                            ?
                                            <tbody>
                                                {this.state.faqs.map((faq, index) =>
                                                    this.tableRow(faq, index)
                                                )}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className="text-center"><td colSpan={6}> No Data Found </td></tr>
                                            </tbody>
                                    }
                                </Table>
                                {
                                    this.state.faqs.length > 0
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

export default connect(mapStateToProps)(FAQs);
