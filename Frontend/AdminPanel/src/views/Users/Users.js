import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';

import { apiCall } from '../../utils/common';
import store from '../../utils/store';
import * as actionTypes from '../../store/actionTypes';
import config from '../../config';

class Users extends Component {
    state = {
        users: [],
        totalItemCount: 0,
        page_no: this.props.global_page_no
    }
    getUsers = async (data) => {
        let response = await apiCall('GET', `users?page_no=${data.page_no}`);
        this.setState({ users: response.data.users, totalItemCount: response.data.total_users });
    }
    componentDidMount() {
        let data = {
            page_no: this.props.global_page_no
        }
        this.getUsers(data)
        this.setState({
            page_no: this.props.global_page_no
        })
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.global_page_no !== this.props.global_page_no) {
            let data = {
                page_no: this.props.global_page_no
            }
            await this.getUsers(data);
            this.setState({
                page_no: this.props.global_page_no
            })

        }
    }
    handlePageChange = pageNumber => {
        store.dispatch({
            type: actionTypes.SET_PAGE_NO,
            page_no: pageNumber
        })
    }
    tableRow = (user, index) => {
        return (
            <tr key={index}>
                <td className="text-center">{(this.state.page_no - 1) * config.LIMIT + index + 1}</td>
                <td className="align-middle">{user.first_name}</td>
                <td className="align-middle">{user.last_name}</td>
                <td className="align-middle">{user.email}</td>
                <td className="align-middle">{user.login_by === 0 ? "Facebook" : "Google"}</td>
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
                                <h4 className="card-header-custom">Users</h4>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">No</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Logged In By</th>
                                        </tr>
                                    </thead>
                                    {this.state.users.length > 0 ?
                                        <tbody>
                                            {this.state.users.map((user, index) =>
                                                this.tableRow(user, index)
                                            )}
                                        </tbody>
                                        :
                                        <tbody>
                                            <tr className="text-center"><td colSpan={6}> No Data Found </td></tr>
                                        </tbody>

                                    }
                                </Table>
                                {
                                    this.state.users.length > 0 ?
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
        global_page_no: state.reducer.page_no
    }
}

export default connect(mapStateToProps)(Users);
