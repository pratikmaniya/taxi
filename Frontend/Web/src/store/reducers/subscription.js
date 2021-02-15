import * as Types from '../actions/actionTypes';

const initialState = {
    subscribeUserData: {},
}


const subscribeUserSuccess = (state, action) => {
    return {
        ...state,
        subscribeUserData: action.res,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SUBSCRIBE_USER_SUCCESS: return subscribeUserSuccess(state, action)
        default:
            return state;
    }
}
export default reducer;