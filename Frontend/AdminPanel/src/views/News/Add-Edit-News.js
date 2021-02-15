import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import Joi from 'joi-browser';
import CKEditor from "react-ckeditor-component";


import { validateSchema, apiCall, displayLog, capitalizeFirstLetter } from '../../utils/common';

class AddEditCollection extends Component {
    state = {
        vehicle_types: [],
        brands: [],
        years: [],
        models: [],
        selected_vehicle_types: [],
        selected_brands: [],
        selected_years: [],
        selected_models: [],
        form: {
            news_title: '',
            description: '',
            news_image: {}
        },
        preview_image: "",
        error: {
            status: false,
            message: '',
        },
    }
    async componentDidMount() {
        let data = {
            for_drop_down: true
        },
            resVehicleTypes = await apiCall('POST', 'getAllVehicleTypes', data);
        this.setState({ vehicle_types: resVehicleTypes.data.vehicle_types })
        if (this.props.match.params && this.props.match.params.newsId) {
            let data = {
                news_id: this.props.match.params.newsId
            }
            const response = await apiCall('POST', 'getSingleNews', data);
            this.setState({
                form: {
                    ...this.state.form,
                    news_title: response.data.news_title ? response.data.news_title : '',
                    description: response.data.description ? response.data.description : '',
                    news_image: {},
                },
                preview_image: response.data.image ? response.data.image : ''
            })
            if (response.data.vehicle_types && response.data.vehicle_types.length > 0) {
                this.setState({
                    selected_vehicle_types: response.data.vehicle_types ? resVehicleTypes.data.vehicle_types.filter(element => response.data.vehicle_types.includes(Number(element.id))) : []
                })
                if (response.data.brands && response.data.brands.length > 0) {
                    let data = {
                        for_drop_down: true,
                        vehicle_type_id_array: this.state.selected_vehicle_types.map(vehicle_type => vehicle_type.id)
                    },
                        resBrands = await apiCall('POST', 'getAllBrands', data);
                    this.setState({
                        selected_brands: response.data.brands ? resBrands.data.brands.filter(element => response.data.brands.includes(Number(element.id))) : [],
                    })
                    if (response.data.years && response.data.years.length > 0) {
                        let data = {
                            for_drop_down: true,
                            brand_id_array: this.state.selected_brands.map(brand => brand.id)
                        },
                            resYears = await apiCall('POST', 'getAllYears', data)
                        this.setState({
                            selected_years: response.data.years ? resYears.data.years.filter(element => response.data.years.includes(Number(element.id))) : [],
                        })
                        if (response.data.models && response.data.models.length > 0) {
                            let data = {
                                for_drop_down: true,
                                year_id_array: this.state.selected_years.map(year => year.id)
                            },
                                resModels = await apiCall('POST', 'getAllModels', data)
                            this.setState({
                                selected_models: response.data.models ? resModels.data.models.filter(element => response.data.models.includes(Number(element.id))) : [],
                            })
                        }
                    }
                }
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.state.selected_vehicle_types !== prevState.selected_vehicle_types) {
            if (this.state.selected_vehicle_types.length > 0) {
                let data = {
                    for_drop_down: true,
                    vehicle_type_id_array: this.state.selected_vehicle_types.map(vehicle_type => vehicle_type.id)
                },
                    response = await apiCall('POST', 'getAllBrands', data)
                let selected_vehicle_type_ids = this.state.selected_vehicle_types.map(vt => vt.id)
                this.setState({
                    brands: response.data.brands,
                    selected_brands: this.state.selected_brands.filter(brand => selected_vehicle_type_ids.includes(brand.vehicle_type_id))
                })
            } else {
                this.setState({ brands: [], selected_brands: [] })
            }
        }
        if (this.state.selected_brands !== prevState.selected_brands) {
            if (this.state.selected_brands.length > 0) {
                let data = {
                    for_drop_down: true,
                    brand_id_array: this.state.selected_brands.map(brand => brand.id)
                },
                    response = await apiCall('POST', 'getAllYears', data)
                let selected_brand_ids = this.state.selected_brands.map(b => b.id)
                this.setState({
                    years: response.data.years,
                    selected_years: this.state.selected_years.filter(year => selected_brand_ids.includes(year.brand_id))
                })
            } else {
                this.setState({ years: [], selected_years: [] })
            }
        }
        if (this.state.selected_years !== prevState.selected_years) {
            if (this.state.selected_years.length > 0) {
                let data = {
                    for_drop_down: true,
                    year_id_array: this.state.selected_years.map(year => year.id)
                },
                    response = await apiCall('POST', 'getAllModels', data)
                let selected_year_ids = this.state.selected_years.map(y => y.id)
                this.setState({
                    models: response.data.models,
                    selected_models: this.state.selected_models.filter(model => selected_year_ids.includes(model.year_id))
                })
            } else {
                this.setState({ models: [], selected_models: [] })
            }
        }
    }
    submitHandler = async () => {
        let formData = {
            news_title: capitalizeFirstLetter(this.state.form.news_title.trim()),
            description: capitalizeFirstLetter(this.state.form.description.trim()),
            news_image: this.state.form.news_image,
            vehicle_types: this.state.selected_vehicle_types.map(element => element.id),
            brands: this.state.selected_brands.map(element => element.id),
            years: this.state.selected_years.map(element => element.id),
            models: this.state.selected_models.map(element => element.id)
        }
        if (this.props.match.params && this.props.match.params.newsId) {
            //EDIT
            formData.news_id = this.props.match.params.newsId
            await this.editNews(formData)
        } else {
            //ADD
            await this.addNews(formData)
        }
    }
    editNews = async (form) => {
        let schema = Joi.object().keys({
            news_id: Joi.string().required(),
            news_title: Joi.string().strict().label('News title').required(),
            description: Joi.string().strict().label('Description').required(),
            news_image: Joi.object().label('News Image'),
            vehicle_types: Joi.array().label('Vehicle type'),
            brands: Joi.array().label('Brand'),
            years: Joi.array().label('Year'),
            models: Joi.array().label('Model'),
        })
        if (!this.state.form.news_image.name) {
            delete form.news_image
        }
        this.setState({ error: await validateSchema(form, schema) });
        if (!this.state.error.status) {
            let formData = new FormData()
            Object.entries(form).forEach(entry => {
                formData.append(entry[0], entry[1])
            })
            if (typeof this.state.form.news_image === "string") {
                formData.append("image", this.state.form.news_image)
            }
            let res = await apiCall('POST', 'editNews', formData);
            displayLog(res.code, res.message);
            this.props.history.push(process.env.PUBLIC_URL + `/news`);
        } else {
            displayLog(0, this.state.error.message)
        }
    }
    addNews = async (form) => {
        let schema = Joi.object().keys({
            news_title: Joi.string().strict().label('News title').required(),
            description: Joi.string().strict().label('Description').required(),
            news_image: Joi.object().label('News Image'),
            vehicle_types: Joi.array().label('Vehicle type'),
            brands: Joi.array().label('Brand'),
            years: Joi.array().label('Year'),
            models: Joi.array().label('Model'),
        })
        if (!form.news_image.name) {
            delete form.news_image
        }
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let formData = new FormData()
                Object.entries(form).forEach(entry => {
                    formData.append(entry[0], entry[1])
                })
                let response = await apiCall('POST', 'addNews', formData);
                displayLog(response.code, response.message);
                this.props.history.push(process.env.PUBLIC_URL + `/news`);
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
    selectHandler = (event) => {
        if (event.target.checked) {
            if (String(event.target.value) === "0") {
                this.setState({ [event.target.name]: [...this.state[event.target.id.split("/")[0]]] });
            } else {
                this.setState({ [event.target.name]: [...this.state[event.target.name], this.state[event.target.id.split("/")[0]].find(element => String(element.id) === String(event.target.value))] });
            }
        } else {
            if (String(event.target.value) === "0") {
                this.setState({ [event.target.name]: [] });
            } else {
                this.setState({ [event.target.name]: this.state[event.target.name].filter(element => (String(element.id) !== String(event.target.value))) });
            }
        }
    }
    clearImage = () => {
        let image = document.getElementById("news_image")
        image.value = null
        this.setState({ form: { ...this.state.form, news_image: "" }, preview_image: "" });
    }
    goBack = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/news')
    }

    onChangePolicy = (evt) => {
        var newContent = evt.editor.getData();
        let form = this.state.form;
        form.description = newContent
        this.setState({
            form: form
        })
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                {
                                    this.props.match.params && this.props.match.params.newsId ?
                                        <h4 className="card-header-custom">Edit News</h4> :
                                        <h4 className="card-header-custom">Add News</h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>News Image</Label>
                                            <div>
                                                <label className="custom-file-upload-btn" title="Upload News Image">
                                                    <span className="fa fa-picture-o"></span>&nbsp;Upload New Image
                                                <input type="file" accept=".jpg,.jpeg,.png" name="news_image" id="news_image" onChange={(event) => this.fileSelectHandler(event)} />
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
                                                    <img className="form-preview_img" src={this.state.preview_image} alt="news preview"></img>
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
                                            <Label>News title*</Label>
                                            <Input type="text" placeholder='Enter title'
                                                value={this.state.form.news_title}
                                                name='news_title' onChange={(event) => this.changeValuesHandler(event)}
                                                onKeyPress={(event) => this.enterPressed(event)} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="12">
                                        <FormGroup>
                                            <Label>Description*</Label>
                                            <CKEditor
                                                activeClass="p10"
                                                content={this.state.form.description}
                                                events={{
                                                    "change": this.onChangePolicy
                                                }}
                                            />
                                            {/* <Input type="textarea" rows="5" placeholder='Enter description'
                                                value={this.state.form.description}
                                                name='description' onChange={(event) => this.changeValuesHandler(event)}
                                                onKeyPress={(event) => this.enterPressed(event)} /> */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {
                                    this.state.vehicle_types.length > 0
                                        ?
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Vehicle types</Label>
                                                    <Row>
                                                        <div className='col-12' key={0}>
                                                            <input type="checkbox" id={"vehicle_types/" + 0} name="selected_vehicle_types" value={0} onChange={(event) => this.selectHandler(event)} checked={this.state.vehicle_types.every(vehicle_type => { return this.state.selected_vehicle_types.findIndex(vt => String(vt.id) === String(vehicle_type.id)) >= 0 })} />
                                                            <label htmlFor={"vehicle_types/" + 0}>Select All</label>
                                                        </div>
                                                        {
                                                            this.state.vehicle_types.map(vehicle_type => (
                                                                <div className='col-3' key={vehicle_type.id}>
                                                                    <input type="checkbox" id={"vehicle_types/" + vehicle_type.id} name="selected_vehicle_types" value={vehicle_type.id} onChange={(event) => this.selectHandler(event)} checked={this.state.selected_vehicle_types.findIndex(vt => String(vt.id) === String(vehicle_type.id)) >= 0} />
                                                                    <label htmlFor={"vehicle_types/" + vehicle_type.id}>{vehicle_type.vehicle_type}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        :
                                        null
                                }
                                {
                                    this.state.brands.length > 0
                                        ?
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Brands</Label>
                                                    <Row>
                                                        <div className='col-12' key={0}>
                                                            <input type="checkbox" id={"brands/" + 0} name="selected_brands" value={0} onChange={(event) => this.selectHandler(event)} checked={this.state.brands.every(vehicle_type => { return this.state.selected_brands.findIndex(vt => String(vt.id) === String(vehicle_type.id)) >= 0 })} />
                                                            <label htmlFor={"brands/" + 0}>Select All</label>
                                                        </div>
                                                        {
                                                            this.state.brands.map(brand => (
                                                                <div className='col-4' key={brand.id}>
                                                                    <input type="checkbox" name="selected_brands" id={"brands/" + brand.id} value={brand.id} onChange={(event) => this.selectHandler(event)} checked={this.state.selected_brands.findIndex(b => String(b.id) === String(brand.id)) >= 0} />
                                                                    <label htmlFor={"brands/" + brand.id}>{brand.brand + "(" + brand.vehicle_type + ")"}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        :
                                        null
                                }
                                {
                                    this.state.years.length > 0
                                        ?
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Years</Label>
                                                    <Row>
                                                        <div className='col-12' key={0}>
                                                            <input type="checkbox" id={"years/" + 0} name="selected_years" value={0} onChange={(event) => this.selectHandler(event)} checked={this.state.years.every(vehicle_type => { return this.state.selected_years.findIndex(vt => String(vt.id) === String(vehicle_type.id)) >= 0 })} />
                                                            <label htmlFor={"years/" + 0}>Select All</label>
                                                        </div>
                                                        {
                                                            this.state.years.map(year => (
                                                                <div className='col-6' key={year.id}>
                                                                    <input type="checkbox" name="selected_years" id={"years/" + year.id} value={year.id} onChange={(event) => this.selectHandler(event)} checked={this.state.selected_years.findIndex(y => String(y.id) === String(year.id)) >= 0} />
                                                                    <label htmlFor={"years/" + year.id}>{year.year + "(" + year.vehicle_type + " - " + year.brand + ")"}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        :
                                        null
                                }
                                {
                                    this.state.models.length > 0
                                        ?
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Models</Label>
                                                    <Row>
                                                        <div className='col-12' key={0}>
                                                            <input type="checkbox" id={"models/" + 0} name="selected_models" value={0} onChange={(event) => this.selectHandler(event)} checked={this.state.models.every(vehicle_type => { return this.state.selected_models.findIndex(vt => String(vt.id) === String(vehicle_type.id)) >= 0 })} />
                                                            <label htmlFor={"models/" + 0}>Select All</label>
                                                        </div>
                                                        {
                                                            this.state.models.map(model => (
                                                                <div className='col-6' key={model.id}>
                                                                    <input type="checkbox" name="selected_models" id={"models/" + model.id} value={model.id} onChange={(event) => this.selectHandler(event)} checked={this.state.selected_models.findIndex(m => String(m.id) === String(model.id)) >= 0} />
                                                                    <label htmlFor={"models/" + model.id}>{model.model + " - (" + model.vehicle_type + " - " + model.brand + " - " + model.year + ")"}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        :
                                        null
                                }
                            </CardBody>
                            <CardFooter>
                                <Button color="secondary" className="black-btn" onClick={this.submitHandler} style={{ marginRight: '8px' }}>Submit</Button>
                                <Button color="secondary" className="black-btn" onClick={this.goBack}>Cancel</Button>
                            </CardFooter>
                        </Card >
                    </Col >
                </Row >
            </div >
        )
    }
}

export default AddEditCollection;
