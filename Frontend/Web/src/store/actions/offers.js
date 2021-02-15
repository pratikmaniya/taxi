import * as Types from './actionTypes';
import * as common from '../../utils/functions';

/**get list of Offers  based on salon id */
export const getOffers = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET',
            'offers', Types.GET_OFFERS_SUCCESS, {}, reqData)
        // console.log('offers:', response)
        dispatch({
            type: Types.GET_OFFERS_SUCCESS,
            res: response
        });
    }
}

export const activeOffers = (reqData) => {

    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'admin/offer_status', Types.OFFER_STATUS_SUCCESS, reqData)
        // console.log('activeOffers::::', response)
        dispatch({
            type: Types.OFFER_STATUS_SUCCESS,
            res: response
        });
    }
}
export const deleteOffer = (offer_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'admin/offer/' + offer_id, Types.DELETE_OFFERS_SUCCESS)
        // console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_OFFERS_SUCCESS,
            res: response
        });
    }
}
export const addOffer = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/offer', Types.ADD_OFFERS_SUCCESS, params)
        dispatch({
            type: Types.ADD_OFFERS_SUCCESS,
            res: response
        });
    }
}

export const editOffer = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'admin/offer', Types.EDIT_OFFERS_SUCCESS, params)
        dispatch({
            type: Types.EDIT_OFFERS_SUCCESS,
            res: response
        });
    }
}

