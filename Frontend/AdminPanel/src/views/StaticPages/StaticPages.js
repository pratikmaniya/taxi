import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import CKEditor from "react-ckeditor-component";

import { apiCall, displayLog } from '../../utils/common';

class staticPages extends React.Component {
    state = {
        activeTab: '1',
        toggle: '1',
        setActiveTab: '1',
        res: "",
        privacy_policy: '',
        terms_and_condition: '',
        getting_started: '',
        troubleshooting: ''
    }
    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }
    componentDidMount() {
        this.getPageData();
    }
    getPageData = async () => {
        const res = await apiCall('GET', 'getAllPages');
        this.setState({
            privacy_policy: res.data[0].privacy_policy,
            terms_and_condition: res.data[0].terms_and_condition,
            getting_started: res.data[0].getting_started,
            troubleshooting: res.data[0].troubleshooting
        })
    }
    onChangePolicy = (evt) => {
        let newContent = evt.editor.getData();
        this.setState({
            privacy_policy: newContent
        })
    }
    onChangeTerms = (evt) => {
        let newContent = evt.editor.getData();
        this.setState({
            terms_and_condition: newContent
        })
    }
    onChangeGettingStart = (evt) => {
        let newContent = evt.editor.getData();
        this.setState({
            getting_started: newContent
        })
    }
    onChangeTroubleshoot = (evt) => {
        let newContent = evt.editor.getData();
        this.setState({
            troubleshooting: newContent
        })
    }
    onSubmitHandler = async (flag) => {
        let res;
        switch (flag) {
            case 1: // privacy policy
                res = await apiCall('POST', 'updatePages', { privacy_policy: this.state.privacy_policy });
                break;
            case 2: // for terms
                res = await apiCall('POST', 'updatePages', { terms_and_condition: this.state.terms_and_condition });
                break;
            case 3: // getting start
                res = await apiCall('POST', 'updatePages', { getting_started: this.state.getting_started });
                break;
            case 4: // for troublesoot
                res = await apiCall('POST', 'updatePages', { troubleshooting: this.state.troubleshooting });
                break;
            default:
                break
        }
        this.getPageData();
        displayLog(res.code, res.message);
    }
    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Privacy Policy
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Terms of use
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '3' ? 'active' : ''}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Getting Started
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '4' ? 'active' : ''}
                            onClick={() => { this.toggle('4'); }}
                        >
                            Troubleshooting
                    </NavLink>
                    </NavItem>
                </Nav >
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Privacy Policy</h4>
                                <CKEditor
                                    activeClass="p10"
                                    content={this.state.privacy_policy}
                                    events={{
                                        "change": this.onChangePolicy
                                    }}
                                />
                                <Button className="secondary black-btn m-2" onClick={() => this.onSubmitHandler(1)}>Submit</Button>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <h4>Terms of use</h4>
                                <CKEditor
                                    activeClass="p10"
                                    content={this.state.terms_and_condition}
                                    events={{
                                        "change": this.onChangeTerms
                                    }}
                                />
                                <Button className="secondary black-btn m-2" onClick={() => this.onSubmitHandler(2)} > Submit</Button>
                            </Col>

                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <h4>Getting Started</h4>
                                <CKEditor
                                    activeClass="p10"
                                    content={this.state.getting_started}
                                    events={{
                                        "change": this.onChangeGettingStart
                                    }}
                                />
                                <Button className="secondary black-btn m-2" onClick={() => this.onSubmitHandler(3)} > Submit</Button>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="12">
                                <h4>Troubleshooting</h4>
                                <CKEditor
                                    activeClass="p10"
                                    content={this.state.troubleshooting}
                                    events={{
                                        "change": this.onChangeTroubleshoot
                                    }}
                                />

                                <Button className="secondary black-btn m-2" onClick={() => this.onSubmitHandler(4)} > Submit</Button>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div >
        );
    }
}

export default staticPages;
