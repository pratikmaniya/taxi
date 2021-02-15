import * as Types from './actionTypes';
import * as common from '../../utils/functions';

/**get list of service category based on salon type(1-hair,2-nail) */
export const getServiceCategory = (type) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'service_category/' + type, Types.GET_SERVICE_CATEGORY)
        dispatch({
            type: Types.GET_SERVICE_CATEGORY,
            res: response
        });
    }
}


export const addServiceCategory = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/service_category', Types.ADD_SERVICE_CATEGORY, params)
        dispatch({
            type: Types.ADD_SERVICE_CATEGORY,
            res: response
        });
    }
}

export const editServiceCategory = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'admin/service_category', Types.EDIT_SERVICE_CATEGORY, params)
        dispatch({
            type: Types.EDIT_SERVICE_CATEGORY,
            res: response
        });
    }
}

export const deleteCategory = (category_id) => {
    let params = {
        category_id: category_id
    }
    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'admin/service_category', Types.DELETE_SERVICE_CATEGORY, '', params)
        dispatch({
            type: Types.DELETE_SERVICE_CATEGORY,
            res: response
        });
    }
}