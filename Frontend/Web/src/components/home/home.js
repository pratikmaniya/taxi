import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardText, CardBody, CardTitle, Row, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import queryString from 'query-string'

import { searchTaxi, getReviews, addReview } from '../../store/actions';
import { displayLog } from "../../utils/functions";
import header from "../common/header";

class Home extends Component {
    state = {
        search_text: '',
        ratingForm: {
            rating: 0,
            comment: ""
        },
        taxiDetails: {},
        reviews: [
            {
                name: 'Mohan Singh',
                rating: 4.5,
                comment: 'Great Experience. The car was clean and driver was pleasent'
            },
            {
                name: 'Thor',
                rating: 4,
                comment: 'Driver took his time driving and felt safe during the ride'
            }
        ],
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
        this.props.history.push({
            pathname: process.env.PUBLIC_URL + '/',
            search: `?search=${this.state.search_text}`
        })
        const reqData = {
            search: this.state.search_text.trim()
        }
        await this.props.searchTaxi(reqData)
        if (this.props.searchTaxiRes && this.props.searchTaxiRes.code === 1) {
            await this.setState({
                taxiDetails: {
                    first_name: this.props.searchTaxiRes.data.first_name,
                    last_name: this.props.searchTaxiRes.data.last_name,
                    plate_no: this.props.searchTaxiRes.data.plate_no,
                    brand_name: this.props.searchTaxiRes.data.brand_name,
                    brand_model: this.props.searchTaxiRes.data.brand_model,
                    colour: this.props.searchTaxiRes.data.colour,
                    license_image_front: this.props.searchTaxiRes.data.license_image_front,
                    vehicle_image: this.props.searchTaxiRes.data.vehicle_image,
                    rating: this.props.searchTaxiRes.data.rating
                }
            })
            this.getReviews()
        } else {
            displayLog(0, this.props.searchTaxiRes.message)
        }
    }
    getReviews = async () => {
        const reviewReqData = {
            page_no: 1,
            limit: 2
        }
        await this.props.getReviews(reviewReqData, this.props.searchTaxiRes.data.id)
        if (this.props.getReviewRes && this.props.getReviewRes.code === 1) {
            this.setState({ reviews: this.props.getReviewRes.data.reviews })
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
    submitReviewHandler = async () => {
        const reqData = {
            taxi_id: this.props.searchTaxiRes.data.id,
            rating: this.state.ratingForm.rating
        },
            reqHeader = {
                auth_token: this.props.loginRes.data.auth_token
            }
        if (this.state.ratingForm.comment) {
            reqData.comment = this.state.ratingForm.comment
        }
        await this.props.addReview(reqData, reqHeader)
        if (this.props.addReviewRes && this.props.addReviewRes.code === 1) {
            this.setState({ openReviewModal: false, ratingForm: { rating: 0, comment: "" } })
            this.getReviews()
        } else {
            displayLog(0, this.props.addReviewRes.message)
        }
    }
    render() {
        return (
            <Container>
                <div className="search-input-container">
                    <Input type='text' className="search-input" placeholder="Search taxi by plate number" name='search_text' value={this.state.search_text} onKeyPress={this.enterPressed} onChange={this.inputChangeHandler} />
                    <span className='search-input-icon-container' onClick={this.searchHandler}>
                        <span className="fa fa-search search-input-icon"></span>
                    </span>
                </div>
                {
                    this.state.taxiDetails && Object.keys(this.state.taxiDetails).length > 0
                        ?
                        <div className="taxi-card">
                            <Row>
                                <Col md='4' sm='12' style={{ textAlign: "center", borderRight: '1px solid #3e77f763', padding: '0 30px' }}>
                                    <img height="180px" width='300px' style={{ objectFit: 'contain', boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 7px 1px', margin: '10px 0', padding: '5px' }} alt="license" src={this.state.taxiDetails.license_image_front} />
                                    <img height="180px" width='300px' style={{ objectFit: 'contain', boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 7px 1px', margin: '10px 0', padding: '5px' }} alt="vehicle" src={this.state.taxiDetails.vehicle_image} />
                                </Col>
                                <Col md='8' sm='12'>
                                    <CardBody>
                                        <CardTitle style={{ fontSize: '28px' }}><span className="mb-2 text-muted">Plate Number: </span>{this.state.taxiDetails.plate_no}</CardTitle>
                                        {
                                            this.state.taxiDetails.rating
                                                ?
                                                <StarRatings
                                                    className='mb-2'
                                                    rating={this.state.taxiDetails.rating}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    starDimension="28px"
                                                    name='rating'
                                                />
                                                :
                                                <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">No Ratings</span></CardText>
                                        }
                                        <CardText style={{ fontSize: '18px', marginTop: '10px' }}><span className="mb-2 text-muted">Name: </span>{this.state.taxiDetails.first_name + ' ' + this.state.taxiDetails.last_name}</CardText>
                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Brand: </span>{this.state.taxiDetails.brand_name}</CardText>
                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Model: </span>{this.state.taxiDetails.brand_model}</CardText>
                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Colour: </span>{this.state.taxiDetails.colour}</CardText>
                                        <button style={{ margin: '10px 0' }} type="button" className="smallBtn" onClick={() => this.toggleReviewPopup(true)}>Give Review</button>
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
                                                        <CardText style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="mb-2 text-muted">{review.name}</span></CardText>
                                                        <CardText style={{ fontSize: '17px' }}>{review.comment}</CardText>
                                                    </div>
                                                })
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
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        searchTaxiRes: state.reducer.searchTaxiRes,
        addReviewRes: state.reducer.addReviewRes,
        getReviewRes: state.reducer.getReviewRes,
        loginRes: state.reducer.loginRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchTaxi: (reqData) => dispatch(searchTaxi(reqData)),
        getReviews: (reqData, id) => dispatch(getReviews(reqData, id)),
        addReview: (reqData, header) => dispatch(addReview(reqData, header))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));