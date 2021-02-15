import * as Types from '../actions/actionTypes';

const initialState = {
    getNoticesSuccessRes: {}
}

const getNoticesSuccess = (state, action) => {
    return {
        ...state,
        getNoticesSuccessRes: action.res,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_NOTICE_LIST_SUCCESS: return getNoticesSuccess(state, action)

        default:
            return state;
    }
}
export default reducer;