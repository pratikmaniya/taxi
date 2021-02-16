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