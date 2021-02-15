import * as Types from './actionTypes';
import * as common from '../../utils/functions';

export const login = (reqData) => {
    // console.log("==LoginRegData==",reqData)
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'signin', Types.LOGIN_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.LOGIN_SUCCESS,
            res: response
        });
    }
}

export const forgotPassword = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'forgot-password', Types.FORGOT_PASSWORD_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.FORGOT_PASSWORD_SUCCESS,
            res: response
        });
    }
}

export const resendOTPForgetPassword = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'resend-otp', Types.RESEND_OTP_FORGOT_PASSWORD, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.RESEND_OTP_FORGOT_PASSWORD,
            res: response
        });
    }
}

export const setPassword = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'set-password', Types.SET_PASSWORD_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.SET_PASSWORD_SUCCESS,
            res: response
        });
    }
}

export const verifyCode = (reqData) => {
    console.log("reqData is", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('POST', 'verify-code', Types.VERIFY_CODE_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.VERIFY_CODE_SUCCESS,
            res: response
        });
    }
}

export const signUp = (reqData) => {
    console.log("req", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('POST', 'signup', '', reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.SIGNUP_SUCCESS,
            res: response
        });
    }
}
export const verifyOtp = (reqData) => {
    console.log("req", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('POST', 'verify-otp', Types.VERIFY_OTP_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.VERIFY_OTP_SUCCESS,
            res: response
        });
    }
}

export const resendOTP = (reqData) => {
    console.log("req", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'resend-otp', Types.RESEND_OTP_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.RESEND_OTP_SUCCESS,
            res: response
        });
    }
}

export const resendVerifyOTP = (reqData) => {
    console.log("req", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'resend-verify-otp', Types.RESEND_VERIFY_OTP_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.RESEND_VERIFY_OTP_SUCCESS,
            res: response
        });
    }
}

export const verifyDetails = (reqData) => {
    console.log("req", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('POST', 'verifyDetails', Types.VERIFY_DETAILS_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.VERIFY_DETAILS_SUCCESS,
            res: response
        });
    }
}

export const verifyEmail = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'verify-email/' + reqData, Types.VERIFY_EMAIL_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.VERIFY_EMAIL_SUCCESS,
            res: response
        });
    }
}

export const logout = (res) => {
    localStorage.clear();
    return {
        type: Types.LOGOUT_SUCCESS,
        res: res
    }
}

export const startLoader = () => ({
    type: Types.START_LOADER,
})

export const startOtherLoader = () => ({
    type: Types.START_OTHER_LOADER,
})

export const stopLoader = () => ({
    type: Types.STOP_LOADER,
})

export const stopOtherLoader = () => ({
    type: Types.STOP_OTHER_LOADER,
})

export const resetPassword = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/resetPassword', Types.RESET_PASSWORD_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.RESET_PASSWORD_SUCCESS,
            res: response
        });
    }
}

export const verifyResetPasswordLink = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/checkLink', Types.VERIFY_RESET_PASSWORD_LINK_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.VERIFY_RESET_PASSWORD_LINK_SUCCESS,
            res: response
        });
    }
}

export const changePassword = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'changePassword', Types.CHANGE_PASSWORD_SUCCESS, params)
        dispatch({
            type: Types.CHANGE_PASSWORD_SUCCESS,
            res: response
        });
    }
}
