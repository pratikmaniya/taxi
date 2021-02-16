import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    CardText, CardBody,
    CardTitle, Row, Col, Container, Input
} from 'reactstrap';
import StarRatings from 'react-star-ratings';
import queryString from 'query-string'

import { searchTaxi } from '../../store/actions';

class Home extends Component {
    state = {
        search_text: '',
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
        ]
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
            pathname: '/',
            search: `?search=${this.state.search_text}`
        })
        const reqData = {
            search: this.state.search_text.trim()
        }
        await this.props.searchTaxi(reqData)
        if (this.props.searchTaxiRes && this.props.searchTaxiRes.code === 1) {
            this.setState({
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
                                        <StarRatings
                                            className='mb-2'
                                            rating={this.state.taxiDetails.rating}
                                            starRatedColor="gold"
                                            changeRating={this.changeRating}
                                            numberOfStars={5}
                                            starDimension="28px"
                                            name='rating'
                                        />
                                        <CardText style={{ fontSize: '18px', marginTop: '10px' }}><span className="mb-2 text-muted">Name: </span>{this.state.taxiDetails.first_name + ' ' + this.state.taxiDetails.last_name}</CardText>
                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Brand: </span>{this.state.taxiDetails.brand_name}</CardText>
                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Model: </span>{this.state.taxiDetails.brand_model}</CardText>
                                        <CardText style={{ fontSize: '18px' }}><span className="mb-2 text-muted">Colour: </span>{this.state.taxiDetails.colour}</CardText>
                                        <div style={{ padding: '5px 0' }}>
                                            {
                                                this.state.reviews.map((review, index) => {
                                                    return <div key={index} style={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 4px 1px', margin: '15px 0', padding: '10px 20px' }}>
                                                        <div style={{ margin: '0 0 5px 0' }}>
                                                            <StarRatings
                                                                className='mb-2'
                                                                rating={review.rating}
                                                                starRatedColor="gold"
                                                                changeRating={this.changeRating}
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
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        searchTaxiRes: state.reducer.searchTaxiRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchTaxi: (reqData) => dispatch(searchTaxi(reqData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));