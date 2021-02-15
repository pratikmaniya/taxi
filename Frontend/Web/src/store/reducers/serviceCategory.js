import * as Types from '../actions/actionTypes';

const initialState = {
    getserviceCategorySuccessRes: {},
    addserviceCategorySuccessRes: {}
}

const getserviceCategorySuccess = (state, action) => {
    return {
        ...state,
        getserviceCategorySuccessRes: action.res,
    }
}

const addserviceCategorySuccess = (state, action) => {
    return {
        ...state,
        addserviceCategorySuccessRes: action.res,
    }
}


const editserviceCategorySuccess = (state, action) => {
    return {
        ...state,
        editserviceCategorySuccessRes: action.res,
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_SERVICE_CATEGORY: return getserviceCategorySuccess(state, action)
        case Types.ADD_SERVICE_CATEGORY: return addserviceCategorySuccess(state, action)
        case Types.EDIT_SERVICE_CATEGORY: return editserviceCategorySuccess(state, action)


        default:
            return state;
    }
}
export default reducer;