import * as Types from './actionTypes';
import * as common from '../../utils/functions';

export const subscribeUser = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'subscribe_salon', Types.SUBSCRIBE_USER_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.SUBSCRIBE_USER_SUCCESS,
            res: response
        });
    }
}