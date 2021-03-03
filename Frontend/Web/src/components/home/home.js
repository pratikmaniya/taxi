import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardText, CardBody, CardTitle, Row, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import queryString from 'query-string'
import ReactTooltip from 'react-tooltip';
import Img from 'react-image';

import { searchTaxi, getDriver, getReviews, addReview, isAbleToReview } from '../../store/actions';
import { displayLog } from "../../utils/functions";
import loading_image from '../../images/loading_img.png'
import default_img from '../../images/default_img.png'

const defaultTaxiDetails = {
    id: 4.3,
    phone_no: "8685431234",
    email: "karlonstbernard@gmail.com",
    first_name: "Karlon",
    last_name: "St",
    plate_no: "HHHH1234",
    brand_name: "Honda",
    brand_model: "Civic",
    colour: "Blue",
    license_image_front: "https://taxi-review.s3-us-west-1.amazonaws.com/taxi/1613816619059-Karlon St Bernard  2020.JPG",
    license_image_back: "taxi/1613816619269-Karlon St Bernard  2020.JPG",
    vehicle_image: "https://taxi-review.s3-us-west-1.amazonaws.com/example-vehicle.png",
    created_date: "2021-02-20T10:23:39.519Z",
    modified_date: "2021-02-21T07:04:25.630Z",
    is_approved: true,
    rating: 4
},
    defaultReviews = [
        {
            rating: 4,
            comment: "The driver vehicle was immaculate, and the driver took his time while driving.",
            created_date: "2021-02-22T05:18:29.236Z",
            modified_date: "2021-02-22T05:18:29.236Z"
        },
        {
            rating: 4,
            comment: "The driver vehicle had wifi, and the music was very low. It was an enjoyable ride.",
            created_date: "2021-02-20T07:20:53.073Z",
            modified_date: "2021-02-20T07:20:53.073Z"
        },
        {
            rating: 5,
            comment: "The driver had phone chargers available to passengers.",
            created_date: "2021-02-20T07:20:53.073Z",
            modified_date: "2021-02-20T07:20:53.073Z"
        }
    ]

