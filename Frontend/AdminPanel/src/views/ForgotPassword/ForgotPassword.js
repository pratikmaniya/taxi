import React from 'react';
import { Input, Card, Row, Col, Container, CardBody, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import Joi from 'joi-browser';

import { apiCall, formValueChangeHandler, validateSchema, displayLog } from '../../utils/common';

class ForgotPassword extends React.Component {
    state = {
        isDialogOpen: false,
        form: {

            newPassword: "",
            confirmPassword: "",
        },
        error: {
            status: false,
            message: ''
        }
    }
    submitHandler = async () => {
        let schema = Joi.object().keys({
            newPassword: Joi.string().strict().trim().min(8).label('New Password').required(),
            confirmPassword: Joi.string().strict().trim().min(8).label('Confirm Password').required(),
        })
        let err = await validateSchema(this.state.form, schema);
        if (!err && this.state.form.newPassword !== this.state.form.confirmPassword) {
            displayLog(0, 'New Password and confirm password must be same!');
            err = {
                status: true,
                message: 'New Password and confirm password must be same!'
            }
        }
        this.setState({ error: err })
        if (!this.state.error.status) {
            let data = {
                new_password: this.state.form.newPassword,
                confirm_new_password: this.state.form.confirmPassword
            }
            let headers = {
                language: "en",
                web_app_version: "1.0.0",
                auth_token: this.props.match.params.token
            }
            const response = await apiCall('POST', 'resetPassword', data, "", headers);
            displayLog(response.code, response.message);
            if (response.code) {
                this.props.history.push(process.env.PUBLIC_URL + '/login');
            }
        } else {
            displayLog(0, this.state.error.message);
        }

    }
    enterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.submitHandler()
        }
    }
    changeValuesHandler = (event) => {
        this.setState({ form: formValueChangeHandler(event, this.state.form) });
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="p-4">
                                <CardBody>
                                    <h1 className="mb-4">Reset Password</h1>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="New password" autoComplete="current-password" name="newPassword" value={this.state.form.newPassword} onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
                                    </InputGroup>

                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Confirm password" autoComplete="current-password" name="confirmPassword" value={this.state.form.confirmPassword} onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
                                    </InputGroup>
                                    <Row>
                                        <Col className="text-left">
                                            <Button color="secondary" className="px-4 black-btn" onClick={() => this.submitHandler()}>Submit</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ForgotPassword;