import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import Joi from 'joi-browser';

import { validateSchema, apiCall, displayLog } from '../../utils/common';

class AddEditYear extends Component {
    state = {
        vehicle_types: [],
        brands: [],
        form: {
            year: '',
            selected_brand_id: 0,
            selected_vehicle_type_id: 0
        },
        error: {
            status: false,
            message: '',
        },
    }
    async componentDidMount() {
        const data = {
            for_drop_down: true
        }
        let resVehicleTypes = await apiCall('POST', 'getAllVehicleTypes', data);
        let resBrands = await apiCall('POST', 'getAllbrands', data);
        this.setState({
            vehicle_types: resVehicleTypes.data.vehicle_types,
            brands: resBrands.data.brands
        })
        if (this.props.match.params && this.props.match.params.yearId) {
            let data = {
                year_id: this.props.match.params.yearId
            }
            const response = await apiCall('POST', 'getSingleYear', data);
            this.setState({
                form: {
                    ...this.state.form,
                    year: response.data.year ? response.data.year : '',
                    selected_vehicle_type_id: response.data.vehicle_type_id ? String(response.data.vehicle_type_id) : '',
                    selected_brand_id: response.data.brand_id ? String(response.data.brand_id) : ''
                }
            })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.state.form.selected_vehicle_type_id !== prevState.form.selected_vehicle_type_id) {
            let data = {
                vehicle_type_id: this.state.form.selected_vehicle_type_id
            },
                response = await apiCall('POST', 'getAllBrands', data)
            this.setState({ brands: response.data.brands })
        }
    }
    submitHandler = async () => {
        let formData = {
            year: this.state.form.year,
            brand_id: this.state.form.selected_brand_id,
            vehicle_type_id: this.state.form.selected_vehicle_type_id
        }
        if (this.props.match.params && this.props.match.params.yearId) {
            //EDIT
            formData.year_id = this.props.match.params.yearId
            await this.editYear(formData)
        } else {
            //ADD
            await this.addYear(formData)
        }
    }
    editYear = async (form) => {
        let date = new Date(),
            maxYear = Number(date.getFullYear()),
            schema = Joi.object().keys({
                year_id: Joi.string().required(),
                vehicle_type_id: Joi.string().optional().label('vehicle type').required(),
                brand_id: Joi.string().optional().label('brand').required(),
                year: Joi.number().integer().max(maxYear).label('year').required(),
            })
        this.setState({ error: await validateSchema(form, schema) });
        if (!this.state.error.status) {
            let res = await apiCall('POST', 'editYear', form);
            displayLog(res.code, res.message);
            this.props.history.push(process.env.PUBLIC_URL + `/years`);
        } else {
            displayLog(0, this.state.error.message)
        }
    }
    addYear = async (form) => {
        let date = new Date(),
            maxYear = Number(date.getFullYear()),
            schema = Joi.object().keys({
                vehicle_type_id: Joi.string().optional().label('vehicle type').required(),
                brand_id: Joi.string().strict().label('brand').required(),
                year: Joi.number().integer().max(maxYear).label('year').required(),
            })
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let response = await apiCall('POST', 'addYear', form);
                displayLog(response.code, response.message);
                this.props.history.push(process.env.PUBLIC_URL + `/years`);
            } else {
                displayLog(0, this.state.error.message)
            }
        });
    }
    changeValuesHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value } });
    }
    validateNumberField = (event) => {
        if (['+', '-', 'e'].includes(event.key)) {
            event.preventDefault()
        }
    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.submitHandler()
        }
    }
    goBack = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/years')
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                {
                                    this.props.match.params && this.props.match.params.yearId ?
                                        <h4 className="card-header-custom">Edit year</h4> :
                                        <h4 className="card-header-custom">Add year</h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Vehicle type*</Label>
                                            <Input type="select" name="selected_vehicle_type_id" onChange={(event) => this.changeValuesHandler(event)} value={this.state.form.selected_vehicle_type_id}>
                                                <option value={0} disabled>Select vehicle type*</option>
                                                {
                                                    this.state.vehicle_types.map(type => (
                                                        <option key={type.id} value={type.id}>{type.vehicle_type}</option>
                                                    ))
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Brands*</Label>
                                            <Input type="select" name="selected_brand_id" onChange={(event) => this.changeValuesHandler(event)} value={this.state.form.selected_brand_id}>
                                                <option value={0} disabled>Select brand</option>
                                                {
                                                    this.state.brands.map(brand => (
                                                        <option key={brand.id} value={brand.id}>{brand.brand}</option>
                                                    ))
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Year*</Label>
                                            <Input type="number" placeholder='Enter year'
                                                min={0}
                                                value={this.state.form.year}
                                                name='year' onChange={(event) => this.changeValuesHandler(event)}
                                                onKeyDown={(event) => { this.validateNumberField(event) }}
                                                onKeyPress={(event) => this.enterPressed(event)} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button color="secondary" className="black-btn" onClick={this.submitHandler} style={{ marginRight: '8px' }}>Submit</Button>
                                <Button color="secondary" className="black-btn" onClick={this.goBack}>Cancel</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default AddEditYear;