class Home extends Component {
    state = {
        search_text: '',
        ratingForm: {
            rating: 0,
            comment: ""
        },
        taxiDetails: { ...defaultTaxiDetails },
        selectedDriver: {},
        reviews: [...defaultReviews],
        page_no: 1,
        totalReviews: 0,
        openReviewModal: false
    }
    async componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        console.log()
        if (params.search) {
            await this.setState({ search_text: params.search })
            this.searchHandler()
        }
    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.searchHandler()
        }
    }
    inputChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    searchHandler = async () => {
        await this.setState({ taxiDetails: {}, reviews: [] })
        if (this.state.search_text) {
            this.props.history.push({
                pathname: process.env.PUBLIC_URL + '/',
                search: `?search=${this.state.search_text}`
            })
            const reqData = {
                search: this.state.search_text.trim()
            }
            await this.props.searchTaxi(reqData)
            if (this.props.searchTaxiRes && this.props.searchTaxiRes.code === 1) {
                await this.setState({ taxiDetails: { ...this.props.searchTaxiRes.data } })
            } else {
                displayLog(0, this.props.searchTaxiRes.message)
            }
        } else {
            this.props.history.push({ pathname: process.env.PUBLIC_URL + '/' })
        }
    }
    selectDriverClickHandler = async (driver_id) => {
        await this.props.getDriver(driver_id)
        if (this.props.getDriverRes && this.props.getDriverRes.code === 1) {
            await this.setState({ selectedDriver: { ...this.props.getDriverRes.data } })
            this.getReviews()
        } else {
            displayLog(0, this.props.getDriverRes.message)
        }
    }
    getReviews = async () => {
        const reviewReqData = {
            page_no: this.state.page_no
        }
        await this.props.getReviews(reviewReqData, this.state.selectedDriver.id)
        if (this.props.getReviewRes && this.props.getReviewRes.code === 1) {
            this.setState({ reviews: [...this.state.reviews, ...this.props.getReviewRes.data.reviews], totalReviews: Number(this.props.getReviewRes.data.total_reviews) })
        } else {
            displayLog(0, this.props.getReviewRes.message)
        }
    }
    toggleReviewPopup = (flag) => {
        this.setState({ openReviewModal: flag })
    }
    changeRating = (newRating, name) => {
        this.setState({ ratingForm: { ...this.state.ratingForm, [name]: newRating } });
    }
    changeRatingComment = (event) => {
        this.setState({ ratingForm: { ...this.state.ratingForm, [event.target.name]: event.target.value } })
    }
    giveReviewClickHandler = async () => {
        await this.props.isAbleToReview(this.props.searchTaxiRes.data.id)
        if (this.props.isAbleToreviewRes && this.props.isAbleToreviewRes.code === 1) {
            if (this.props.isAbleToreviewRes.data.code === 2) {
                displayLog(0, this.props.isAbleToreviewRes.message)
            } else {
                this.toggleReviewPopup(true)
            }
        } else {
            displayLog(0, this.props.isAbleToreviewRes.message)
        }
    }
    submitReviewHandler = async () => {
        const reqData = {
            driver_id: this.state.selectedDriver.id,
            rating: this.state.ratingForm.rating
        }
        if (this.state.ratingForm.comment) {
            reqData.comment = this.state.ratingForm.comment
        }
        await this.props.addReview(reqData)
        if (this.props.addReviewRes && this.props.addReviewRes.code === 1) {
            this.setState({ openReviewModal: false, ratingForm: { rating: 0, comment: "" } })
            this.getReviews()
        } else {
            displayLog(0, this.props.addReviewRes.message)
        }
    }
    loadMoreReview = async () => {
        await this.setState({ page_no: this.state.page_no + 1 })
        await this.getReviews()
    }
    render() {
        const loggedIn = localStorage.getItem('RIDESAFETT-TOKEN') ? true : false,
            displayLoadMore = this.state.totalReviews && this.state.totalReviews > this.state.reviews.length
        return (
            <>
                <section>
                    <div className="home-banner">
                        <div className="home-banner-text-container">
                            <h1>The Safest Way to Travel!</h1>
                            <h4>Get insight into whom your driver is by searching the car license plate in real-time. See customer reviews of drivers while waiting at a taxi stand or anywhere for free!</h4>
                        </div>
                        <div className="search-input-container">
                            <Input type='text' className="search-input" placeholder="Search plate number" name='search_text' value={this.state.search_text} onKeyPress={this.enterPressed} onChange={this.inputChangeHandler} />
                            <span className='search-input-icon-container' onClick={this.searchHandler}>
                                <span className="fa fa-search search-input-icon"></span>
                            </span>
                        </div>
                    </div>
                </section>
                <Container>
                    {
                        this.state.taxiDetails && Object.keys(this.state.taxiDetails).length > 0
                            ?
                            <div className="taxi-card">
                                <Row>
                                    <Col md='4' sm='12' className="img-container">
                                        <Img
                                            className="taxi-card-img"
                                            src={this.state.taxiDetails.vehicle_image}
                                            loader={<img className="taxi-card-img loading-img" alt="taxi" src={loading_image} />}
                                            unloader={<img className="taxi-card-img" alt="taxi" title="No Image Found" src={default_img} />}
                                        />
                                    </Col>
                                    <Col md='8' sm='12'>
                                        <CardBody>
                                            <CardTitle style={{ fontSize: '28px' }}>
                                                <span className="mb-2 text-muted">Plate Number: </span>
                                                {this.state.taxiDetails.plate_no}
                                                {
                                                    this.state.taxiDetails.is_stolen
                                                        ? <span style={{ fontWeight: 'bold', color: 'red' }}> (Stolen)</span>
                                                        :
                                                        null
                                                }
                                            </CardTitle>
                                            <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Brand: </span>{this.state.taxiDetails.brand_name}</CardText>
                                            <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Model: </span>{this.state.taxiDetails.brand_model}</CardText>
                                            <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Colour: </span>{this.state.taxiDetails.colour}</CardText>
                                            {
                                                this.state.taxiDetails && this.state.taxiDetails.drivers
                                                    ?
                                                    <div className='driver-card-continer'>
                                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Drivers: </span></CardText>
                                                        <Row>
                                                            {
                                                                this.state.taxiDetails.drivers.map((driver, index) => {
                                                                    return <Col md='6' sm='12' key={index} onClick={() => this.selectDriverClickHandler(driver.id)}>
                                                                        <div className={'driver-card' + (driver.id === this.state.selectedDriver.id ? ' selected' : '')}>
                                                                            <CardText style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="mb-2 text-muted">{driver.first_name} {driver.last_name}</span></CardText>
                                                                        </div>
                                                                    </Col>
                                                                })
                                                            }
                                                        </Row>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </CardBody>
                                    </Col>
                                </Row>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.selectedDriver && Object.keys(this.state.selectedDriver).length > 0
                            ?
                            <div className="taxi-card">
                                <Row>
                                    <Col md='4' sm='12' className="img-container">
                                        <Img
                                            className="taxi-card-img"
                                            src={this.state.selectedDriver.license_image_front}
                                            loader={<img className="taxi-card-img loading-img" alt="taxi" src={loading_image} />}
                                            unloader={<img className="taxi-card-img" alt="taxi" title="No Image Found" src={default_img} />}
                                        />
                                    </Col>
                                    <Col md='8' sm='12'>
                                        <CardBody>
                                            <CardTitle style={{ fontSize: '28px' }}>{this.state.selectedDriver.first_name} {this.state.selectedDriver.last_name}</CardTitle>
                                            {
                                                this.state.selectedDriver.rating
                                                    ?
                                                    <StarRatings
                                                        className='mb-2'
                                                        rating={this.state.selectedDriver.rating}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        starDimension="28px"
                                                        name='rating'
                                                    />
                                                    :
                                                    <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">No Ratings</span></CardText>
                                            }
                                            <button style={loggedIn ? { margin: '10px 0' } : { margin: '10px 0', opacity: 0.5 }} type="button" data-tip={loggedIn ? "" : "Please login to give a review. Click on Register/Sign In at the top of the page."} className="smallBtn" onClick={loggedIn ? this.giveReviewClickHandler : null}>Give Review</button>
                                            <ReactTooltip place="top" type="dark" effect="float" />
                                            <div style={{ padding: '5px 0' }}>
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
                                                            <CardText style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="mb-2 text-muted">{new Date(review.created_date).toDateString()}</span></CardText>
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
                                            </div>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </div>
                            :
                            null
                    }
                    <Modal isOpen={this.state.openReviewModal} toggle={() => this.toggleReviewPopup(false)}>
                        <ModalHeader toggle={() => this.toggleReviewPopup(false)}>Give a review</ModalHeader>
                        <ModalBody>
                            <StarRatings
                                className='mb-2'
                                rating={this.state.ratingForm.rating}
                                starRatedColor="gold"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                starDimension="25px"
                                name='rating'
                            />
                            <Input type="textarea" style={{ resize: 'none', marginTop: '10px' }} className="" placeholder="Leave a comment" name='comment' value={this.state.ratingForm.comment} onChange={this.changeRatingComment} />
                        </ModalBody>
                        <ModalFooter>
                            <button color="primary" className="smallBtn" onClick={this.submitReviewHandler}>Submit</button>{' '}
                            <button className="btn btn-secondary" onClick={() => this.toggleReviewPopup(false)}>Cancel</button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchTaxiRes: state.reducer.searchTaxiRes,
        getDriverRes: state.reducer.getDriverRes,
        addReviewRes: state.reducer.addReviewRes,
        getReviewRes: state.reducer.getReviewRes,
        isAbleToreviewRes: state.reducer.isAbleToreviewRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchTaxi: (reqData) => dispatch(searchTaxi(reqData)),
        getDriver: (reqData, id) => dispatch(getDriver(reqData, id)),
        getReviews: (reqData, id) => dispatch(getReviews(reqData, id)),
        addReview: (taxi_id) => dispatch(addReview(taxi_id)),
        isAbleToReview: (reqData) => dispatch(isAbleToReview(reqData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));