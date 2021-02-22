import * as Types from './actionTypes';
import * as common from '../utils/functions';

export const startLoader = () => ({
    type: 'START_LOADER',
})

export const stopLoader = () => ({
    type: 'STOP_LOADER',
})

export const login = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'signin', Types.LOGIN_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.LOGIN_SUCCESS,
            res: response
        });
    }
}

export const searchTaxi = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'taxi', Types.SEARCH_TAXI_SUCCESS, {}, params)
        console.log('Response::::', response)
        dispatch({
            type: Types.SEARCH_TAXI_SUCCESS,
            res: response
        });
    }
}

export const getReviews = (params, taxi_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', `review/${taxi_id}`, Types.GET_REVIEWS_SUCCESS, {}, params)
        console.log('Response::::', response)
        dispatch({
            type: Types.GET_REVIEWS_SUCCESS,
            res: response
        });
    }
}

export const addReview = (data) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', `review`, Types.ADD_REVIEW_SUCCESS, data, {})
        console.log('Response::::', response)
        dispatch({
            type: Types.ADD_REVIEW_SUCCESS,
            res: response
        });
    }
}

export const registerTaxi = (data) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'taxi', Types.REGISTER_TAXI_SUCCESS, data)
        console.log('Response::::', response)
        dispatch({
            type: Types.REGISTER_TAXI_SUCCESS,
            res: response
        });
    }
}