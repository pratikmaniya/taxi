import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import { validateSchema, apiCall, displayLog, capitalizeFirstLetter } from '../../utils/common';

class AddEditBrand extends Component {
    state = {
        vehicle_types: [],
        form: {
            brand_name: '',
            selected_vehicle_id: 0,
            brand_image: "",
            old_brand_image: ''
        },
        preview_image: "",
        error: {
            status: false,
            message: '',
        },
    }
    async componentDidMount() {
        const data = {
            for_drop_down: true
        }
        const res = await apiCall('POST', 'getAllvehicleTypes', data);
        this.setState({ vehicle_types: res.data.vehicle_types })
        if (this.props.match.params && this.props.match.params.brandId) {
            let data = {
                brand_id: this.props.match.params.brandId
            }
            const response = await apiCall('POST', 'getSingleBrand', data);
            this.setState({
                form: {
                    ...this.state.form,
                    brand_name: response.data.brand ? response.data.brand : '',
                    selected_vehicle_id: response.data.vehicle_type_id ? String(response.data.vehicle_type_id) : '',
                    brand_image: "",
                    old_brand_image: response.data.image ? response.data.image : ''
                },
                preview_image: response.data.image ? response.data.image : ''
            })
        }
    }
    submitHandler = async () => {
        let formData = {
            brand: capitalizeFirstLetter(this.state.form.brand_name.trim()),
            vehicle_type_id: this.state.form.selected_vehicle_id,
        }
        if (this.state.form.brand_image) {
            formData.brand_image = this.state.form.brand_image
        }
        if (this.props.match.params && this.props.match.params.brandId) {
            formData.old_brand_image = this.state.form.old_brand_image
            formData.brand_id = this.props.match.params.brandId.trim()
            await this.editBrand(formData)
        } else {
            await this.addBrand(formData)
        }
    }
    editBrand = async (form) => {
        let schema = Joi.object().keys({
            brand_id: Joi.string().required(),
            vehicle_type_id: Joi.string().strict().label('Vehicle type').required(),
            brand: Joi.string().strict().label('brand name').required(),
            old_brand_image: Joi.string().allow(""),
            brand_image: Joi.object().label('Brand Image'),
        })
        this.setState({ error: await validateSchema(form, schema) });
        if (!this.state.error.status) {
            let formData = new FormData()
            Object.entries(form).forEach(entry => {
                formData.append(entry[0], entry[1])
            })
            let res = await apiCall('POST', 'editBrand', formData);
            displayLog(res.code, res.message);
            this.props.history.push(process.env.PUBLIC_URL + `/brands`);
        } else {
            displayLog(0, this.state.error.message)
        }
    }
    addBrand = async (form) => {
        let schema = Joi.object().keys({
            vehicle_type_id: Joi.string().strict().label('vehicle type').required(),
            brand: Joi.string().strict().label('brand name').required(),
            brand_image: Joi.object().label('Brand Image'),
        })
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let formData = new FormData()
                Object.entries(form).forEach(entry => {
                    formData.append(entry[0], entry[1])
                })
                let response = await apiCall('POST', 'addBrand', formData);
                displayLog(response.code, response.message);
                this.props.history.push(process.env.PUBLIC_URL + `/brands`);
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
    fileSelectHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.files[0] }, preview_image: URL.createObjectURL(event.target.files[0]) });
    }
    clearImage = () => {
        let image = document.getElementById("brand_image")
        image.value = null
        this.setState({ form: { ...this.state.form, brand_image: "", old_brand_image: "" }, preview_image: "" });
    }
    goBack = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/brands')
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
                                        <h4 className="card-header-custom">Edit brand</h4> :
                                        <h4 className="card-header-custom">Add brand</h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Brand Image*</Label>
                                            <div>
                                                <label className="custom-file-upload-btn" title="Upload Brand Image">
                                                    <span className="fa fa-picture-o"></span>&nbsp;Upload New Image
                                                <input type="file" accept=".jpg,.jpeg,.png" name="brand_image" id="brand_image" onChange={(event) => this.fileSelectHandler(event)} />
                                                </label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {
                                    this.state.preview_image && this.state.preview_image.length > 0
                                        ?
                                        <Row>
                                            <Col xs="12" md="6">
                                                <div className="preview-img-container">
                                                    <img className="form-preview_img" src={this.state.preview_image} alt="brand preview"></img>
                                                    <span className="fa fa-times preview-delete-icon" onClick={this.clearImage}></span>
                                                </div>
                                            </Col>
                                        </Row>

                                        :
                                        null
                                }
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Vehicle type*</Label>
                                            <Input type="select" name="selected_vehicle_id" onChange={(event) => this.changeValuesHandler(event)} value={this.state.form.selected_vehicle_id}>
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
                                            <Label>Brand name*</Label>
                                            <Input type="text" placeholder='Enter brand name'
                                                value={this.state.form.brand_name}
                                                name='brand_name' onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
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

export default AddEditBrand;
