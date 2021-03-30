import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { apiCall, getFormatedDateFromTimeStamp, displayLog, confirmBox } from '../../utils/common';
import Messages from '../../utils/messages'
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';
import config from '../../config';

class Reviews extends Component {
    state = {
        reviews: [],
        search_keyword: "",
        totalItemCount: 0,
        page_no: this.props.global_page_no
    }
    getReviews = async (data) => {
        let response = await apiCall('GET', `reviews?page_no=${data.page_no}${data.query_string ? `&query_string=${data.query_string}` : ""}`);
        this.setState({ reviews: response.data.reviews, totalItemCount: response.data.total_reviews });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getReviews(data)
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
            await this.getReviews(data);
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
    deleteReviewClickHandler = async (review_id) => {
        const answer = await confirmBox(Messages.EN.CONFIRM_BOX_TITLE, Messages.EN.ASK_TO_DELETE_REVIEW);
        if (answer) {
            const response = await apiCall('DELETE', `review/${review_id}`);
            if (response && response.code === 1) {
                let data = {
                    page_no: this.props.global_page_no
                }
                if (this.props.global_search_keyword) {
                    data.query_string = this.props.global_search_keyword
                }
                this.getReviews(data)
            }
            displayLog(response.code, response.message);
        }
    }
    tableRow = (review, index) => {
        return (
            <tr key={index}>
                <td className="text-center align-middle">{(this.state.page_no - 1) * config.LIMIT + index + 1}</td>
                <td className="align-middle">{review.rating}</td>
                <td className="align-middle">{review.comment}</td>
                <td className="align-middle">{review.ip}</td>
                <td className="align-middle">{review.user_first_name}</td>
                <td className="align-middle">{review.user_last_name}</td>
                <td className="align-middle">{review.driver_first_name}</td>
                <td className="align-middle">{review.driver_last_name}</td>
                <td className="align-middle">{getFormatedDateFromTimeStamp(review.created_date)}</td>
                <td className="align-middle text-center">
                    <span className="fa fa-trash action-icon" title="Delete Review" onClick={() => this.deleteReviewClickHandler(review.id)} ></span>
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
                                <h4 className="card-header-custom">Reviews</h4>
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
                                            <th scope="col" className="text-center align-middle">No</th>
                                            <th scope="col" className="align-middle">Rating</th>
                                            <th scope="col" className="align-middle">Comment</th>
                                            <th scope="col" className="align-middle">IP</th>
                                            <th scope="col" className="align-middle">User First Name</th>
                                            <th scope="col" className="align-middle">User Last Name</th>
                                            <th scope="col" className="align-middle">Driver First Name</th>
                                            <th scope="col" className="align-middle">Driver Last Name</th>
                                            <th scope="col" className="align-middle">Created date</th>
                                            <th scope="col" className="align-middle text-center">Delete Review</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.reviews.length > 0
                                            ?
                                            <tbody>
                                                {this.state.reviews.map((review, index) =>
                                                    this.tableRow(review, index)
                                                )}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr className="text-center"><td colSpan={10}> No Data Found </td></tr>
                                            </tbody>
                                    }
                                </Table>
                                {
                                    this.state.reviews.length > 0
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

export default connect(mapStateToProps)(Reviews);
