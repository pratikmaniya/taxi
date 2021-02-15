import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import { validateSchema, apiCall, displayLog, capitalizeFirstLetter } from '../../utils/common';

class AddEditModel extends Component {
    state = {
        vehicle_types: [],
        brands: [],
        years: [],
        form: {
            model_name: '',
            selected_vehicle_type_id: 0,
            selected_brand_id: 0,
            selected_year_id: 0
        },
        error: {
            status: false,
            message: '',
        },
    }
    async componentDidMount() {
        let resVehicleTypes = await apiCall('POST', 'getAllVehicleTypes');
        let resBrands = await apiCall('POST', 'getAllBrands');
        let resYears = await apiCall('POST', 'getAllYears');
        this.setState({
            vehicle_types: resVehicleTypes.data.vehicle_types,
            brands: resBrands.data.brands,
            years: resYears.data.years
        })
        if (this.props.match.params && this.props.match.params.modelId) {
            let data = {
                model_id: this.props.match.params.modelId
            }
            const response = await apiCall('POST', 'getSingleModel', data);
            this.setState({
                form: {
                    ...this.state.form,
                    model_name: response.data.model ? response.data.model : '',
                    selected_vehicle_type_id: response.data.vehicle_type_id ? String(response.data.vehicle_type_id) : '',
                    selected_brand_id: response.data.brand_id ? String(response.data.brand_id) : '',
                    selected_year_id: response.data.year_id ? String(response.data.year_id) : ''
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
            this.setState({ brands: response.data.brands, years: [] })
        }
        if (this.state.form.selected_brand_id !== prevState.form.selected_brand_id) {
            let data = {
                brand_id: this.state.form.selected_brand_id
            },
                response = await apiCall('POST', 'getAllYears', data)
            this.setState({ years: response.data.years })
        }
    }
    submitHandler = async () => {
        let formData = {
            model: capitalizeFirstLetter(this.state.form.model_name.trim()),
            vehicle_type_id: this.state.form.selected_vehicle_type_id,
            brand_id: this.state.form.selected_brand_id,
            year_id: this.state.form.selected_year_id
        }
        if (this.props.match.params && this.props.match.params.modelId) {
            //EDIT
            formData.model_id = this.props.match.params.modelId.trim()
            await this.editModel(formData)
        } else {
            //ADD
            await this.addModel(formData)
        }
    }
    editModel = async (form) => {
        let schema = Joi.object().keys({
            model_id: Joi.string().required(),
            vehicle_type_id: Joi.string().strict().label('Vehicle type').required(),
            brand_id: Joi.string().strict().label('Brand').required(),
            year_id: Joi.string().strict().label('Year').required(),
            model: Joi.string().strict().label('Model name').required()
        })
        this.setState({ error: await validateSchema(form, schema) });
        if (!this.state.error.status) {
            let res = await apiCall('POST', 'editModel', form);
            displayLog(res.code, res.message);
            this.props.history.push(process.env.PUBLIC_URL + `/models`);
        } else {
            displayLog(0, this.state.error.message)
        }
    }
    addModel = async (form) => {
        let schema = Joi.object().keys({
            vehicle_type_id: Joi.string().strict().label('Vehicle type').required(),
            brand_id: Joi.string().strict().label('Brand').required(),
            year_id: Joi.string().strict().label('Year').required(),
            model: Joi.string().strict().label('Model name').required()
        })
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let response = await apiCall('POST', 'addModel', form);
                displayLog(response.code, response.message);
                this.props.history.push(process.env.PUBLIC_URL + `/models`);
            } else {
                displayLog(0, this.state.error.message)
            }
        });
    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.submitHandler()
        }
    }
    changeValuesHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value } });
    }
    goBack = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/models')
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                {
                                    this.props.match.params && this.props.match.params.brandId ?
                                        <h4 className="card-header-custom">Edit model</h4> :
                                        <h4 className="card-header-custom">Add model</h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Vehicle type*</Label>
                                            <Input type="select" name="selected_vehicle_type_id" onChange={(event) => this.changeValuesHandler(event)} value={this.state.form.selected_vehicle_type_id}>
                                                <option value={0} disabled>Select vehicle type</option>
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
                                            <Label>Brand*</Label>
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
                                            <Input type="select" name="selected_year_id" onChange={(event) => this.changeValuesHandler(event)} value={this.state.form.selected_year_id}>
                                                <option value={0} disabled>Select Year</option>
                                                {
                                                    this.state.years.map(year => (
                                                        <option key={year.id} value={year.id}>{year.year}</option>
                                                    ))
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Model name*</Label>
                                            <Input type="text" placeholder='Enter model name'
                                                value={this.state.form.model_name}
                                                name='model_name' onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
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

export default AddEditModel;
