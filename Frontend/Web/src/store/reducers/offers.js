import * as Types from '../actions/actionTypes';

const initialState = {
    getOffersSuccessRes: {},
    addserviceCategorySuccessRes: {}
}

const getOffersSuccess = (state, action) => {
    return {
        ...state,
        getOffersSuccessRes: action.res,
    }
}

const addOffersSuccess = (state, action) => {
    return {
        ...state,
        addOfferSuccessRes: action.res,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_OFFERS_SUCCESS: return getOffersSuccess(state, action)
        case Types.ADD_OFFERS_SUCCESS: return addOffersSuccess(state, action)

        default:
            return state;
    }
}
export default reducer;