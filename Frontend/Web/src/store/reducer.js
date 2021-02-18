import * as Types from './actionTypes';

const initialState = {
  loading: false,
  redirect_to_login: false,
  loginRes: {},
  searchTaxiRes: {},
  getReviewRes: {},
  addReviewRes: {},
  registerTaxiRes: {},
}

const loginSuccess = (state, action) => {
  return {
    ...state,
    loginRes: action.res,
  }
}

const searchTaxiSuccess = (state, action) => {
  return {
    ...state,
    searchTaxiRes: action.res,
  }
}

const getReviewsSuccess = (state, action) => {
  return {
    ...state,
    getReviewRes: action.res,
  }
}

const addReviewSuccess = (state, action) => {
  return {
    ...state,
    addReviewRes: action.res,
  }
}

const registerTaxiSuccess = (state, action) => {
  return {
    ...state,
    registerTaxiRes: action.res,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REDRECT_TO_LOGIN_TRUE':
      return {
        ...state,
        redirect_to_login: true
      }
    case 'SET_REDRECT_TO_LOGIN_FALSE':
      return {
        ...state,
        redirect_to_login: false
      }
    case 'START_LOADER':
      return {
        ...state,
        loading: true,
      }
    case 'STOP_LOADER':
      return {
        ...state,
        loading: false,
      }
    case Types.LOGIN_SUCCESS: return loginSuccess(state, action)
    case Types.SEARCH_TAXI_SUCCESS: return searchTaxiSuccess(state, action)
    case Types.REGISTER_TAXI_SUCCESS: return registerTaxiSuccess(state, action)
    case Types.GET_REVIEWS_SUCCESS: return getReviewsSuccess(state, action)
    case Types.ADD_REVIEW_SUCCESS: return addReviewSuccess(state, action)
    default:
      return state
  }
}

export default reducer