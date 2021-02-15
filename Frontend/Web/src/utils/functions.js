import Joi from 'joi-browser';
import config from './config';
import history from './history';
import * as crypto from 'crypto-js';
import axios from 'axios';
import alertify from 'alertifyjs';
import moment from 'moment';
import routes from '../Routes';
import store from './store';
import { STORAGE_KEYS, LANGUAGE, APP_NAME } from './constants';
import * as Types from '../store/actions/actionTypes';
import messages from './messages';

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


export const validateSchema = (error) => {
    let msg;
    let key = error.details[0].context.label || error.details[0].context.key;
    if (error.details[0].type.includes('empty')) {
        msg = key.replace(/_/g, ' ') + ' is required!';
        msg = msg.charAt(0).toUpperCase() + msg.slice(1);
    } else if (error.details[0].type.includes('string.min')) {
        msg = key.replace(/_/g, ' ') + ' length must be at least ' + error.details[0].context.limit + ' characters long!';
        msg = msg.charAt(0).toUpperCase() + msg.slice(1);
    } else if (error.details[0].type.includes('string.max')) {
        msg = key.replace(/_/g, ' ') + ' length must be less than or equal to ' + error.details[0].context.limit + ' characters long!';
        msg = msg.charAt(0).toUpperCase() + msg.slice(1);
    } else if (error.details[0].type.includes('number.min')) {
        msg = key.replace(/_/g, ' ') + ' should be greater than or equal to ' + error.details[0].context.limit;
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
    let result = { error: msg, errorField: error.details[0].context.key }
    return result;
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

export const encrypt = (message) => {                            // encrypt message
    // if (message && message !== '') {
    //     let cipherText = crypto.AES.encrypt(message, config.KEY).toString();
    //     return cipherText;
    // }
    // else{
    //     localStorage.clear()
    //     history.push(process.env.PUBLIC_URL + '/login')
    // }
    let cipherText = crypto.AES.encrypt(message, config.KEY).toString();
    return cipherText;
};

export const decrypt = (cipherText) => {                         // decrypt cipherText
    // if (cipherText && cipherText !== '') {
    //     let message = crypto.AES.decrypt(cipherText, config.KEY).toString(crypto.enc.Utf8);
    //     return message;
    // }
    // else{
    //     localStorage.clear()
    //     history.push(process.env.PUBLIC_URL + '/login')
    // }
    let message = crypto.AES.decrypt(cipherText, config.KEY).toString(crypto.enc.Utf8);
    return message;
};

export const refreshToken = async (method, url, actionType, reqData, params, headers) => {
    let rtData = { "refresh_token": localStorage.getItem('REFRESH_TOKEN') }
    return new Promise((resolve, reject) => {
        apiCall('POST', 'refresh-token', Types.REFRESH_TOKEN_SUCCESS, rtData)
            .then(async (res) => {
                await localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, encrypt(res.data.auth_token))
                await localStorage.setItem('REFRESH_TOKEN', res.data.refresh_token)
                apiCall(method, url, actionType, reqData, params, headers)
                    .then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        console.log('API Call error after refresh token-------', error)
                    })
            })
            .catch((e) => {
                console.log('Error in refresh token', e)
            })
    })
}

