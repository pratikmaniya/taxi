import * as Types from '../actions/actionTypes';

const initialState = {
    getCustomerSuccessRes: {},
    addserviceCategorySuccessRes: {},
    getProfileSuccessRes: {},
    getStateSuccessRes: {},
    getCitySuccessRes: {},
    addLessorSuccessRes: {},
    getLessorAddressSuccessRes: {},
    addLessorAddressSuccessRes: {},
    editLessorAddressSuccessRes: {},
    getLessorAddressByIdSuccessRes: {},
    deleteLessorAddressSuccessRes: {},
    getLessorSuccessRes: {},
    addPremiseAddressSuccessRes: {},
    editPremiseAddressSuccessRes: {},
    getPremiseAddressSuccessRes: {},
    deletePremiseAddressSuccessRes: {},
    profileSetupSuccessRes: {},
    faqSuccessRes : {},
    aboutSuccessRes : {},
    termsOfUseSuccessRes: {},
    privacyPolicySuccessRes: {}
}

const getCustomerSuccess = (state, action) => {
    return {
        ...state,
        getCustomerSuccessRes: action.res,
    }
}

const getProfileSuccess = (state, action) => {
    return {
        ...state,
        getProfileSuccessRes: action.res,
    }
}

const getStateSuccess = (state, action) => {
    return {
        ...state,
        getStateSuccessRes: action.res,
    }
}

const getCitySuccess = (state, action) => {
    return {
        ...state,
        getCitySuccessRes: action.res,
    }
}

const addLessorSuccess = (state, action) => {
    return {
        ...state,
        addLessorSuccessRes: action.res,
    }
}

const getLessorAddressSuccess = (state, action) => {
    return {
        ...state,
        getLessorAddressSuccessRes: action.res,
    }
}

const addLessorAddressSuccess = (state, action) => {
    return {
        ...state,
        addLessorAddressSuccessRes: action.res,
    }
}

const editLessorAddressSuccess = (state, action) => {
    return {
        ...state,
        editLessorAddressSuccessRes: action.res,
    }
}

const getLessorAddressByIdSuccess = (state, action) => {
    return {
        ...state,
        getLessorAddressByIdSuccessRes: action.res,
    }
}

const deleteLessorAddressSuccess = (state, action) => {
    return {
        ...state,
        deleteLessorAddressSuccessRes: action.res,
    }
}

const getLessorSuccess = (state, action) => {
    return {
        ...state,
        getLessorSuccessRes: action.res,
    }
}

const addPremiseAddressSuccess = (state, action) => {
    return {
        ...state,
        addPremiseAddressSuccessRes: action.res,
    }
}

const editPremiseAddressSuccess = (state, action) => {
    return {
        ...state,
        editPremiseAddressSuccessRes: action.res,
    }
}

const getPremiseAddressSuccess = (state, action) => {
    return {
        ...state,
        getPremiseAddressSuccessRes: action.res,
    }
}

const deletePremiseAddressSuccess = (state, action) => {
    return {
        ...state,
        deletePremiseAddressSuccessRes: action.res,
    }
}

const profileSetupSuccess = (state, action) => {
    return {
        ...state,
        profileSetupSuccessRes: action.res,
    }
}

const faqSuccess = (state, action) => {
    return {
        ...state,
        faqSuccessRes: action.res,
    }
}

const aboutSuccess = (state, action) => {
    return {
        ...state,
        aboutSuccessRes: action.res,
    }
}

const termsOfUseSuccess = (state, action) => {
    return {
        ...state,
        termsOfUseSuccessRes: action.res,
    }
}

const privacyPolicySuccess = (state, action) => {
    return {
        ...state,
        privacyPolicySuccessRes: action.res,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CUSTOMERS: return getCustomerSuccess(state, action)
        case Types.GET_PROFILE_SUCCESS: return getProfileSuccess(state, action)
        case Types.GET_STATE_SUCCESS: return getStateSuccess(state, action)
        case Types.GET_CITY_SUCCESS: return getCitySuccess(state, action)
        case Types.ADD_LESSOR_SUCCESS: return addLessorSuccess(state, action)
        case Types.GET_LESSOR_ADDRESS_SUCCESS: return getLessorAddressSuccess(state, action)
        case Types.ADD_LESSOR_ADDRESS_SUCCESS: return addLessorAddressSuccess(state, action)
        case Types.EDIT_LESSOR_ADDRESS_SUCCESS: return editLessorAddressSuccess(state, action)
        case Types.GET_LESSOR_ADDRESS_BYID_SUCCESS: return getLessorAddressByIdSuccess(state, action)
        case Types.DELETE_LESSOR_ADDRESS_SUCCESS: return deleteLessorAddressSuccess(state, action)
        case Types.GET_LESSOR_SUCCESS: return getLessorSuccess(state, action)
        case Types.ADD_PREMISE_ADDRESS_SUCCESS: return addPremiseAddressSuccess(state, action)
        case Types.EDIT_PREMISE_ADDRESS_SUCCESS: return editPremiseAddressSuccess(state, action)
        case Types.GET_PREMISE_ADDRESS_SUCCESS: return getPremiseAddressSuccess(state, action)
        case Types.DELETE_PREMISE_ADDRESS_SUCCESS: return deletePremiseAddressSuccess(state, action)
        case Types.PROFILE_SETUP_SUCCESS: return profileSetupSuccess(state, action)
        case Types.FAQ_SUCCESS: return faqSuccess(state, action)
        case Types.ABOUT_SUCCESS: return aboutSuccess(state, action)
        case Types.TERMSOFUSE_SUCCESS: return termsOfUseSuccess(state, action)
        case Types.PRIVACYPOLICY_SUCCESS: return privacyPolicySuccess(state, action)
        
        default:
            return state;
    }
}
export default reducer;