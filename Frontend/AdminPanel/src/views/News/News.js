import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import Pagination from "react-js-pagination";
import Img from 'react-image';
import { connect } from 'react-redux';

import { apiCall, displayLog, confirmBox } from '../../utils/common';
import Messages from '../../utils/messages';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';

class News extends Component {
    state = {
        news: [],
        totalItemCount: 0,
        search_keyword: "",
        page_no: this.props.global_page_no,
        limit: this.props.global_page_no
    }
    getNews = async (reqData) => {
        let response = await apiCall('POST', 'getAllNews', reqData);
        this.setState({ news: response.data.news, totalItemCount: response.data.total_news });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no,
            limit: this.props.global_limit
        }
        if (this.props.global_search_keyword) {
            data.query_string = this.props.global_search_keyword
        }
        this.getNews(data);
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
            await this.getNews(data);
            this.setState({
                search_keyword: this.props.global_search_keyword,
                page_no: this.props.global_page_no,
                limit: this.props.global_limit
            })


        }
    }
    addNews = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/news/add');
    }
    editNews = (news) => {
        this.props.history.push(process.env.PUBLIC_URL + '/news/edit/' + news.id);
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
    deleteNews = async (id) => {
        let a = await confirmBox(Messages.EN.CONFIRM_BOX_TITLE, Messages.EN.ASK_TO_DELETE_NEWS);
        if (a) {
            let pageNo = (this.state.totalItemCount > this.props.global_limit) && this.state.news.length === 1 ? Number(this.props.global_page_no) - 1 : this.props.global_page_no,
                response = await apiCall('POST', 'deleteNews', { news_id: id }),
                data = {
                    page_no: pageNo,
                    limit: this.props.global_limit
                }
            store.dispatch({
                type: actionTypes.SET_PAGE_NO,
                page_no: pageNo
            })
            displayLog(response.code, response.message)
            this.getNews(data)
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
    tableRow = (news, index) => {
        return (
            <tr key={index}>
                <td className="text-center align-middle">{(this.state.page_no - 1) * this.state.limit + index + 1}</td>
                <td className="align-middle">
                    <Img
                        className="table-cell-img"
                        src={news.image}
                        loader={<img className="table-cell-img loading-img" alt="motologs" src={loading_image} />}
                        unloader={<img className="table-cell-img" alt="motologs" title="No Image Found" src={default_img} />}
                    />
                </td>
                <td className="text-left align-middle">{news.news_title}</td>
                <td className="text-left align-middle">{news.description}</td>
                <td className="align-middle">
                    <span className="fa fa-edit edit action-icon" title="Edit News" onClick={() => this.editNews(news)} ></span>
                    <span className="fa fa-trash-o action-icon" title="Delete News" onClick={() => this.deleteNews(news.id)} ></span>
                </td>
            </tr >
        )
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-header-custom">News</h4>
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
                                                <Input type="text" placeholder={`Search by title`}
                                                    value={this.state.search_keyword}
                                                    name="search_keyword" onChange={(event) => this.changeSearch(event)}
                                                    onKeyPress={(event) => this.enterPressed(event)} />
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.search()}>Search</Button>
                                            </Col>
                                            <Col sm="12" md="2" xs xl="3" className="mb-3 mb-xl-0">
                                                <Button block className="black-btn" color="secondary" size="sm" onClick={() => this.addNews()}>Add</Button>
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
                                            <th scope="col" className="text-left">Image</th>
                                            <th scope="col" className="text-left">Title</th>
                                            <th scope="col" className="text-left">Description</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    {this.state.news.length > 0 ?
                                        <tbody>
                                            {this.state.news.map((news, index) =>
                                                this.tableRow(news, index)
                                            )}
                                        </tbody>
                                        :
                                        <tbody>
                                            <tr className="text-center"><td colSpan={6}> No Data Found </td></tr>
                                        </tbody>
                                    }
                                </Table>
                                {this.state.news.length > 0 ?
                                    <div className="float-right">
                                        <Pagination
                                            activePage={this.props.global_page_no}
                                            itemsCountPerPage={this.props.global_limit}
                                            totalItemsCount={Number(this.state.totalItemCount)}
                                            itemClass='page-item'
                                            linkClass='page-link'
                                            onChange={this.handlePageChange}
                                        />
                                    </div> : null}
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

export default connect(mapStateToProps)(News);
