import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import { validateSchema, apiCall, displayLog, capitalizeFirstLetter } from '../../utils/common';

class AddEditVehicleType extends Component {
    state = {
        form: {
            vehicle_type: '',
            vehicle_type_image: '',
            old_vehicle_type_image: ''
        },
        preview_image: "",
        error: {
            status: false,
            message: '',
        },
    }
    async componentDidMount() {
        if (this.props.match.params && this.props.match.params.vehicleTypeId) {
            let data = {
                vehicle_type_id: this.props.match.params.vehicleTypeId
            }
            const response = await apiCall('POST', 'getSingleVehicleType', data);
            this.setState({
                form: {
                    ...this.state.form,
                    vehicle_type: response.data ? response.data.vehicle_type : '',
                    vehicle_type_image: "",
                    old_vehicle_type_image: response.data.image ? response.data.image : ''
                },
                preview_image: response.data.image ? response.data.image : '',
            })
        }
    }
    submitHandler = async () => {
        let formData = {
            vehicle_type: capitalizeFirstLetter(this.state.form.vehicle_type.trim()),

        }
        if (this.state.form.vehicle_type_image) {
            formData.vehicle_type_image = this.state.form.vehicle_type_image
        }
        if (this.props.match.params && this.props.match.params.vehicleTypeId) {
            formData.old_vehicle_type_image = this.state.form.old_vehicle_type_image
            formData.vehicle_type_id = this.props.match.params.vehicleTypeId.trim()
            await this.editVehicleType(formData)
        } else {
            await this.addVehicleType(formData)
        }
    }
    editVehicleType = async (form) => {
        let schema = Joi.object().keys({
            vehicle_type_id: Joi.string().strict().required(),
            vehicle_type: Joi.string().strict().label('Vehicle type').required(),
            old_vehicle_type_image: Joi.string().allow(""),
            vehicle_type_image: Joi.object().label('Vehicle Type Image')
        })
        this.setState({ error: await validateSchema(form, schema) });
        if (!this.state.error.status) {
            let formData = new FormData()
            Object.entries(form).forEach(entry => {
                formData.append(entry[0], entry[1])
            })
            let res = await apiCall('POST', 'editVehicleType', formData);
            displayLog(res.code, res.message);
            this.props.history.push(process.env.PUBLIC_URL + `/vehicleTypes`);
        } else {
            displayLog(0, this.state.error.message)
        }
    }
    addVehicleType = async (form) => {
        let schema = Joi.object().keys({
            vehicle_type: Joi.string().strict().label('Vehicle type').required(),
            vehicle_type_image: Joi.object().label('Vehicle Type Image')
        })
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let formData = new FormData()
                Object.entries(form).forEach(entry => {
                    formData.append(entry[0], entry[1])
                })
                let response = await apiCall('POST', 'addVehicleType', formData);
                displayLog(response.code, response.message);
                this.props.history.push(process.env.PUBLIC_URL + `/vehicleTypes`);
            } else {
                displayLog(0, this.state.error.message)
            }
        })
    }
    changeValuesHandler = (event) => {
        this.setState({ form: { ...this.state.form, vehicle_type: event.target.value } });
    }
    fileSelectHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.files[0] }, preview_image: URL.createObjectURL(event.target.files[0]) });
    }
    clearImage = () => {
        let image = document.getElementById("vehicle_type_image")
        image.value = null
        this.setState({ form: { ...this.state.form, vehicle_type_image: "", old_vehicle_type_image: "" }, preview_image: "" });
    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.submitHandler()
        }
    }
    goBack = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/vehicleTypes')
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                {
                                    this.props.match.params && this.props.match.params.vehicleTypeId ?
                                        <h4 className="card-header-custom">Edit vehicle type</h4> :
                                        <h4 className="card-header-custom">Add vehicle type</h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Vehicle Type Image*</Label>
                                            <div>
                                                <label className="custom-file-upload-btn" title="Upload Vehicle Type Image">
                                                    <span className="fa fa-picture-o"></span>&nbsp;Upload New Image
                                                <input type="file" accept=".jpg,.jpeg,.png" name="vehicle_type_image" id="vehicle_type_image" onChange={(event) => this.fileSelectHandler(event)} />
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
                                                    <img className="form-preview_img" src={this.state.preview_image} alt="vehicle type preview"></img>
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
                                            <Input type="text" placeholder='Enter vehicle type name'
                                                value={this.state.form.vehicle_type}
                                                name='vehicle_type' onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
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

export default AddEditVehicleType;
