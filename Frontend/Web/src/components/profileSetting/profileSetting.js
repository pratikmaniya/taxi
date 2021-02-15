import React, { Component } from "react";
// import { Dropdown } from 'primereact/dropdown';
import routes from '../../Routes';
// import { withRouter, Link } from 'react-router-dom';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Header from '../common/header';
import Footer2 from '../common/footer2';
import * as common from '../../utils/functions';
import { changePassword } from '../../store/actions/auth';
import { editProfile } from '../../store/actions/salon'
import {
    getProfileReq,
    getStateReq,
    getCityReq,
    addLessorName,
    getLessorAddress,
    addLessorAddress,
    editLessorAddress,
    getLessorAddressByID,
    deleteLessorAddress,
    getLessor,
    addPremiseAddress,
    editPremiseAddress,
    getPremiseAddress,
    deletePremiseAddress,
    // GetPropertyAddressById,
}
    from '../../store/actions/customers'
import { EMAIL_REGEX, STORAGE_KEYS, APP_NAME } from '../../utils/constants';
import { Alert } from 'reactstrap';
import $ from 'jquery';
import * as Types from '../../store/actions/actionTypes';
import store from '../../utils/store';
import alertify from 'alertifyjs';
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import './style.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
import messages from '../../utils/messages';
class ProfileSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity1: null,
            selectedState: '',
            selectedCity: '',
            userData: JSON.parse(localStorage.getItem('DATA')),
            formValues: {
                old_password: '',
                new_password: '',
                confirm_new_password: '',
                first_name: '',
                last_name: '',
                email: '',
                user_id: JSON.parse(localStorage.getItem('DATA')).id,
                lessor_name: '',
                street1: '',
                street2: '',
                zipcode: '',
                company_name: '',
                law_firm_name: '',
                user_type: '',
                name: '',
                Prestreet1: '',
                Prestreet2: '',
                Prezipcode: '',
                Lesstreet1: '',
                Lesstreet2: '',
                Leszipcode: '',

            },
            error: '',
            errorField: '',
            ToggleInputModal: '',
            profile: [],
            profileOpen: false,
            lessorOpen: false,
            premiseOpen: false,
            PremiseAddOpen: false,
            stateList: [],
            cityList: [],
            selectedStateIds: '',
            lessorAddress: [],
            state_id: '',
            city_id: '',
            editLessorId: '',
            userNameList: [],
            selectedUser: '',
            selectedUserId: '',
            PreselectedState: '',
            PreselectedCity: '',
            PreselectedStateId: '',
            PreselectedCityId: '',
            LesselectedState: '',
            LesselectedCity: '',
            LesselectedStateId: '',
            LesselectedCityId: '',
            PremiseAddress: []

        };
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        this.onCityChange = this.onCityChange.bind(this);
    }

    componentDidMount = async () => {
        await this.getProfile()
        await this.getState()
        await this.getLessorAddress()
        await this.getPremiseAddress()
    }

    clearState = () => {
        let formValues = this.state.formValues;
        formValues.lessor_name = '';
        formValues.Lesstreet1 = '';
        formValues.Lesstreet2 = '';
        formValues.LesselectedState = '';
        formValues.LesselectedCity = '';
        formValues.Leszipcode = '';
        formValues.old_password = '';
        formValues.new_password = '';
        formValues.confirm_new_password = '';


        this.setState({
            formValues: formValues
        })
    }

    getProfile = async () => {
        let reqData = {
            user_id: this.state.formValues.user_id
        }
        await this.props.getProfileReq(reqData)
        if (this.props.getProfileSuccessRes && this.props.getProfileSuccessRes.code == 1) {
            this.setState({ profile: this.props.getProfileSuccessRes.data });
            this.setState({ formValues: { ...this.state.formValues, first_name: this.state.profile.first_name } })
            this.setState({ formValues: { ...this.state.formValues, last_name: this.state.profile.last_name } })
            this.setState({ formValues: { ...this.state.formValues, email: this.state.profile.email } })
            this.setState({ formValues: { ...this.state.formValues, user_type: this.state.profile.user_type } })
            this.setState({ formValues: { ...this.state.formValues, company_name: this.state.profile.company_name } })
            this.setState({ formValues: { ...this.state.formValues, law_firm_name: this.state.profile.law_firm_name } })
            this.setState({ formValues: { ...this.state.formValues, street1: this.state.profile.street1 } })
            this.setState({ formValues: { ...this.state.formValues, street2: this.state.profile.street2 } })
            this.setState({ selectedState: { value: this.state.profile.state, label: this.state.profile.state } })
            this.setState({ selectedCity: { value: this.state.profile.city, label: this.state.profile.city } })
            this.setState({ state_id: this.state.profile.state })
            this.setState({ city_id: this.state.profile.city })
            this.setState({ formValues: { ...this.state.formValues, zipcode: this.state.profile.zipcode } })
            this.setState({ formValues: { ...this.state.formValues, phone_number: this.state.profile.phone_number } })
            await this.getCity()
            console.log("profile ==> ", this.state)
        }
    }
    getLessorAddress = async () => {
        let reqData = {
            user_id: this.state.formValues.user_id
        }
        await this.props.getLessorAddress(reqData)
        if (this.props.getLessorAddressSuccessRes && this.props.getLessorAddressSuccessRes.code == 1) {
            // console.log("123123")
            this.setState({ lessorAddress: this.props.getLessorAddressSuccessRes.data })
        }
    }

    getPremiseAddress = async () => {
        let reqData = {
            user_id: this.state.formValues.user_id
        }
        await this.props.getPremiseAddress(reqData)
        if (this.props.getPremiseAddressSuccessRes && this.props.getPremiseAddressSuccessRes.code == 1) {
            // console.log("123123")
            this.setState({ PremiseAddress: this.props.getPremiseAddressSuccessRes.data })
            console.log("Premise Address => ", this.state.PremiseAddress)
        }
    }

    getState = async () => {
        let statessss = []
        let reqData =
        {
            getAllStateListNames: "TRUE",
            page_no: 1,
            limit: 10
        }
        await this.props.getStateReq(reqData)
        if (this.props.getStateSuccessRes && this.props.getStateSuccessRes.code == 1) {
            this.setState({ stateList: this.props.getStateSuccessRes.data });
            this.state.stateList.map(el => (
                statessss.push({ value: el.name, label: el.name })
            ))
            this.setState({ stateList: statessss });
            // console.log("Options ==>>",statessss)
        }
    }

    getCity = async () => {
        let cityOption = []
        // console.log('state======>',this.state.state_id)
        let reqData2 =
        {
            state_id: this.state.state_id
        }
        await this.props.getCityReq(reqData2)
        if (this.props.getCitySuccessRes && this.props.getCitySuccessRes.code == 1) {
            this.setState({ cityList: this.props.getCitySuccessRes.data });
            this.state.cityList.map(el => (
                cityOption.push({ value: el.city, label: el.city })
            ))
            await this.setState({ cityList: cityOption });
        }
    }

    getUserName = async () => {
        let userOption = []
        let reqData3 =
        {
            user_id: this.state.formValues.user_id
        }
        await this.props.getLessor(reqData3)
        if (this.props.getLessorSuccessRes && this.props.getLessorSuccessRes.code == 1) {
            this.setState({ userNameList: this.props.getLessorSuccessRes.data });
            this.state.userNameList.map(el => (
                userOption.push({ value: el.id, label: el.name })
            ))
            await this.setState({ userNameList: userOption });
        }
    }

    /*  handleChangeState(e) {
         this.setState({selectedState: e.target.value});
         console.log("00000000000000",this.state.selectedState)
       } */

    handleChangeState = async selectedState => {
        this.setState(
            { selectedState }
            , () => console.log(`Option selected:`, this.state.selectedState)
        );
        let stateId = selectedState.value
        this.setState({ state_id: stateId })
        this.setState({ PreselectedState: stateId })
        let cityOption = [];
        let reqData2 =
        {
            state_id: stateId,
        }
        await this.props.getCityReq(reqData2)
        if (this.props.getCitySuccessRes && this.props.getCitySuccessRes.code == 1) {
            this.setState({ cityList: this.props.getCitySuccessRes.data });
            this.state.cityList.map(el => (
                cityOption.push({ value: el.city, label: el.city })
            ))
            await this.setState({ cityList: cityOption });
        }

    };

    handleChangeCity = selectedCity => {
        this.setState(
            { selectedCity }
            , () => console.log(`Option selected:`, this.state.selectedCity)
        );
        let cityId = selectedCity.value
        this.setState({ city_id: cityId })
        this.setState({ PreselectedCity: cityId })
    }

    handleChangePreState = async PreselectedState => {
        this.setState(
            { PreselectedState }
            , () => console.log(`Option selected:`, this.state.PreselectedState)
        );
        let stateId = PreselectedState.value
        // this.setState({ state_id : stateId })
        this.setState({ PreselectedState: PreselectedState })
        this.setState({ PreselectedStateId: stateId })
        let cityOption = [];
        let reqData2 =
        {
            state_id: stateId,
        }
        await this.props.getCityReq(reqData2)
        if (this.props.getCitySuccessRes && this.props.getCitySuccessRes.code == 1) {
            this.setState({ cityList: this.props.getCitySuccessRes.data });
            this.state.cityList.map(el => (
                cityOption.push({ value: el.city, label: el.city })
            ))
            await this.setState({ cityList: cityOption });
        }

    };

    handleChangePreCity = PreselectedCity => {
        this.setState(
            { PreselectedCity }
            , () => console.log(`Option selected:`, this.state.PreselectedCity)
        );
        let cityId = PreselectedCity.value
        // this.setState({ city_id : cityId })
        this.setState({ PreselectedCity: PreselectedCity })
        this.setState({ PreselectedCityId: cityId })
    }

    handleChangeLesState = async LesselectedState => {
        this.setState(
            { LesselectedState }
            , () => console.log(`Option selected:`, this.state.LesselectedState)
        );
        let stateId = LesselectedState.value
        this.setState({ state_id: stateId })
        this.setState({ LesselectedState: LesselectedState })
        this.setState({ LesselectedStateId: stateId })
        let cityOption = [];
        let reqData2 =
        {
            state_id: stateId,
        }
        await this.props.getCityReq(reqData2)
        if (this.props.getCitySuccessRes && this.props.getCitySuccessRes.code == 1) {
            this.setState({ cityList: this.props.getCitySuccessRes.data });
            this.state.cityList.map(el => (
                cityOption.push({ value: el.city, label: el.city })
            ))
            await this.setState({ cityList: cityOption });
        }

    };

    handleChangeLesCity = LesselectedCity => {
        this.setState(
            { LesselectedCity }
            , () => console.log(`Option selected:`, this.state.LesselectedCity)
        );
        let cityId = LesselectedCity.value
        // this.setState({ city_id : cityId })
        this.setState({ LesselectedCity: LesselectedCity })
        this.setState({ LesselectedCityId: cityId })
    }

    handleChangeUserName = selectedUser => {
        this.setState(
            { selectedUser }
            , () => console.log(`Option selected:`, this.state.selectedUser)
        );
        let selectedUserId = selectedUser.value
        this.setState({ selectedUserId: selectedUserId })
    }

    onCityChange(e) {
        this.setState({ selectedCity1: e.value });
    }

    onStateChange = (e) => {
        this.setState({ selectedState: e.target.value })
        console.log("SELECTED VALUE ==> ", this.state.selectedState)
    }

    changeValuesHandler = (e) => {

        var formValues = this.state.formValues;
        var name = e.target.name;

        formValues[name] = e.target.value;
        this.setState({ formValues: formValues }, () => {
            // console.log(this.state.formValues);

        });

    }

    handleClose = () => {
        // this.state.ToggleInputModal = false;
        this.setState({ ToggleInputModal: '' })
        document.body.classList.remove('modal-open');
        // console.log(this.state.ToggleInputModal)
    }
    handleShow = () => {
        this.setState({ ToggleInputModal: 'show' })
        // console.log(this.state.ToggleInputModal)
    }

    onOpenModal = () => {
        this.setState({ error: '' })
        this.setState({ profileOpen: true });
    };

    onCloseModal = () => {
        this.setState({ error: '' })
        this.setState({ profileOpen: false });
    };
    onOpenModalPremise = () => {
        this.setState({ error: '' })
        this.setState({ premiseOpen: true });
    };

    onCloseModalPremise = () => {
        this.setState({ error: '' })
        this.setState({ premiseOpen: false });
    };
    onOpenModalPremiseAddress = async (data) => {
        if (data != 0) {
            this.setState({ propertyId: data.id })
        } else {
            this.setState({ propertyId: data })
        }
        await this.getUserName()
        this.setState({ premiseAddOpen: true });
        console.log('\n\n DATA->', data, this.state.cityList);
        let formValue = this.state.formValues
        let selectedUser, selectedState, selectedCity;
        this.state.userNameList.filter(user => {
            if (user.value == data.manage_user_id) {
                this.setState({ selectedUserId: data.manage_user_id })
                selectedUser = user
                return
            }
        })
        this.state.stateList.filter(state => {
            if (state.value == data.state) {
                this.setState({ PreselectedStateId: state.value })
                selectedState = state
                return
            }
        })
        this.state.cityList.filter(city => {
            if (city.label == data.city) {
                this.setState({ PreselectedCityId: city.value })
                selectedCity = city
                return
            }
        })
        formValue.Prestreet1 = data.street1
        formValue.Prestreet2 = data.street2
        formValue.Prezipcode = data.zipcode

        //  await this.props.getPropertyAddress({ id: data.id })
        console.log('\n\n getPropertyAddress', formValue);
        this.setState({ error: '', formValues: formValue, selectedUser: selectedUser, PreselectedState: selectedState, PreselectedCity: selectedCity })
        // console.log('click address')

    };

    onCloseModalPremiseAddress = () => {
        this.setState({ error: '' })
        this.setState({ premiseAddOpen: false });
    };
    onOpenModalLessor = async (id) => {
        // console.log('======ID123===>',id)
        this.setState({ error: '' })
        this.setState({ editLessorId: id })
        if (id > 0) {
            // console.log("edit")
            let reqData = {
                id: id
            }
            await this.props.getLessorAddressByID(reqData);
            store.dispatch({
                type: Types.STOP_LOADER
            })
            if (this.props.getLessorAddressByIdSuccessRes && this.props.getLessorAddressByIdSuccessRes.code === 1) {
                this.setState({ formValues: { ...this.state.formValues, lessor_name: this.props.getLessorAddressByIdSuccessRes.data[0].lessor_name } });
                this.setState({ formValues: { ...this.state.formValues, Lesstreet1: this.props.getLessorAddressByIdSuccessRes.data[0].street1 } });
                this.setState({ formValues: { ...this.state.formValues, Lesstreet2: this.props.getLessorAddressByIdSuccessRes.data[0].street2 } });

                this.setState({ LesselectedState: { value: this.props.getLessorAddressByIdSuccessRes.data[0].state, label: this.props.getLessorAddressByIdSuccessRes.data[0].state } });
                this.setState({ LesselectedCity: { value: this.props.getLessorAddressByIdSuccessRes.data[0].city, label: this.props.getLessorAddressByIdSuccessRes.data[0].city } });
                this.setState({ formValues: { ...this.state.formValues, Leszipcode: this.props.getLessorAddressByIdSuccessRes.data[0].zipcode } });
                this.setState({ LesselectedStateId: this.props.getLessorAddressByIdSuccessRes.data[0].state })
                this.setState({ LesselectedCityId: this.props.getLessorAddressByIdSuccessRes.data[0].city })
                await this.getCity()
            }
        }
        else {
            // console.log("add")
            this.setState({ formValues: { ...this.state.formValues, lessor_name: '' } });
            this.setState({ formValues: { ...this.state.formValues, Lesstreet1: '' } });
            this.setState({ formValues: { ...this.state.formValues, Lesstreet2: '' } });
            this.setState({ LesselectedState: { value: '', label: '' } });
            this.setState({ LesselectedCity: { value: '', label: '' } });
            this.setState({ formValues: { ...this.state.formValues, Leszipcode: '' } });
            this.setState({ LesselectedStateId: '' })
            this.setState({ LesselectedCityId: '' })
            // $("#lessor_name").val("")
            // console.log("lessor_name",this.state.formValues)
        }
        this.setState({ lessorOpen: true });
    };

    deleteLessorAddress = async (id) => {
        alertify.confirm(messages.ASK_TO_DELETE, async (status) => {
            if (status) {
                let reqData = {
                    id: id
                }
                await this.props.deleteLessorAddress(reqData);
                store.dispatch({
                    type: Types.STOP_LOADER
                })
                if (this.props.deleteLessorAddressSuccessRes && this.props.deleteLessorAddressSuccessRes.code === 1) {
                    common.displayLog(1, this.props.deleteLessorAddressSuccessRes.message)
                    await this.getLessorAddress()
                }
            }
        }).setHeader(APP_NAME).set('labels', { ok: 'YES', cancel: 'NO' });

    }

    deletePremiseAddress = async (id) => {
        alertify.confirm(messages.ASK_TO_DELETE, async (status) => {
            if (status) {
                let reqData = {
                    id: id
                }
                await this.props.deletePremiseAddress(reqData);
                store.dispatch({
                    type: Types.STOP_LOADER
                })
                if (this.props.deletePremiseAddressSuccessRes && this.props.deletePremiseAddressSuccessRes.code === 1) {
                    common.displayLog(1, this.props.deletePremiseAddressSuccessRes.message)
                    await this.getPremiseAddress()
                }
            }
        }).setHeader(APP_NAME).set('labels', { ok: 'YES', cancel: 'NO' });

    }

    onCloseModalLessor = () => {
        this.clearState();
        this.setState({ error: '' })
        this.setState({ lessorOpen: false });
    };

    onPressChangePwd = () => {
        let obj = {
            old_password: this.state.formValues.old_password,
            new_password: this.state.formValues.new_password,
            confirm_new_password: this.state.formValues.confirm_new_password,

        }
        this.validateFormDataCpwd(obj);

    }

    validateFormDataCpwd = async (body) => {
        let schema = Joi.object().keys({
            old_password: Joi.string().trim().required(),
            new_password: Joi.string().trim().required().min(6),
            confirm_new_password: Joi.string()
                .valid(this.state.formValues.new_password)
                .required()
                .label('Confirm Password')
                .error(
                    errors => 'Password and Confirm Password must be same!'
                ),


        })
        Joi.validate(body, schema, (error, value) => {
            if (error) {
                if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
                    let errorLog = common.validateSchema(error)
                    this.setState({ error: errorLog.error, errorField: errorLog.errorField });
                }
            }
            else {
                this.setState({ error: '', errorField: '' }, () => {
                    this.changePwd()
                });
            }
        })
    }
    changePwd = async () => {
        let reqData = {
            old_password: this.state.formValues.old_password.trim(),
            new_password: this.state.formValues.new_password.trim()

        }
        store.dispatch({
            type: Types.START_LOADER
        })
        await this.props.changePassword(reqData);
        store.dispatch({
            type: Types.STOP_LOADER
        })
        if (this.props.changePwdRes && this.props.changePwdRes.code === 1) {
            common.displayLog(1, this.props.changePwdRes.message)
            this.clearState();
        }
        this.clearState();
        // this.showModal()
        
    }
    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            // this.onPressChangePwd()
            event.preventDefault();
        }
    };

    onPressChangeEditProfile = () => {
        console.log("edit click", this.state.formValues)
        /* let obj = {
            first_name: this.state.formValues.first_name,
            last_name: this.state.formValues.last_name,
            email: this.state.formValues.email,
        } */
        let obj = []
        if (this.state.formValues.user_type == 2) {
            obj = {
                first_name: this.state.formValues.first_name,
                last_name: this.state.formValues.last_name,
                email: this.state.formValues.email,
                company_name: this.state.formValues.company_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.state_id,
                city: this.state.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else if (this.state.formValues.user_type == 3) {
            obj = {
                first_name: this.state.formValues.first_name,
                last_name: this.state.formValues.last_name,
                email: this.state.formValues.email,
                law_firm_name: this.state.formValues.law_firm_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.state_id,
                city: this.state.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else {
            obj = {
                first_name: this.state.formValues.first_name,
                last_name: this.state.formValues.last_name,
                email: this.state.formValues.email,
            }
        }
        this.validateFormDataEditProfile(obj);
    }
    validateFormDataEditProfile = async (body) => {
        /* let schema = Joi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
        }) */
        let schema
        // console.log('====Validate====')
        if (this.state.formValues.user_type == 2) {
            schema = Joi.object().keys({
                first_name: Joi.string().trim().required(),
                last_name: Joi.string().trim().required(),
                email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
                company_name: Joi.string().trim().required(),
                street1: Joi.string().trim().required(),
                street2: Joi.string().trim().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().trim().required(),
                phone_number: Joi.number().required(),
            })
        }
        else if (this.state.formValues.user_type == 3) {
            schema = Joi.object().keys({
                first_name: Joi.string().trim().required(),
                last_name: Joi.string().trim().required(),
                email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
                law_firm_name: Joi.string().trim().required(),
                street1: Joi.string().trim().required(),
                street2: Joi.string().trim().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().trim().required(),
                phone_number: Joi.number().required(),
            })
        }
        else {
            schema = Joi.object().keys({
                first_name: Joi.string().trim().required(),
                last_name: Joi.string().trim().required(),
                email: Joi.string().trim().regex(EMAIL_REGEX).email().required(),
            })
        }
        Joi.validate(body, schema, (error, value) => {
            if (error) {
                if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
                    let errorLog = common.validateSchema(error)
                    this.setState({ error: errorLog.error, errorField: errorLog.errorField });
                }
            }
            else {
                this.setState({ error: '', errorField: '' }, () => {
                    this.EditProfile()
                });
            }
        })
    }
    EditProfile = async () => {
        /* let reqData = {
            first_name: this.state.formValues.first_name.trim(),
            last_name: this.state.formValues.last_name.trim(),
            email: this.state.formValues.email.trim()
        } */
        let reqData = []
        if (this.state.formValues.user_type == 2) {
            reqData = {
                first_name: this.state.formValues.first_name.trim(),
                last_name: this.state.formValues.last_name.trim(),
                email: this.state.formValues.email.trim(),
                company_name: this.state.formValues.company_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.state_id,
                city: this.state.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else if (this.state.formValues.user_type == 3) {
            reqData = {
                first_name: this.state.formValues.first_name.trim(),
                last_name: this.state.formValues.last_name.trim(),
                email: this.state.formValues.email.trim(),
                law_firm_name: this.state.formValues.law_firm_name,
                street1: this.state.formValues.street1,
                street2: this.state.formValues.street2,
                state: this.state.state_id,
                city: this.state.city_id,
                zipcode: this.state.formValues.zipcode,
                phone_number: this.state.formValues.phone_number,
            }
        }
        else {
            reqData = {
                first_name: this.state.formValues.first_name.trim(),
                last_name: this.state.formValues.last_name.trim(),
                email: this.state.formValues.email.trim(),
            }
        }
        store.dispatch({
            type: Types.START_LOADER
        })
        await this.props.editProfile(reqData);
        store.dispatch({
            type: Types.STOP_LOADER
        })
        if (this.props.editProfileRes && this.props.editProfileRes.code === 1) {
            await localStorage.setItem('DATA', JSON.stringify(this.props.editProfileRes.data))
            await localStorage.setItem('name', this.props.editProfileRes.data.first_name)
            common.displayLog(1, this.props.editProfileRes.message)
            this.handleClose()
            await this.getProfile()
        }
        // this.showModal()
        this.setState({ profileOpen: false });
        this.setState({ error: '' })
    }

    onPressLessorAddress = () => {
        let obj = {
            lessor_name: this.state.formValues.lessor_name,
            street1: this.state.formValues.Lesstreet1,
            street2: this.state.formValues.Lesstreet2,
            state: this.state.LesselectedStateId,
            city: this.state.LesselectedCityId,
            zipcode: this.state.formValues.Leszipcode,
        }
        /* if(this.state.editLessorId > 0)
        {
            obj['id'] = this.state.editLessorId
        }
        console.log(this.state.editLessorId) */
        this.validateFormDataLessorAddress(obj);
    }
    validateFormDataLessorAddress = async (body) => {
        /* if(this.state.editLessorId > 0)
        {
            let schema = Joi.object().keys({
                id: Joi.required(),
                lessor_name: Joi.string().required(),
                street1: Joi.string().required(),
                street2: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().required(),
            })
        }
        else
        { */
        let schema = Joi.object().keys({
            lessor_name: Joi.string().required(),
            street1: Joi.string().required(),
            street2: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            zipcode: Joi.string().required(),
        })
        // }

        Joi.validate(body, schema, (error, value) => {
            if (error) {
                if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
                    let errorLog = common.validateSchema(error)
                    this.setState({ error: errorLog.error, errorField: errorLog.errorField });
                }
            }
            else {
                this.setState({ error: '', errorField: '' }, () => {
                    this.StoreLessorAddress()
                });
            }
        })
    }
    StoreLessorAddress = async () => {
        let reqData = {
            lessor_name: this.state.formValues.lessor_name,
            street1: this.state.formValues.Lesstreet1,
            street2: this.state.formValues.Lesstreet2,
            state: this.state.LesselectedStateId,
            city: this.state.LesselectedCityId,
            zipcode: this.state.formValues.Leszipcode,
        }
        store.dispatch({
            type: Types.START_LOADER
        })
        if (this.state.editLessorId == 0) {
            await this.props.addLessorAddress(reqData);
            store.dispatch({
                type: Types.STOP_LOADER
            })
            if (this.props.addLessorAddressSuccessRes && this.props.addLessorAddressSuccessRes.code === 1) {
                common.displayLog(1, this.props.addLessorAddressSuccessRes.message)
                await this.getLessorAddress()
            }
        }
        else {
            reqData['id'] = this.state.editLessorId
            await this.props.editLessorAddress(reqData);
            store.dispatch({
                type: Types.STOP_LOADER
            })
            if (this.props.editLessorAddressSuccessRes && this.props.editLessorAddressSuccessRes.code === 1) {
                common.displayLog(1, this.props.editLessorAddressSuccessRes.message)
                await this.getLessorAddress()
            }
        }
        // this.showModal()
        this.setState({ lessorOpen: false })
        this.clearState();
    }

    editPremiseAddress = () => {
        let obj = {
            user: this.state.selectedUserId,
            street1: this.state.formValues.Prestreet1,
            street2: this.state.formValues.Prestreet2,
            state: this.state.PreselectedStateId,
            city: this.state.PreselectedCityId,
            zipcode: this.state.formValues.Prezipcode,
        }
    }

    onPressPremiseAddress = () => {
        console.log('ON CLICK =>', this.state)
        let obj = {
            user: this.state.selectedUserId,
            street1: this.state.formValues.Prestreet1,
            street2: this.state.formValues.Prestreet2,
            state: this.state.PreselectedStateId,
            city: this.state.PreselectedCityId,
            zipcode: this.state.formValues.Prezipcode,

        }
        /* if(this.state.editLessorId > 0)
        {
            obj['id'] = this.state.editLessorId
        }
        console.log(this.state.editLessorId) */
        this.validateFormDataPremiseAddress(obj);
    }
    validateFormDataPremiseAddress = async (body) => {
        /* if(this.state.editLessorId > 0)
        {
            let schema = Joi.object().keys({
                id: Joi.required(),
                lessor_name: Joi.string().required(),
                street1: Joi.string().required(),
                street2: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().required(),
            })
        }
        else
        { */
        let schema = Joi.object().keys({
            user: Joi.number().required(),
            street1: Joi.string().required(),
            street2: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            zipcode: Joi.string().required(),
        })
        // }

        Joi.validate(body, schema, (error, value) => {
            if (error) {
                if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
                    let errorLog = common.validateSchema(error)
                    this.setState({ error: errorLog.error, errorField: errorLog.errorField });
                }
            }
            else {
                this.setState({ error: '', errorField: '' }, () => {
                    this.StorePremiseAddress()
                });
            }
        })
    }
    StorePremiseAddress = async () => {
        let reqData = {
            manage_user_id: this.state.selectedUserId,
            street1: this.state.formValues.Prestreet1,
            street2: this.state.formValues.Prestreet2,
            state: this.state.PreselectedStateId,
            city: this.state.PreselectedCityId,
            zipcode: this.state.formValues.Prezipcode,
        }
        store.dispatch({
            type: Types.START_LOADER
        })

        if (this.state.propertyId == 0) {
            await this.props.addPremiseAddress(reqData);
            store.dispatch({
                type: Types.STOP_LOADER
            })
            if (this.props.addPremiseAddressSuccessRes && this.props.addPremiseAddressSuccessRes.code === 1) {
                common.displayLog(1, this.props.addPremiseAddressSuccessRes.message)
                await this.getPremiseAddress()
            }
        }
        else {
            reqData['id'] = this.state.propertyId
            await this.props.editPremiseAddress(reqData);
            store.dispatch({
                type: Types.STOP_LOADER
            })
            if (this.props.editLessorAddressSuccessRes && this.props.editLessorAddressSuccessRes.code === 1) {
                common.displayLog(1, this.props.editLessorAddressSuccessRes.message)
                await this.getPremiseAddress()
            }
        }
        // this.showModal()
        this.setState({ premiseAddOpen: false })
        await this.getPremiseAddress()
    }


    onPressChangeAddLessor = () => {
        // console.log("edit click")
        let obj = {
            name: this.state.formValues.name,
        }
        this.validateFormDataAddLessor(obj);
    }
    validateFormDataAddLessor = async (body) => {
        let schema = Joi.object().keys({
            name: Joi.string().trim().required(),
        })
        Joi.validate(body, schema, (error, value) => {
            if (error) {
                if (error.details[0].message !== this.state.error || error.details[0].context.key !== this.state.errorField) {
                    let errorLog = common.validateSchema(error)
                    this.setState({ error: errorLog.error, errorField: errorLog.errorField });
                }
            }
            else {
                this.setState({ error: '', errorField: '' }, () => {
                    this.StoreAddLessor()
                });
            }
        })
    }
    StoreAddLessor = async () => {
        let reqData = {
            name: this.state.formValues.name.trim(),
        }
        store.dispatch({
            type: Types.START_LOADER
        })
        await this.props.addLessorName(reqData);
        store.dispatch({
            type: Types.STOP_LOADER
        })
        if (this.props.addLessorSuccessRes && this.props.addLessorSuccessRes.code === 1) {
            /* await localStorage.setItem('DATA', JSON.stringify(this.props.addLessorSuccessRes.data))
            await localStorage.setItem('name', this.props.editProfileRes.data.first_name) */
            common.displayLog(1, 'Premise added successfully')
            this.handleClose()
            await this.getPremiseAddress()
        }
        // this.showModal()
        this.setState({ premiseOpen: false })
    }

    editHandler = (id) => {
        console.log('iiiiiiiiidddddddd=>>', id)
        // this.props.history.push('/app/ProcessServers/edit-ProcessServers/' + id);
    }


    render() {
        // const { open } = this.state;
        return (
            <div>
                <Header />
                <section className="profileSetting noticesSection">
                    <div className="container">
                        <div className="head">
                            <h2 className="subHeading">Profile Settings</h2>
                        </div>
                        <div className="profileSettingDetail">
                            <div className="landlordInfo d-flex justify-content-between align-items-center">
                                <div className="landlordInfoLeft">
                                    <div className="detail d-flex">
                                        <img src="images/user.svg" alt="" />
                                        <span>{this.state.profile.first_name && this.state.profile.last_name ? this.state.profile.first_name + ' ' + this.state.profile.last_name : ''}</span>
                                    </div>
                                    <div className="detail d-flex">
                                        <img src="images/home.svg" alt="" />
                                        {this.state.profile.user_type == '1' ? (
                                            <span>Landlord</span>
                                        ) : this.state.profile.user_type == '2' ? (
                                            <span>Property Manager</span>
                                        ) : this.state.profile.user_type == '3' ? (
                                                    <span>Attorney</span>
                                                ) : null }

                                    </div>
                                    <div className="detail d-flex">
                                        <img src="images/mail-grey.svg" alt="" />
                                        <span>{this.state.profile.email}</span>
                                    </div>
                                </div>
                                <div className="signRight d-flex flex-wrap align-items-center">
                                    <div className="signature d-flex align-items-center">
                                        <span>Signature</span>
                                        <label>{this.state.profile.first_name && this.state.profile.last_name ? this.state.profile.first_name + ' ' + this.state.profile.last_name : ''}</label>
                                    </div>
                                    <button type="button" className="smallBtn d-flex" onClick={this.onOpenModal} /* onClick={this.handleShow} data-toggle="modal" data-target=".editProfileModal" */>Edit</button>
                                    <Modal open={this.state.profileOpen} onClose={this.onCloseModal}>
                                        <h3 style={{ marginBottom: '20px' }}>Edit Profile</h3>
                                        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <img src="images/close-icon.svg" />
                                        </button> */}
                                        <form>
                                            <div className="fieldset">
                                                <label>First Name</label>
                                                <input type="text" name="first_name" value={this.state.formValues.first_name} onChange={(e) => this.changeValuesHandler(e)} />
                                            </div>
                                            <div className="fieldset">
                                                <label>Last Name</label>
                                                <input type="text" name="last_name" value={this.state.formValues.last_name} onChange={(e) => this.changeValuesHandler(e)} />
                                            </div>
                                            <div className="fieldset">
                                                <label>Email</label>
                                                <input type="text" name="email" readOnly={true} value={this.state.formValues.email} onChange={(e) => this.changeValuesHandler(e)} disabled={true} />
                                            </div>
                                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != '' && this.state.formValues.user_type == 2 ?
                                                <div className="fieldset">
                                                    <label>Your Company Name</label>
                                                    <input type="text" placeholder name="company_name" value={this.state.formValues.company_name} onChange={(e) => this.changeValuesHandler(e)} />
                                                </div> : ("")}
                                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != '' && this.state.formValues.user_type == 3 ?
                                                <div className="fieldset">
                                                    <label>Enter your Law firm name</label>
                                                    <input type="text" placeholder name="law_firm_name" value={this.state.formValues.law_firm_name} onChange={(e) => this.changeValuesHandler(e)} />
                                                </div> : ("")}
                                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != '' && this.state.formValues.user_type == 2 ?
                                                (<h6>Address</h6>) : this.state.formValues.user_type == 3 ?
                                                    (
                                                        <h6>Company Address</h6>)
                                                    : ("")}
                                            {this.state.formValues.user_type != 1 && this.state.formValues.user_type != '' ?
                                                <div>
                                                    <div className="fieldset">
                                                        <label>Street 1</label>
                                                        <input type="text" placeholder name="street1" value={this.state.formValues.street1} onChange={(e) => this.changeValuesHandler(e)} />
                                                    </div>
                                                    <div className="fieldset">
                                                        <label>Street 2</label>
                                                        <input type="text" placeholder name="street2" value={this.state.formValues.street2} onChange={(e) => this.changeValuesHandler(e)} />
                                                    </div>
                                                    <div className="twoField d-flex justify-content-between">
                                                        <div className="fieldset">
                                                            <label>State</label>
                                                            <Select
                                                                value={this.state.selectedState}
                                                                onChange={this.handleChangeState}
                                                                options={this.state.stateList} />
                                                        </div>
                                                        <div className="fieldset">
                                                            <label>City</label>
                                                            <Select
                                                                value={this.state.selectedCity}
                                                                onChange={this.handleChangeCity}
                                                                options={this.state.cityList} />
                                                        </div>
                                                    </div>
                                                    <div className="fieldset">
                                                        <label>Zip Code</label>
                                                        <input type="text" placeholder name="zipcode" value={this.state.formValues.zipcode} onChange={(e) => this.changeValuesHandler(e)} />
                                                    </div>

                                                    <div className="fieldset">
                                                        <label>Phone Number</label>
                                                        <input type="text" placeholder name="phone_number" value={this.state.formValues.phone_number} onChange={(e) => this.changeValuesHandler(e)} />
                                                    </div>
                                                </div>
                                                : ("")}

                                            {
                                                this.state.error !== '' ?
                                                    <Alert color="danger">
                                                        {this.state.error}
                                                    </Alert>
                                                    : null
                                            }
                                            <div className="btnGroup d-flex justify-content-center">
                                                <button type="button" className="smallBtn width" onClick={this.onPressChangeEditProfile}>Save</button>
                                            </div>
                                        </form>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="profileSettingTab mainTab">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="entities-tab" data-toggle="tab" href="#entities" role="tab" aria-controls="entities" aria-selected="true">Manage Lessor Entities</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="address-tab" data-toggle="tab" href="#address" role="tab" aria-controls="started" aria-selected="false">Manage Premise Addresses</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="history-tab" data-toggle="tab" href="#history" role="tab" aria-controls="history" aria-selected="false">Transaction History</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false">Change Password</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="entities" role="tabpanel" aria-labelledby="entities-tab">
                                    <div className="noticeHeader d-flex justify-content-between align-items-center">
                                        <h2>Manage Lessor Entities</h2>
                                        <button type="button" className="smallBtn" /* onClick={this.onOpenModalLessor} */ onClick={() => this.onOpenModalLessor(0)}>Add Lessor</button>
                                        {/* <Modal open={this.state.lessorOpen} onClose={this.onCloseModalLessor}>
                                        <h3 style={{ marginBottom: '20px' }}>Add Lessor Entities</h3>
                                                <form>
                                                    <div className="fieldset">
                                                        <label>Lessor Name</label>
                                                        <input type="text" name="lessor_name" onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                    </div>
                                                    {
                                                        this.state.error !== '' ?
                                                            <Alert color="danger">
                                                            {this.state.error}
                                                            </Alert>
                                                            : null
                                                    }
                                                    <div className="btnGroup d-flex justify-content-center">
                                                        <button type="button" className="smallBtn width" onClick={this.onPressChangeAddLessor}>Save</button>
                                                    </div>
                                                </form>
                                        </Modal> */}
                                        <Modal open={this.state.lessorOpen} onClose={this.onCloseModalLessor}>
                                            <h3 style={{ marginBottom: '20px' }}>Lessor Entities Address</h3>
                                            <form>

                                                <div className="fieldset">
                                                    <label>Landlord name</label>
                                                    <input type="text" id="lessor_name" name="lessor_name" value={this.state.formValues.lessor_name} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                <div className="fieldset">
                                                    <label>Street 1</label>
                                                    <input type="text" name="Lesstreet1" value={this.state.formValues.Lesstreet1} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                <div className="fieldset">
                                                    <label>Street 2</label>
                                                    <input type="text" name="Lesstreet2" value={this.state.formValues.Lesstreet2} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                <div className="twoField d-flex justify-content-between">
                                                    <div className="fieldset">
                                                        <label>State</label>
                                                        <Select
                                                            value={this.state.LesselectedState}
                                                            onChange={this.handleChangeLesState}
                                                            options={this.state.stateList}
                                                        />
                                                    </div>

                                                    <div className="fieldset">
                                                        <label>City</label>
                                                        <Select
                                                            value={this.state.LesselectedCity}
                                                            onChange={this.handleChangeLesCity}
                                                            options={this.state.cityList}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="fieldset">
                                                    <label>Zip Code</label>
                                                    <input type="text" name="Leszipcode" value={this.state.formValues.Leszipcode} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                {
                                                    this.state.error !== '' ?
                                                        <Alert color="danger">
                                                            {this.state.error}
                                                        </Alert>
                                                        : null
                                                }
                                                <div className="btnGroup d-flex justify-content-center">
                                                    <button type="button" className="smallBtn width" onClick={this.onPressLessorAddress}>Save</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                    {this.state.lessorAddress && this.state.lessorAddress.length > 0 ?
                                        this.state.lessorAddress.map(el => (
                                            <div className="entityBlockMain">
                                                <div className="entitiesContent">
                                                    <div className="entitiesBlock">
                                                        <div className="entityHead d-flex justify-content-between">
                                                            <h5>{el.lessor_name}</h5>
                                                            <ul className="d-flex">
                                                                <li>

                                                                    <a onClick={() => this.onOpenModalLessor(el.id)}><img src="images/edit.svg" height="15" weight="15" /></a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={() => this.deleteLessorAddress(el.id)}><img src="images/delete.svg" height="15" weight="15" /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="entityDetail">
                                                            {/* <span className="phone">220-187-1901</span> */}
                                                            <p>{el.street1 + ', ' + el.street2}</p>
                                                            {/* <p>{el.street2}</p> */}
                                                            <p>{el.state + ', ' + el.city + ', ' + el.zipcode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : (
                                            <div className="entityBlockMain">
                                                <div className="entitiesContent">
                                                </div></div>
                                        )}
                                </div>
                                <div className="tab-pane fade manageAdd" id="address" role="tabpanel" aria-labelledby="address-tab">
                                    <div className="noticeHeader d-flex justify-content-between align-items-center">
                                        <h2>Manage Premise Addresses</h2>
                                        <button type="button" className="smallBtn" onClick={() => this.onOpenModalPremise(0)}>Add Premise</button>
                                        <Modal open={this.state.premiseOpen} onClose={this.onCloseModalPremise}>
                                            <h3 style={{ marginBottom: '20px' }}>Add Premise Entities</h3>
                                            <form>
                                                <div className="fieldset">
                                                    <label>Name</label>
                                                    <input type="text" name="name" onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                {
                                                    this.state.error !== '' ?
                                                        <Alert color="danger">
                                                            {this.state.error}
                                                        </Alert>
                                                        : null
                                                }
                                                <div className="btnGroup d-flex justify-content-center">
                                                    <button type="button" className="smallBtn width" onClick={this.onPressChangeAddLessor}>Save</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                    <div className="entityBlockMain">
                                        <div className="manageAddBlock">

                                            {this.state.PremiseAddress && this.state.PremiseAddress.length > 0 ?
                                                this.state.PremiseAddress.map(vl => (
                                                    <div>
                                                        <div className="manageAddHead d-flex justify-content-between align-items-center">
                                                            <div className="user d-flex">
                                                                <img src="images/user.svg" />
                                                                <span>{vl.name}</span>
                                                            </div>
                                                            <div className="addPremiseBtn d-flex" onClick={() => this.onOpenModalPremiseAddress(0)}>
                                                                <span>Add Premise Address</span>
                                                                <img src="images/plus-blue.svg" />
                                                            </div>
                                                        </div>
                                                        <div className="entitiesContent d-flex flex-wrap">

                                                            {vl.address && vl.address.length > 0 ?
                                                                vl.address.map(ad => (
                                                                    <div className="entitiesBlock">
                                                                        {console.log('\n\n addd -->', ad)}
                                                                        <div className="entityHead d-flex justify-content-between">
                                                                            <div className="entityDetail pt-0">
                                                                                <p>{ad.street1 + ', ' + ad.street2 + ', ' + ad.city + ', ' + ad.state + ', ' + ad.zipcode}</p>
                                                                            </div>
                                                                            <ul className="d-flex">
                                                                                <li>
                                                                                    <a onClick={() => this.onOpenModalPremiseAddress(ad)}><img src="images/edit.svg" height="15" weight="15" /></a>
                                                                                </li>
                                                                                <li>
                                                                                    <a onClick={() => this.deletePremiseAddress(ad.id)}><img src="images/delete.svg" height="15" weight="15" /></a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                )) : (" ")}

                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="manageAddHead d-flex justify-content-between align-items-center">
                                                        <div className="entitiesContent d-flex flex-wrap">
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                        {/* </div> */}
                                        <Modal open={this.state.premiseAddOpen} onClose={this.onCloseModalPremiseAddress}>
                                            <h3 style={{ marginBottom: '20px' }}>Premise Address</h3>
                                            {console.log('\n USER LIST', this.state.userNameList)}
                                            <form>

                                                <div className="fieldset">
                                                    <label>Premise name</label>
                                                    {/* <input type="text" name="lessor_name" value={this.state.formValues.lessor_name} onChange={(e) => this.changeValuesHandler(e)} placeholder /> */}
                                                    <Select
                                                        value={this.state.selectedUser}
                                                        onChange={this.handleChangeUserName}
                                                        options={this.state.userNameList}
                                                    />
                                                </div>
                                                <div className="fieldset">
                                                    <label>Street 1</label>
                                                    <input type="text" name="Prestreet1" value={this.state.formValues.Prestreet1} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                <div className="fieldset">
                                                    <label>Street 2</label>
                                                    <input type="text" name="Prestreet2" value={this.state.formValues.Prestreet2} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                <div className="twoField d-flex justify-content-between">
                                                    <div className="fieldset">
                                                        <label>State</label>
                                                        <Select
                                                            value={this.state.PreselectedState}
                                                            onChange={this.handleChangePreState}
                                                            options={this.state.stateList}
                                                        />
                                                    </div>

                                                    <div className="fieldset">
                                                        <label>City</label>
                                                        <Select
                                                            value={this.state.PreselectedCity}
                                                            onChange={this.handleChangePreCity}
                                                            options={this.state.cityList}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="fieldset">
                                                    <label>Zip Code</label>
                                                    <input type="text" name="Prezipcode" value={this.state.formValues.Prezipcode} onChange={(e) => this.changeValuesHandler(e)} placeholder />
                                                </div>
                                                {
                                                    this.state.error !== '' ?
                                                        <Alert color="danger">
                                                            {this.state.error}
                                                        </Alert>
                                                        : null
                                                }
                                                <div className="btnGroup d-flex justify-content-center">
                                                    <button type="button" className="smallBtn width" onClick={this.onPressPremiseAddress}>Save</button>
                                                </div>
                                            </form>
                                        </Modal>
                                        {/* <div className="manageAddBlock entityborder">
                                            <div className="manageAddHead d-flex justify-content-between align-items-center">
                                                <div className="user d-flex">
                                                    <img src="images/user.svg" />
                                                    <span>GoGoZoom</span>
                                                </div>
                                                <div className="addPremiseBtn d-flex" data-toggle="modal" data-target=".addPermiseModal">
                                                    <span>Add Premise</span>
                                                    <img src="images/plus-blue.svg" />
                                                </div>
                                            </div>
                                            <div className="entitiesContent d-flex flex-wrap">
                                                <div className="entitiesBlock">
                                                    <div className="entityHead d-flex justify-content-between align-items-center">
                                                        <div className="entityDetail pt-0">
                                                            <p>9440 Quarles Cutoff Dr, Bunceton, MO, 65237</p>
                                                        </div>
                                                        <ul className="d-flex">
                                                            <li>
                                                                <a href="#"><img src="images/edit.svg" /></a>
                                                            </li>
                                                            <li>
                                                                <a href="#"><img src="images/delete.svg" /></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                    <div className="noticeHeader d-flex justify-content-between align-items-center">
                                        <h2>Transaction History</h2>
                                    </div>
                                    <div className="historyContent" style={{ paddingBottom: '80px' }}>
                                        <div className="noticeTable">
                                            {/*  <table>
                                                <tbody>
                                                    <tr>
                                                        <th style={{width: '192px'}}><span className="arrow">Date</span></th>
                                                        <th style={{width: '192px'}}>Amount</th>
                                                        <th>Notice Link</th>
                                                    </tr>
                                                    <tr>
                                                        <td>15 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Alice, Joe, Ross, Allen</td>
                                                    </tr>
                                                    <tr>
                                                        <td>13 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Luis, June, Johnson, Arthur</td>
                                                    </tr>
                                                    <tr>
                                                        <td>12 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Brenda, Alex, Carla, Dewitt</td>
                                                    </tr>
                                                    <tr>
                                                        <td>10 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                    <tr>
                                                        <td>10 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                    <tr>
                                                        <td>09 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                    <tr>
                                                        <td>08 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                    <tr>
                                                        <td>08 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                    <tr>
                                                        <td>08 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                    <tr>
                                                        <td>07 Jul, 2020</td>
                                                        <td>$1000</td>
                                                        <td>Piter, Alex, Darrell</td>
                                                    </tr>
                                                </tbody>
                                            </table>  */}
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                                    <div className="chngPwdContent">
                                        <form>
                                            <div className="fieldset">
                                                <label>Old Password</label>
                                                <input type="password" name="old_password" /* placeholder="Old Password" */ onChange={(e) => this.changeValuesHandler(e)} value={this.state.formValues.old_password} />
                                            </div>
                                            <div className="fieldset">
                                                <label>New Password</label>
                                                <input type="password" name="new_password" /* placeholder="New Password" */ onChange={(e) => this.changeValuesHandler(e)} value={this.state.formValues.new_password} />
                                            </div>
                                            <div className="fieldset">
                                                <label>Confirm New Password</label>
                                                <input type="password" name="confirm_new_password" /* placeholder="Confirm New Password" */ onChange={(e) => this.changeValuesHandler(e)} value={this.state.formValues.confirm_new_password} />
                                            </div>
                                            {
                                                this.state.error !== '' ?
                                                    <Alert color="danger">
                                                        {this.state.error}
                                                    </Alert>
                                                    : null
                                            }
                                            <div className="btnGroup d-flex justify-content-center">
                                                <button type="button" className="smallBtn width" onClick={this.onPressChangePwd}>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal fade addPermiseModal" id="addPermiseModal" tabIndex={-1} aria-labelledby="addPermiseModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2>Premise Address</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <img src="images/close-icon.svg" />
                                </button>
                                <form>
                                    <div className="fieldset">
                                        <label>Street 1</label>
                                        <input type="text" placeholder />
                                    </div>
                                    <div className="fieldset">
                                        <label>Street 2</label>
                                        <input type="text" placeholder />
                                    </div>
                                    <div className="fieldset">
                                        <label>State</label>
                                        <div className="selectOption">
                                            <div className="custom-select sources noCheck">
                                                <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="twoField d-flex justify-content-between">
                                        <div className="fieldset">
                                            <label>City</label>
                                            <div className="selectOption">
                                                <div className="custom-select sources noCheck">
                                                    <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fieldset">
                                            <label>Zip Code</label>
                                            <input type="text" placeholder />
                                        </div>
                                    </div>
                                    <div className="btnGroup d-flex justify-content-center">
                                        <button type="button" className="smallBtn width">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Modal open={this.state.open} onClose={this.onCloseModal}>
                <div className={"modal fade editProfileModal " +this.state.ToggleInputModal} id="editProfileModal" tabIndex={-1} aria-labelledby="editProfileModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body" >
                                <h2>Edit Profile</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <img src="images/close-icon.svg" />
                                </button>
                                <form>
                                    <div className="fieldset">
                                        <label>First Name</label>
                                        <input type="text" name="first_name" value={this.state.formValues.first_name} onChange={(e) => this.changeValuesHandler(e)} />
                                    </div>
                                    <div className="fieldset">
                                        <label>Last Name</label>
                                        <input type="text" name="last_name" value={this.state.formValues.last_name} onChange={(e) => this.changeValuesHandler(e)} />
                                    </div>
                                    <div className="fieldset">
                                        <label>Email</label>
                                        <input type="text" name="email" readOnly={true} value={this.state.formValues.email} onChange={(e) => this.changeValuesHandler(e)} disabled={true} />
                                    </div>
                                    {
                                        this.state.error !== '' ?
                                            <Alert color="danger">
                                            {this.state.error}
                                            </Alert>
                                            : null
                                    }
                                    <div className="btnGroup d-flex justify-content-center">
                                        <button type="button" className="smallBtn width" onClick={this.onPressChangeEditProfile}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </Modal> */}

                <Footer2 />
            </div>
        );
    }
}

// export default ProfileSetting;

//Get data stored in reducer state
const mapStateToProps = state => {
    return {
        getProfileSuccessRes: state.customers.getProfileSuccessRes,
        getStateSuccessRes: state.customers.getStateSuccessRes,
        getCitySuccessRes: state.customers.getCitySuccessRes,
        changePwdRes: state.auth.changePwdRes,
        editProfileRes: state.salon.editProfileRes,
        addLessorSuccessRes: state.customers.addLessorSuccessRes,
        getLessorAddressSuccessRes: state.customers.getLessorAddressSuccessRes,
        addLessorAddressSuccessRes: state.customers.addLessorAddressSuccessRes,
        editLessorAddressSuccessRes: state.customers.editLessorAddressSuccessRes,
        getLessorAddressByIdSuccessRes: state.customers.getLessorAddressByIdSuccessRes,
        deleteLessorAddressSuccessRes: state.customers.deleteLessorAddressSuccessRes,
        getLessorSuccessRes: state.customers.getLessorSuccessRes,
        addPremiseAddressSuccessRes: state.customers.addPremiseAddressSuccessRes,
        editPremiseAddressSuccessRes: state.customers.editPremiseAddressSuccessRes,
        getPremiseAddressSuccessRes: state.customers.getPremiseAddressSuccessRes,
        deletePremiseAddressSuccessRes: state.customers.deletePremiseAddressSuccessRes,
        loading: state.auth.loading,
        // propertyAddressRes: state.customers.getPropertyAddressRes
    }
}
//Send data to redux action
const mapDispatchToProps = dispatch => {
    return {
        getProfileReq: (reqData) => dispatch(getProfileReq(reqData)),
        getStateReq: (reqData) => dispatch(getStateReq(reqData)),
        getCityReq: (reqData) => dispatch(getCityReq(reqData)),
        changePassword: (reqData) => dispatch(changePassword(reqData)),
        editProfile: (reqData) => dispatch(editProfile(reqData)),
        addLessorName: (reqData) => dispatch(addLessorName(reqData)),
        getLessorAddress: (reqData) => dispatch(getLessorAddress(reqData)),
        addLessorAddress: (reqData) => dispatch(addLessorAddress(reqData)),
        editLessorAddress: (reqData) => dispatch(editLessorAddress(reqData)),
        getLessorAddressByID: (reqData) => dispatch(getLessorAddressByID(reqData)),
        deleteLessorAddress: (reqData) => dispatch(deleteLessorAddress(reqData)),
        getLessor: (reqData) => dispatch(getLessor(reqData)),
        addPremiseAddress: (reqData) => dispatch(addPremiseAddress(reqData)),
        editPremiseAddress: (reqData) => dispatch(editPremiseAddress(reqData)),
        getPremiseAddress: (reqData) => dispatch(getPremiseAddress(reqData)),
        deletePremiseAddress: (reqData) => dispatch(deletePremiseAddress(reqData)),
        // getPropertyAddress: (reqData) => dispatch(GetPropertyAddressById(reqData))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileSetting));
