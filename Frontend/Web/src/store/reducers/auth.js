import * as Types from '../actions/actionTypes';

const initialState = {
    loginData: {},
    signUpData: {},
    verificationData: {},
    forgotPasswordRes: {},
    resetPasswordData: {},
    verifyResetPasswordLinkData: {},
    loading: false,
    pageloading: false,
    changePwdRes: {},
    resendOtpRes: {},
    setPasswordRes: {},
    verifyCodeRes: {}
}


const loginSuccess = (state, action) => {
    return {
        ...state,
        loginData: action.res,
    }
}

const signUpSuccess = (state, action) => {
    console.log('1111111')
    return {
        ...state,
        signUpData: action.res,
    }
}

const logoutSuccess = (state, action) => {
    return {
        ...state,
        isEmailChange: action.isEmailChange,
    }
}

const verifyEmailSuccess = (state, action) => {
    return {
        ...state,
        verificationData: action.res,
    }
}

const forgotPasswordRes = (state, action) => {
    return {
        ...state,
        forgotPasswordRes: action.res,
    }
}
const resendOtpForgotPassword = (state, action) => {
    return {
        ...state,
        resendOtpRes: action.res,
    }
}
const setPasswordRes = (state, action) => {
    return {
        ...state,
        setPasswordRes: action.res,
    }
}

const verifyCode = (state, action) => {
    return {
        ...state,
        verifyCodeRes: action.res,
    }
}

const resetPasswordSuccess = (state, action) => {
    return {
        ...state,
        resetPasswordData: action.res,
    }
}

const verifyResetPasswordLinkSuccess = (state, action) => {
    return {
        ...state,
        verifyResetPasswordLinkData: action.res,
    }
}
const verifyOTPSuccess = (state, action) => {
    return {
        ...state,
        verifyOTPRes: action.res,
    }
}
const resendOTPSuccess = (state, action) => {
    return {
        ...state,
        resendOTPRes: action.res,
    }
}
const changePasswordSuccess = (state, action) => {
    return {
        ...state,
        changePwdRes: action.res
    }
}

const verifyDetails = (state, action) => {
    return {
        ...state,
        verifyDetailsRes: action.res
    }
}

const verifyResendOtpSuccess = (state, action) => {
    return {
        ...state,
        verifyResendOtpRes: action.res
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_SUCCESS: return loginSuccess(state, action)
        case Types.SIGNUP_SUCCESS: return signUpSuccess(state, action)
        case Types.LOGOUT_SUCCESS: return logoutSuccess(state, action)
        case Types.FORGOT_PASSWORD_SUCCESS: return forgotPasswordRes(state, action)
        case Types.RESET_PASSWORD_SUCCESS: return resetPasswordSuccess(state, action)
        case Types.VERIFY_EMAIL_SUCCESS: return verifyEmailSuccess(state, action)
        case Types.VERIFY_RESET_PASSWORD_LINK_SUCCESS: return verifyResetPasswordLinkSuccess(state, action)
        case Types.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action)
        case Types.VERIFY_OTP_SUCCESS: return verifyOTPSuccess(state, action)
        case Types.RESEND_OTP_SUCCESS: return resendOTPSuccess(state, action)
        case Types.RESEND_OTP_FORGOT_PASSWORD: return resendOtpForgotPassword(state, action)
        case Types.SET_PASSWORD_SUCCESS: return setPasswordRes(state, action)
        case Types.VERIFY_CODE_SUCCESS: return verifyCode(state, action)
        case Types.VERIFY_DETAILS_SUCCESS: return verifyDetails(state, action)
        case Types.RESEND_VERIFY_OTP_SUCCESS: return verifyResendOtpSuccess(state, action)

        case Types.START_LOADER:
            return {
                ...state,
                loading: true,
            }
        case Types.START_OTHER_LOADER:
            return {
                ...state,
                pageloading: true,
            }

        case Types.STOP_LOADER:
            return {
                ...state,
                loading: false,
            }
        case Types.STOP_OTHER_LOADER:
            return {
                ...state,
                pageloading: false,
            }
        default:
            return state;
    }
}
export default reducer;