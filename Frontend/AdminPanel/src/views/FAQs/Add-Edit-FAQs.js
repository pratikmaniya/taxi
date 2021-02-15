import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import Joi from 'joi-browser';
import CKEditor from "react-ckeditor-component";


import { validateSchema, apiCall, displayLog, capitalizeFirstLetter } from '../../utils/common';

class AddEditFAQ extends Component {
    state = {
        form: {
            question: '',
            answer: '',
        },
        vehicle_types: [],
        error: {
            status: false,
            message: '',
        },
    }
    async componentDidMount() {
        if (this.props.match.params && this.props.match.params.faqId) {
            let data = {
                faq_id: this.props.match.params.faqId
            }
            const response = await apiCall('POST', 'getSingleFAQ', data);
            this.setState({
                form: {
                    ...this.state.form,
                    question: response.data.question ? response.data.question : '',
                    answer: response.data.answer ? response.data.answer : ''
                }
            })
        }
    }
    submitHandler = async () => {
        let formData = {
            question: capitalizeFirstLetter(this.state.form.question.trim()),
            answer: this.state.form.answer.trim()
        }
        if (this.props.match.params && this.props.match.params.faqId) {
            //EDIT
            formData.faq_id = this.props.match.params.faqId.trim()
            await this.editFAQ(formData)
        } else {
            //ADD
            await this.addFAQ(formData)
        }
    }
    editFAQ = async (form) => {
        let schema = Joi.object().keys({
            faq_id: Joi.string().required(),
            question: Joi.string().strict().label('Question').required(),
            answer: Joi.string().strict().label('Answer').required(),
        })
        this.setState({ error: await validateSchema(form, schema) });
        if (!this.state.error.status) {
            let res = await apiCall('POST', 'editFAQ', form);
            displayLog(res.code, res.message);
            this.props.history.push(process.env.PUBLIC_URL + `/FrequantlyAskQuestions`);
        } else {
            displayLog(0, this.state.error.message)
        }
    }
    addFAQ = async (form) => {
        let schema = Joi.object().keys({
            question: Joi.string().strict().label('Question').required(),
            answer: Joi.string().strict().label('Answer').required(),
        })
        this.setState({ error: await validateSchema(form, schema) }, async () => {
            if (!this.state.error.status) {
                let response = await apiCall('POST', 'addFAQ', form);
                displayLog(response.code, response.message);
                this.props.history.push(process.env.PUBLIC_URL + `/FrequantlyAskQuestions`);
            } else {
                displayLog(0, this.state.error.message)
            }
        });
    }
    onChangePolicy = (evt) => {
            var newContent = evt.editor.getData();
            console.log('\n\n\n-->',newContent);
            let form = this.state.form;
            form.answer = newContent
            this.setState({
                form: form
            })
        }
    changeValuesHandler = (event, editor, flag) => {
            this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value } });
    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.submitHandler()
        }
    }
    goBack = () => {
        this.props.history.push(process.env.PUBLIC_URL + '/FrequantlyAskQuestions')
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                {
                                    this.props.match.params && this.props.match.params.faqId ?
                                        <h4 className="card-header-custom">Edit FAQ</h4> :
                                        <h4 className="card-header-custom">Add FAQ</h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6">
                                        <FormGroup>
                                            <Label>Question*</Label>
                                            <Input type="text" placeholder='Enter question'
                                                value={this.state.form.question}
                                                name='question' onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="12">
                                        <FormGroup>
                                            <Label>Answer*</Label>
                                            <CKEditor
                                                activeClass="p10"
                                                content={this.state.form.answer}
                                                events={{
                                                    "change": this.onChangePolicy
                                                }}
                                            />
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

export default AddEditFAQ;
