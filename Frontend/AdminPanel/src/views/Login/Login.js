import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import Joi from 'joi-browser';

import { validateSchema, formValueChangeHandler, apiCall, displayLog } from '../../utils/common';
import config from '../../config';

class Login extends Component {
  state = {
    form: {
      email: '',
      password: ''
    },
    error: {
      status: false,
      message: ''
    },
    forgotPassword: false
  }
  loginHandler = async () => {
    let schema = Joi.object().keys({
      email: Joi.string().trim().regex(config.EMAIL_REGEX).email().required(),
      password: Joi.string().trim().min(6).required()
    })
    this.setState({ error: await validateSchema(this.state.form, schema) });
    if (!this.state.error.status) {
      const response = await apiCall('POST', 'signin', this.state.form);
      displayLog(response.code, response.message);
      localStorage.setItem('MOTO_AUTH_TOKEN', response.data.auth_token);
      this.props.history.push(process.env.PUBLIC_URL + '/dashboard');
    }
  }
  changeValuesHandler = (event) => {
    this.setState({ form: formValueChangeHandler(event, this.state.form) });
  }
  enterPressed = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      this.loginHandler()
    }
  }
  forgotPasswordHandler = (flag) => {
    flag ? this.setState({ forgotPassword: false }) : this.setState({ forgotPassword: true })
  }
  sendEmail = async () => {
    let response = await apiCall('POST', 'sendForgotPasswordMail', { email: this.state.form.email });
    displayLog(response.code, response.message);
    this.setState({ forgotPassword: false })
  }
  render() {
    if (localStorage.getItem('MOTO_AUTH_TOKEN')) return <Redirect to={process.env.PUBLIC_URL + '/'} />;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {
                      this.state.forgotPassword ? <h1>Forgot password</h1> : <h1>Login</h1>}
                    <p className="text-muted">Sign In to your account</p>
                    {
                      this.state.error.status ?
                        <Alert color="secondary">
                          {this.state.error.message}
                        </Alert>
                        : null
                    }
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="far fa-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="username" name="email" value={this.state.form.email} onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
                    </InputGroup>
                    {this.state.forgotPassword ? null :
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={this.state.form.password} onChange={(event) => this.changeValuesHandler(event)} onKeyPress={(event) => this.enterPressed(event)} />
                      </InputGroup>
                    }
                    <Row>
                      {
                        this.state.forgotPassword ?
                          <React.Fragment>
                            <Col className="text-left">
                              <Button color="secondary" className="px-4 black-btn" onClick={(event) => this.sendEmail(event)}>Submit</Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0" onClick={() => this.forgotPasswordHandler(true)}>Login here</Button>
                            </Col>
                          </React.Fragment>
                          :
                          <Col>
                            <Button color="secondary" className="px-4 black-btn" onClick={(event) => this.loginHandler(event)}>Login</Button>
                          </Col>
                      }
                      {
                        this.state.forgotPassword ? null :
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0" onClick={() => this.forgotPasswordHandler()}>Forgot password?</Button>
                          </Col>
                      }
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
