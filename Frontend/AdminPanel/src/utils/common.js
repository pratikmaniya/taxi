import Joi from 'joi-browser';
import axios from 'axios';
import alertify from 'alertifyjs';

import config from '../config';
import history from './history';
import store from './store';
import messages from '../utils/messages';
import * as actionTypes from '../store/actionTypes'

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

export const formValueChangeHandler = (e, formValue) => {
  let name = e.target.name;
  const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  if (name.includes('.')) {
    const path = name.split('.');
    setDeep(formValue, path, value)
  } else if (name.match(/\[(.*?)\]/)) {
    let index = name.match(/\[(.*?)\]/)[1];
    name = name.split('[')[0];
    formValue[name][index] = value;
  } else {
    formValue[name] = value;
  }
  return formValue
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

export const apiCall = async (method, url, reqData, params, header) => {
  return new Promise((resolve, reject) => {
    store.dispatch({
      type: actionTypes.START_LOADER
    })
    let headers;
    if (header) {
      headers = header;
    } else {
      headers = {
        language: "en",
        web_app_version: "1.0.0",
        auth_token: config.auth_token
      };
    }
    if (localStorage.getItem('MOTO_AUTH_TOKEN') !== null) {
      headers.auth_token = localStorage.getItem('MOTO_AUTH_TOKEN');
    }
    axios({
      method: method,
      url: config.API_BASE_URL + url,
      data: reqData,
      headers: headers,
      params: params
    })
      .then((response) => {
        store.dispatch({
          type: actionTypes.STOP_LOADER
        })
        let data = response.data;
        if (data.code === 401) {
          store.dispatch({
            type: actionTypes.SET_REDRECT_TO_LOGIN_TRUE,
          })
          displayLog(data.code, messages.EN.SESSION_EXPIRED_MSG);
        } else if (data.code === 0) {
          displayLog(data.code, data.message);
        } else {
          resolve(data);
        }
      })
      .catch(async (error) => {
        console.log('=================error', error);
        store.dispatch({
          type: actionTypes.STOP_LOADER
        })
        if (error && error.response && error.response.status === 401) {
          displayLog(0, messages.EN.SESSION_EXPIRED_MSG);
          logOut(false);
        }
        return error;
      })
  })
}

export const displayLog = (code, message) => {
  alertify.dismissAll();
  if (code === 1) {
    alertify.success(message);
  } else if (code === 0) {
    alertify.error(message);
  } else {
    alertify.warning(message);
  }
}

export const logOut = (props) => {
  if (props) {
    confirmBox(messages.EN.CONFIRM_BOX_TITLE, messages.EN.NETWORK_CONNECTION_LOST);
  } else {
    localStorage.removeItem('MOTO_AUTH_TOKEN');
    history.go('/login')
  }
  localStorage.clear();
}

export const capitalizeFirstLetter = text => {
  text = text.replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const confirmBox = (title, message) => {
  return new Promise((resolve, reject) => {
    alertify.confirm(title, message, () => { resolve(1) }, () => { resolve(0) });
  })
}

export const getFormatedDateFromTimeStamp = (timestamp) => {
  if (timestamp) {
    let date = new Date(timestamp).getDate(),
      month = new Date(timestamp).getMonth() + 1,
      year = new Date(timestamp).getFullYear()
    return `${String(date).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`
  } else {
    return null
  }
}