export const apiCall = (method, url, actionType, reqData, params, headers) => {
    return new Promise((resolve, reject) => {
        store.dispatch({
            type: Types.START_LOADER
        })
        // store.dispatch({
        //     type: Types.START_OTHER_LOADER
        // })

        let reqHeaders = {};
        if (headers) {
            reqHeaders = headers;
        } else {
            reqHeaders = {
                "language": LANGUAGE,
                // "auth_token": (!localStorage.getItem(STORAGE_KEYS.AUTH)) ? config.AUTHORIZATION : decrypt(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)),
                "auth_token": (!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)) ? config.AUTHORIZATION : localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
                "web_app_verison": 1
            }

        }
        if(url == 'signup' || url == 'signin' || url == 'getStateList' || url == 'getCityList' || url == 'getCityByStateId' || url == 'faq') {
            reqHeaders['auth_token'] = '@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#TEKOTO';
        }
        console.log("reqHeaders==>",reqHeaders) 
        axios({
            method: method, 
            url: config.API_BASE_URL + url,
            data: reqData,
            headers: reqHeaders,
            params: params
        })
            .then(async (response) => {

                console.log('===============success', response);
                //console.log('locallll', localStorage.getItem('REFRESH_TOKEN'));

                store.dispatch({
                    type: Types.STOP_LOADER
                })
                // store.dispatch({
                //     type: Types.STOP_OTHER_LOADER
                // })
                let data = response.data;
                // console.log('data---------', data)
                if (data.code === 401) {
                    console.log('in 401');

                    await refreshToken(method, url, actionType, reqData, params, headers)
                        .then((response) => {
                            store.dispatch({
                                type: actionType,
                                res: response.data
                            })
                            resolve(response)
                        })
                        .catch((error) => {
                            console.log('error while calling refresh token---------', error)
                        })
                    // history.push(process.env.PUBLIC_URL + '/login');
                    // localStorage.clear()
                    // displayLog(0, 'Session expired!');
                   
                } else if (data.code === 0) {
                    if (actionType === Types.VERIFY_EMAIL_SUCCESS || actionType === Types.ADD_APPOINTMENT || actionType === Types.GET_FREESLOTS_SUCCESS) {
                        resolve(data);
                    } else {
                        // resolve(data);
                        displayLog(data.code, data.message);
                    }
                }
                else if (data.code === 2) {
                    // displayLog(0, data.message);
                    resolve(data)
                }

                else {
                    resolve(data);
                }
                store.dispatch({
                    type: Types.STOP_LOADER
                })
            })
            .catch(async (error) => {
                console.log('=================error', error);
                if (error.response && error.response.status === 401) {
                    await refreshToken(method, url, actionType, reqData, params, headers)
                        .then((response) => {
                            store.dispatch({
                                type: actionType,
                                res: response.data
                            })
                            resolve(response)
                        })
                        .catch((error) => {
                            console.log('error while calling refresh token---------', error)
                        })
                    // history.push(process.env.PUBLIC_URL + '/signin');
                    // localStorage.clear()
                    // displayLog(0, 'Session expired!');
                    // store.dispatch({
                    //     type: Types.STOP_LOADER
                    // })
                }

                else {
                    // if (error.response && error.response.status === 403) {
                    //     resolve(error.response)
                    //     alertify.error(error.response.data.message)
                    //     store.dispatch({
                    //         type: Types.STOP_LOADER
                    //     })
                    //     history.push(process.env.PUBLIC_URL + '/signin');
                    //     localStorage.clear()

                    // }
                    // else {
                    // console.log('error.code---------', error.response && error.response.data)
                    
                    // history.push(process.env.PUBLIC_URL + '/signin');
                    localStorage.clear()
                    if (!error.code === 403) {
                        displayLog(0, 'Network error!');
                    }
                    else {
                        console.log('11111111')
                        if(error.response.data.message == "You can no longer to use this application.Application admin has blocked your account.Please contact to admin.")
                        {
                            alertify.alert(error.response.data.message, function(){
                            }).setHeader(APP_NAME).set('labels', { ok: 'OK', cancel: 'CANCEL' });
                            setTimeout(() => {
                                history.push(process.env.PUBLIC_URL + '/signin')
                            }, 5000)
                        }
                        else{
                            alertify.error(error.response.data && error.response.data.message)
                            history.push(process.env.PUBLIC_URL + '/signin');
                        }

                        
                    }
                    store.dispatch({
                        type: Types.STOP_LOADER
                    })
                    // store.dispatch({
                    //     type: Types.STOP_OTHER_LOADER
                    // })
                    //}
                }
            })
    })
}
export const logout = async () => {
    alertify.confirm(messages.ASK_TO_LOGOUT, async (status) => {
        if (status) {
            // history.go(routes.HOME)            
            await localStorage.clear()
            history.push(routes.HOME)
        }
    }).setHeader(APP_NAME).set('labels', { ok: 'OK', cancel: 'CANCEL' });
    // history.push(routes.HOME)
    // history.push(process.env.PUBLIC_URL + '/login')
    // await localStorage.clear()
}
export const displayLog = (code, message) => {
    // console.log('1111122222')
    alertify.set('notifier','position', 'top-right');
    alertify.dismissAll();
    if (code === 1) {
        alertify.success(message);
    } else if (code === 0) {
        alertify.error(message);
    } else {
        alertify.log(message);
    }
}

