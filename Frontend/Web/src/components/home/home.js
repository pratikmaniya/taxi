import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Container, Input
} from 'reactstrap';

import { getStateReq } from '../../store/actions/customers';
import Header from '../common/header';
import Footer from '../common/footer';

class Home extends Component {
    state = {
        stateList: [],
        selectedState: null
    }
    async componentDidMount() {
        await this.getState()
    }
    getState = async () => {
        let reqData =
        {
            getAllStateListNames: "TRUE",
            page_no: 1,
            limit: 10
        }
        await this.props.getStateReq(reqData)
        if (this.props.getStateSuccessRes && this.props.getStateSuccessRes.code == 1) {
            this.setState({ stateList: this.props.getStateSuccessRes.data, selectedState: this.props.getStateSuccessRes.data[0] })
        }
    }
    onStateChange = (e) => {
        this.setState({ selectedState: e.value });
    }
    createInvoiceClickHandler = () => {
        this.props.history.push(process.env.PUBLIC_URL + `noticeordering`, { stateId: this.state.selectedState.id })
    }
    render() {
        return (
            <Container>
                <Row>
                    <div className="search-input-container">
                        <Input type='text' className="search-input" />
                        <span className='search-input-icon-container'>
                            <span className="fa fa-search search-input-icon"></span>
                        </span>
                    </div>
                </Row>
                <Row>
                    <Col md="3" sm="12">
                        <Card>
                            <CardImg top width="100%" src="https://akm-img-a-in.tosshub.com/sites/btmt/images/stories/lamborghini_660_140220101539.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
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