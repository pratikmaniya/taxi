import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, CardBody } from 'reactstrap';

import { apiCall } from '../../utils/common';

import './dashboard.css';

class Dashboard extends Component {
    state = {
        all_counts: {}
    }
    async componentDidMount() {
        let AllCounts = await apiCall('GET', 'getCounts');
        this.setState({ all_counts: AllCounts.data })
    }
    render() {
        return (
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h4 className="card-header-custom">Dashboard</h4>
                        </CardHeader>
                        <CardBody>
                            <div className="row Row">
                                <div className="col-sm-3 mb-2">
                                    <div className="inforide">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
                                                <i className="fa fa-user useIcon" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                                                <h4>Users</h4>
                                                <h2>{this.state.all_counts.users_count}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 mb-2">
                                    <div className="inforide">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
                                                <i className="fa fa-motorcycle useIcon" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                                                <h4>Vehicle type</h4>
                                                <h2>{this.state.all_counts.vehicle_type_count}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 mb-2">
                                    <div className="inforide">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 ride3">
                                                <i className="fa fa-list useIcon" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                                                <h4>Brands</h4>
                                                <h2 style={{ fontSize: '2vw' }}>{this.state.all_counts.brands_count}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 mb-2">
                                    <div className="inforide">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 ride4">
                                                <i className="fa fa-calendar-o useIcon" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                                                <h4>Years</h4>
                                                <h2>{this.state.all_counts.years_count}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Dashboard;