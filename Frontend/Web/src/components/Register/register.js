import React, { Component } from "react";
import { Input } from 'reactstrap'
import Joi from 'joi-browser';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerTaxi } from '../../store/actions';
import { validateSchema, displayLog } from '../../utils/functions';
import config from "../../utils/config";

class Register extends Component {
    state = {
        form: {
            phone_no: '',
            email: '',
            first_name: '',
            last_name: '',
            plate_no: '',
            brand_name: '',
            brand_model: '',
            colour: '',
            license_image_front: null,
            license_image_back: null,
            vehicle_image: null,
            proof_of_eligibility_image: null
        },
        currentStep: 5
    }
    inputChangeHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value } });
    }
    fileSelectHandler = (event) => {
        console.log(event.target.files, event.target.file)
        if (event.target.files[0].size <= 1000000) {
            this.setState({ form: { ...this.state.form, [event.target.name]: event.target.files[0] } });
        } else {
            displayLog(0, 'The image must be less than 1MB. Please compress the image to make it smaller')
        }
    }
    submitHandler = async () => {
        const formData = {
            ...this.state.form
        }
        await this.addBrand(formData)
    }
    addBrand = async (form) => {
        let schema = Joi.object().keys({
            phone_no: Joi.string().label("Phone Number").regex(config.MOBILE_REGEX).required(),
            email: Joi.string().label("Email").regex(config.EMAIL_REGEX).required(),
            first_name: Joi.string().label("First Name").required(),
            last_name: Joi.string().label("Last Name").required(),
            plate_no: Joi.string().label("Vehicle Plate Number").required(),
            brand_name: Joi.string().label("Vehicle Brand Name").required(),
            brand_model: Joi.string().label("Vehicle Brand Model").required(),
            colour: Joi.string().label("Vehicle Colour").required(),
            license_image_front: Joi.object().label("Taxi Badge/Driver's License Image Front").required(),
            license_image_back: Joi.object().label("Taxi Badge/Driver's License Image Back").required(),
            vehicle_image: Joi.object().label('vehicle Image').required(),
            proof_of_eligibility_image: Joi.object().label('Proof od Eligibility').required()
        })
        console.log(form)
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let formData = new FormData()
                Object.entries(form).forEach(entry => {
                    formData.append(entry[0], entry[1])
                })
                await this.props.registerTaxi(formData)
                if (this.props.registerTaxiRes && this.props.registerTaxiRes.code === 1) {
                    displayLog(1, this.props.registerTaxiRes.message)
                    this.props.history.push(process.env.PUBLIC_URL + `/`);
                } else {
                    displayLog(0, this.props.registerTaxiRes.message)
                }
            } else {
                displayLog(0, this.state.error.message)
            }
        });
    }
    render() {
        return (
            <div style={{ maxWidth: '800px', margin: '40px auto' }}>
                <div className="container" style={{ border: '2px solid #1a73e8' }}>
                    <div style={{ padding: '50px 10%' }}>
                        <h2 className="text-center mb-4">Register Taxi</h2>
                        <div className="row">
                            <div className="fieldset col-12">
                                <label>Phone number*</label>
                                <Input type="text" name='phone_no' value={this.state.phone_no} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Email*</label>
                                <Input type="text" name='email' value={this.state.email} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>First Name*</label>
                                <Input type="text" name='first_name' value={this.state.first_name} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Last Name*</label>
                                <Input type="text" name='last_name' value={this.state.last_name} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Vehicle Plate Number*</label>
                                <Input type="text" name='plate_no' value={this.state.plate_no} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Vehicle Brand Name*</label>
                                <Input type="text" placeholder="Honda/Toyota" name='brand_name' value={this.state.brand_name} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Vehicle Brand Model*</label>
                                <Input type="text" placeholder="Civic/Corolia" name='brand_model' value={this.state.brand_model} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Vehicle Colour*</label>
                                <Input type="text" name='colour' value={this.state.colour} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="fieldset col-12">
                                <label>Please Attach Driver's Taxi Badge/Driver's License Image Front*</label>
                                <Input type="file" name='license_image_front' value={this.state.license_image_front} onChange={this.fileSelectHandler} accept="image/x-png,image/gif,image/jpeg" />
                            </div>
                            <div className="fieldset col-12">
                                <label>Please Attach Driver's Taxi Badge/Driver's License Image Back*</label>
                                <Input type="file" name='license_image_back' value={this.state.license_image_back} onChange={this.fileSelectHandler} accept="image/x-png,image/gif,image/jpeg" />
                            </div>
                            <div className="fieldset col-12">
                                <label>Please Attach Image Of Vehicle*</label>
                                <Input type="file" name='vehicle_image' value={this.state.vehicle_image} onChange={this.fileSelectHandler} accept="image/x-png,image/gif,image/jpeg" />
                            </div>
                            <div className="fieldset col-12">
                                <label>Please Attach Proof Of Eligibility To Drive This Vehicle*</label>
                                <Input type="file" name='proof_of_eligibility_image' value={this.state.proof_of_eligibility_image} onChange={this.fileSelectHandler} accept="image/x-png,image/gif,image/jpeg" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center p-5">
                        <button type="button" className="smallBtn" onClick={this.submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registerTaxiRes: state.reducer.registerTaxiRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerTaxi: (reqData) => dispatch(registerTaxi(reqData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));