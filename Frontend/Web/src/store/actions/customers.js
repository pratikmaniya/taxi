import * as Types from './actionTypes';
import * as common from '../../utils/functions';

/**get list of customers */
export const getCustomersReq = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'admin/customers', Types.GET_CUSTOMERS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_CUSTOMERS,
            res: response
        });
    }
}

export const getProfileReq = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'getProfile', Types.GET_PROFILE_SUCCESS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_PROFILE_SUCCESS,
            res: response
        });
    }
}

export const getStateReq = (reqData) => {
    return async (dispatch) => {
        // console.log(reqData)
        let response = await common.apiCall('POST', 'getStateList', Types.GET_STATE_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_STATE_SUCCESS,
            res: response
        });
    }
}

export const getCityReq = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'getCityByStateId', Types.GET_CITY_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_CITY_SUCCESS,
            res: response
        });
    }
}

export const addLessorName = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'AddLandLord', Types.ADD_LESSOR_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.ADD_LESSOR_SUCCESS,
            res: response
        });
    }
}

export const getLessorAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'GetLandLordAddress', Types.GET_LESSOR_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_LESSOR_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const addLessorAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'AddLandLordAddress', Types.ADD_LESSOR_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.ADD_LESSOR_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const editLessorAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'EditLandLordAddress', Types.EDIT_LESSOR_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.EDIT_LESSOR_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const getLessorAddressByID = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'GetLandLordAddressById', Types.GET_LESSOR_ADDRESS_BYID_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_LESSOR_ADDRESS_BYID_SUCCESS,
            res: response
        });
    }
}

export const deleteLessorAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'deleteLandLordAddress', Types.DELETE_LESSOR_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_LESSOR_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const getLessor = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'GetLandLord', Types.GET_LESSOR_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_LESSOR_SUCCESS,
            res: response
        });
    }
}

export const addPremiseAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'AddPropertyAddress', Types.ADD_PREMISE_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.ADD_PREMISE_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const editPremiseAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'EditPropertyAddress', Types.EDIT_PREMISE_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.EDIT_PREMISE_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const getPremiseAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'GetPropertyAddress', Types.GET_PREMISE_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_PREMISE_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const deletePremiseAddress = (reqData) => {
    return async (dispatch) => {
        console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'deletePropertyAddress', Types.DELETE_PREMISE_ADDRESS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_PREMISE_ADDRESS_SUCCESS,
            res: response
        });
    }
}

export const profileSetup = (reqData) => {
    return async (dispatch) => {
        // console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'profilesetup', Types.PROFILE_SETUP_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.PROFILE_SETUP_SUCCESS,
            res: response
        });
    }
}

export const getFaq = (reqData) => {
    return async (dispatch) => {
        // console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'getFaqs', Types.FAQ_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.FAQ_SUCCESS,
            res: response
        });
    }
}

export const getAbout = (reqData) => {
    return async (dispatch) => {
        // console.log("reqData",reqData)
        let response = await common.apiCall('POST', 'GetAboutUs', Types.ABOUT_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.ABOUT_SUCCESS,
            res: response
        });
    }
}

export const getTermsOfUse = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'GetTermsUse', Types.TERMSOFUSE_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.TERMSOFUSE_SUCCESS,
            res: response
        });
    }
}

export const getPrivacyPolicy = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'GetPrivacy', Types.PRIVACYPOLICY_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.PRIVACYPOLICY_SUCCESS,
            res: response
        });
    }
}