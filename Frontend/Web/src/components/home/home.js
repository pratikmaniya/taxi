import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    CardText, CardBody,
    CardTitle, Row, Col, Container, Input
} from 'reactstrap';
import StarRatings from 'react-star-ratings';

import { getStateReq } from '../../store/actions/customers';

class Home extends Component {
    state = {
        taxiDetails: {
            first_name: 'John',
            last_name: 'Doe',
            plate_no: 'ABC 1234',
            brand_name: 'Audi',
            brand_model: 'A8',
            colour: 'Black',
            license_image_front: 'https://specials-images.forbesimg.com/imageserve/5d3703e2f1176b00089761a6/960x0.jpg?cropX1=836&cropX2=5396&cropY1=799&cropY2=3364',
            vehicle_image: 'https://taxiguru.in/wp-content/themes/taxiv2/img/taxi-img.png',
            rating: 4
        },
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
    render() {
        return (
            <Container>
                <div className="search-input-container">
                    <Input type='text' className="search-input" placeholder="search taxi by plate number" />
                    <span className='search-input-icon-container'>
                        <span className="fa fa-search search-input-icon"></span>
                    </span>
                </div>
                {
                    this.state.taxiDetails && Object.keys(this.state.taxiDetails).length > 0
                        ?
                        <div className="taxi-card">
                            <Row>
                                <Col md='4' sm='12' style={{ textAlign: "center", borderRight: '1px solid #3e77f763', padding: '0 30px' }}>
                                    <img height="180px" width='300px' style={{ objectFit: 'contain', boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 7px 1px', margin: '10px 0', padding: '5px' }} src={this.state.taxiDetails.vehicle_image} alt="Card image cap" />
                                    <img height="180px" width='300px' style={{ objectFit: 'contain', boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 7px 1px', margin: '10px 0', padding: '5px' }} src={this.state.taxiDetails.license_image_front} alt="Card image cap" />
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
                                                this.state.reviews.map(review => {
                                                    return <div style={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 4px 1px', margin: '15px 0', padding: '10px 20px' }}>
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
        getStateSuccessRes: state.customers.getStateSuccessRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStateReq: (reqData) => dispatch(getStateReq(reqData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));