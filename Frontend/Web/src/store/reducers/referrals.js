import * as Types from '../actions/actionTypes';

const initialState = {
    getRefferalsSuccessRes: {},
}

const getRefferalsSuccess = (state, action) => {
    return {
        ...state,
        getRefferalsSuccessRes: action.res,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_REFERRAL_SUCCESS: return getRefferalsSuccess(state, action)

        default:
            return state;
    }
}
export default reducer;