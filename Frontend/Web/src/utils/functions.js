import Joi from 'joi-browser';
import config from './config';
import history from './history';
import axios from 'axios';
import alertify from 'alertifyjs';
import store from './store';
import * as Types from '../store/actionTypes';

export const buildSchema = (attributes) => {
    const joiKeys = {};
    for (const key in attributes) {
        let myJoi = Joi;
        if (attributes[key].type === 'String' || ((attributes[key].type === 'Reference' || attributes[key].type === 'Select') && attributes[key].multiple === false)) {
            myJoi = myJoi.string().strict().trim();
        }
        if ((attributes[key].type === 'Reference' || attributes[key].type === 'Select') && attributes[key].multiple === true) {
            myJoi = myJoi.array().items();
        }
        if (attributes[key].type === 'Number') {
            myJoi = myJoi.number();
        }
        if (attributes[key].type === 'Integer') {
            myJoi = myJoi.number().integer();
        }
        if (attributes[key].type === 'Email') {
            myJoi = myJoi.string().strict().trim().email({ minDomainSegments: 2 });
        }
        if (attributes[key].type === 'Boolean') {
            myJoi = myJoi.boolean().strict();
        }
        if (attributes[key].pattern) {
            myJoi = myJoi.pattern(attributes[key].pattern);
        }
        if (attributes[key].min && (attributes[key].type === 'String' || attributes[key].type === 'Number' || attributes[key].type === 'Integer' ||
            ((attributes[key].type === 'Reference' || attributes[key].type === 'Select') && attributes[key].multiple === false))) {
            myJoi = myJoi.min(attributes[key].min);
        }
        if (attributes[key].max && (attributes[key].type === 'String' || attributes[key].type === 'Number' || attributes[key].type === 'Integer' ||
            ((attributes[key].type === 'Reference' || attributes[key].type === 'Select') && attributes[key].multiple === false))) {
            myJoi = myJoi.max(attributes[key].max);
        }
        if (attributes[key].required === true && (attributes[key].type === 'Reference' || attributes[key].type === 'Select')) {
            myJoi = myJoi.min(1);
        }
        if (attributes[key].required === true) {
            myJoi = myJoi.required();
        }
        joiKeys[key] = myJoi;
    }
    return Joi.object().keys(joiKeys);
}
export const validateSchema = (body, schema) => {
    return new Promise((resolve, reject) => {
        Joi.validate(body, schema, (error, value) => {
            if (error) {
                let msg;
                let key = error.details[0].context.label || error.details[0].context.key;
                if (error.details[0].type.includes('empty')) {
                    msg = key.replace(/_/g, ' ') + ' is required!';
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('number.less')) {
                    msg = key.replace(/_/g, ' ') + ' must be less than ' + error.details[0].context.limit + '!';
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('number.greater')) {
                    msg = key.replace(/_/g, ' ') + ' must be greater than ' + error.details[0].context.limit + '!';
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('string.min')) {
                    msg = key.replace(/_/g, ' ') + ' length must be at least ' + error.details[0].context.limit + ' characters long!';
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('string.max')) {
                    msg = key.replace(/_/g, ' ') + ' length must be less than or equal to ' + error.details[0].context.limit + ' characters long!';
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('number.min')) {
                    msg = key.replace(/_/g, ' ') + 'should be greater than or equal to ' + error.details[0].context.limit;
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('number.max')) {
                    msg = key.replace(/_/g, ' ') + ' should be less than or equal to ' + error.details[0].context.limit;
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else if (error.details[0].type.includes('allowOnly')) {
                    msg = 'Password and confirm password must be same!';
                    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                } else {
                    msg = 'Please enter a valid ' + key.replace(/_/g, ' ') + '!';
                }
                resolve({
                    status: true,
                    message: msg
                });
            } else {
                resolve({
                    status: false,
                    message: ''
                });
            }
        })
    })
};
export const setDeep = (obj, path, value, setrecursively = false) => {
    let level = 0;
    path.reduce((a, b) => {
        level++;
        if (setrecursively && typeof a[b] === "undefined" && level !== path.length) {
            a[b] = {};
            return a[b];
        }
        if (level === path.length) {
            a[b] = value;
            return value;
        } else {
            return a[b];
        }
    }, obj);
    return obj;
}
export const apiCall = (method, url, actionType, reqData, params, headers) => {
    return new Promise((resolve, reject) => {
        store.dispatch({
            type: Types.START_LOADER
        })
        let reqHeaders = { "auth_token": config.AUTHORIZATION };
        if (headers) {
            reqHeaders = headers;
        }
        axios({
            method: method,
            url: config.API_BASE_URL + url,
            data: reqData,
            headers: reqHeaders,
            params: params
        })
            .then(async (response) => {
                console.log('===============success', response);
                store.dispatch({
                    type: Types.STOP_LOADER
                })
                let data = response.data;
                if (data.code === 401) {
                    history.push(process.env.PUBLIC_URL + '/login');
                    localStorage.clear()
                    displayLog(0, 'Session expired!');

                }
                resolve(data);
                store.dispatch({
                    type: Types.STOP_LOADER
                })
            })
            .catch(async (error) => {
                console.log('=================error', error);
                if (error.response && error.response.status === 401) {
                    history.push(process.env.PUBLIC_URL + '/signin');
                    localStorage.clear()
                    displayLog(0, 'Session expired!');
                    store.dispatch({
                        type: Types.STOP_LOADER
                    })
                } else {
                    localStorage.clear()
                    if (!error.code === 403) {
                        displayLog(0, 'Network error!');
                    }
                    store.dispatch({
                        type: Types.STOP_LOADER
                    })
                }
            })
    })
}
export const logout = async () => {
    alertify.confirm("Are you sure you want to log out?", async (status) => {
        if (status) {
            await localStorage.clear()
            history.push(process.env.PUBLIC_URL + '/')
        }
    }).setHeader('Taxi').set('labels', { ok: 'OK', cancel: 'CANCEL' });
}
export const displayLog = (code, message) => {
    // console.log('1111122222')
    alertify.set('notifier', 'position', 'top-right');
    alertify.dismissAll();
    if (code === 1) {
        alertify.success(message);
    } else if (code === 0) {
        alertify.error(message);
    } else {
        alertify.log(message);
    }
}
export const confirmBox = (title, message) => {
    return new Promise((resolve, reject) => {
        alertify.confirm(title, message, () => { resolve(1) }, () => { resolve(0) });
    })
}