export const capitalizeFirstLetter = text => {
    text = text.replace(/_/g, ' ')
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const lowerCaseWithHypen = text => {
    return text.toLowerCase().replace(/ /g, '_')
}

export const confirmBox = (title, message) => {
    return new Promise((resolve, reject) => {
        alertify.confirm(title, message, () => { resolve(1) }, () => { resolve(0) });
    })
}

export const timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export const timeTo12hours = (timeString) => {
    if (timeString) {
        var hourEnd = timeString.indexOf(":");
        var H = +timeString.substr(0, hourEnd);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? " AM" : " PM";
        return timeString = h + timeString.substr(hourEnd, 3) + ampm;
    }
}

export const timeTo24hours = (time) => {
    if (time) {
        console.log('time------------------', time);
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AP = time.match(/\s(.*)$/);
        if (!AP) AP = time.slice(-2);
        else AP = AP[1];
        if (AP == "PM" && hours < 12) hours = hours + 12;
        if (AP == "AM" && hours == 12) hours = hours - 12;
        var Hours24 = hours.toString();
        var Minutes24 = minutes.toString();
        if (hours < 10) Hours24 = "0" + Hours24;
        if (minutes < 10) Minutes24 = "0" + Minutes24;

        return Hours24 + ":" + Minutes24
    }
}

export const dayToFullDay = (day) => {
    if (day == 'Mon') {
        return ('Monday')
    }
    else if (day == 'Tue') {
        return ('Tuesday')
    }
    else if (day == 'Wed') {
        return ('Wednesday')
    }
    else if (day == 'Thu') {
        return ('Thursday')
    }
    else if (day == 'Fri') {
        return ('Friday')
    }
    else if (day == 'Sat') {
        return ('Saturday')
    }
    else if (day == 'Sun') {
        return ('Sunday')
    }
}

export const convertTimeStampToTime = (time) => {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // console.log("formattedTime", formattedTime);

    return (formattedTime)
}
export const convertTimeStampToTimein12Hours = (time) => {
    var date = new Date(time);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
export const fullFormatDate = (date) => {

    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)
    return (`${day}-${month}-${year}`)
    // console.log(`${day}-${month}-${year}`)
    // console.log(`${day}👠${month}👢${year}`)
}

export const timeToTimeStamp = (time) => {
    console.log("time is", new Date());

    var splitDate2 = time && time.split(':');
    var m2 = moment(new Date()).set({ 'hour': splitDate2 && splitDate2[0], 'minute': splitDate2 && splitDate2[1] })
    console.log("first m2", new Date());

    var timeStamp = m2._d.getTime()
    console.log("a0000", m2._d.getTime());
    return timeStamp
}

export const timeToTimeStampForGivenDate = (time, date) => {
    console.log("time issss", new Date(date).toDateString());
    console.log(moment('4/17/2018 10:00 AM', 'mm/dd/yyyy hh:mm a').format('x'));
    var splitDate2 = time && time.split(':');
    console.log("splitDate2", splitDate2);

    var m2 = moment(new Date(date).toDateString()).set({ 'hour': splitDate2 && splitDate2[0], 'minute': splitDate2 && splitDate2[1] })
    console.log("m2 is", m2);

    var timeStamp = m2._d.getTime()
    console.log("a111", m2._d.getTime());
    return timeStamp
}

export const monthToSend = (month) => {

    console.log("month ss", month);

    if (month < 10) {
        console.log(" '0' + month", '0' + month);

        return ('0' + month);
    }
    else {
        return month
    }

}