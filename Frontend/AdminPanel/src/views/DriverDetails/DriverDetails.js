import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import Img from 'react-image';
import { connect } from 'react-redux';

import { apiCall, displayLog, getFormatedDateFromTimeStamp } from '../../utils/common';
import loading_image from '../../assets/images/loading_img.png'
import default_img from '../../assets/images/default_img.png'

class Taxis extends Component {
    state = {
        driverDetails: {},
        reviews: [],
        page_no: 1,
        totalReviews: 0
    }
    async componentDidMount() {
        console.log(this.props.match.params.driver_id)
        const response = await apiCall('GET', `driver/${this.props.match.params.driver_id}`);
        if (response && response.code === 1) {
            this.setState({ driverDetails: response.data });
            this.getReviews()
        } else {
            displayLog(0, response.message)
        }
    }
    getReviews = async () => {
        const response = await apiCall('GET', `review/${this.props.match.params.driver_id}?page_no=${this.state.page_no}`);
        if (response && response.code === 1) {
            this.setState({ reviews: [...this.state.reviews, ...response.data.reviews], totalReviews: Number(response.data.total_reviews) })
        } else {
            displayLog(0, response.message)
        }
    }
    loadMoreReview = async () => {
        await this.setState({ page_no: this.state.page_no + 1 })
        await this.getReviews()
    }
    render() {
        const displayLoadMore = this.state.totalReviews && this.state.totalReviews > this.state.reviews.length
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <h4 className="card-header-custom">Driver Details</h4>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md='4' sm='12' style={{ textAlign: "center", borderRight: '1px solid #00000036', padding: '0 30px' }}>
                                <div className="taxi-card-img-container">
                                    <label className="text-muted m-0">License Image Front</label>
                                    <Img
                                        className="taxi-card-img"
                                        src={this.state.driverDetails.license_image_front}
                                        loader={<img className="taxi-card-img loading-img" alt="taxi" src={loading_image} />}
                                        unloader={<img className="taxi-card-img" alt="taxi" title="No Image Found" src={default_img} />}
                                    />
                                </div>
                                <div className="taxi-card-img-container">
                                    <label className="text-muted m-0">License Image Back</label>
                                    <Img
                                        className="taxi-card-img"
                                        src={this.state.driverDetails.license_image_back}
                                        loader={<img className="taxi-card-img loading-img" alt="taxi" src={loading_image} />}
                                        unloader={<img className="taxi-card-img" alt="taxi" title="No Image Found" src={default_img} />}
                                    />
                                </div>
                            </Col>
                            <Col md='8' sm='12' className="taxi-details-container">
                                <CardTitle style={{ fontSize: '28px' }}>{this.state.driverDetails.first_name} {this.state.driverDetails.last_name}</CardTitle>
                                {
                                    this.state.driverDetails.rating
                                        ?
                                        <StarRatings
                                            className='mb-2'
                                            rating={this.state.driverDetails.rating}
                                            starRatedColor="gold"
                                            numberOfStars={5}
                                            starDimension="28px"
                                            name='rating'
                                        />
                                        :
                                        <CardText style={{ fontSize: '18px' }}><span className="text-muted">No Ratings</span></CardText>
                                }
                                <CardText style={{ fontSize: '18px' }}><span className="text-muted">Phone Number: </span>{this.state.driverDetails.phone_no}</CardText>
                                <CardText style={{ fontSize: '18px' }}><span className="text-muted">Driver Permit Number: </span>{this.state.driverDetails.driver_permit_number}</CardText>
                                <CardText style={{ fontSize: '18px' }}><span className="text-muted">Registered on: </span>{getFormatedDateFromTimeStamp(this.state.driverDetails.created_date)}</CardText>
                                <div style={{ padding: '5px 0' }}>
                                    {
                                        this.state.reviews && this.state.reviews.length > 0
                                            ?
                                            <>
                                                <CardText style={{ fontSize: '18px' }}><span className="text-muted">Reviews: </span></CardText>
                                                {
                                                    this.state.reviews.map((review, index) => {
                                                        return <div key={index} style={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 4px 1px', margin: '15px 0', padding: '10px 20px' }}>
                                                            <div style={{ margin: '0 0 5px 0' }}>
                                                                <StarRatings
                                                                    className='mb-2'
                                                                    rating={review.rating}
                                                                    starRatedColor="gold"
                                                                    numberOfStars={5}
                                                                    starDimension="20px"
                                                                    name='rating'
                                                                />
                                                            </div>
                                                            <CardText style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="text-muted">{new Date(review.created_date).toDateString()} ({review.first_name + ' ' + review.last_name})</span></CardText>
                                                            <CardText style={{ fontSize: '17px' }}>{review.comment}</CardText>
                                                        </div>
                                                    })
                                                }
                                                {
                                                    displayLoadMore
                                                        ?
                                                        <div className="text-center">
                                                            <button style={{ margin: '10px 0' }} type="button" className="smallBtn" onClick={this.loadMoreReview}>Load more reviews</button>
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </>
                                            :
                                            null
                                    }
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
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
