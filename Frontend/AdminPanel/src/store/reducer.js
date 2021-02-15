import * as actionTypes from './actionTypes'

const initialState = {
  loading: false,
  redirect_to_login: false,
  page_no: 1,
  limit: 10,
  search_keyword: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REDRECT_TO_LOGIN_TRUE:
      return {
        ...state,
        redirect_to_login: true
      }
    case actionTypes.SET_REDRECT_TO_LOGIN_FALSE:
      return {
        ...state,
        redirect_to_login: false
      }
    case actionTypes.START_LOADER:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.STOP_LOADER:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.SET_PAGE_NO:
      return {
        ...state,
        page_no: action.page_no
      }
    case actionTypes.SET_PAGE_LIMIT:
      return {
        ...state,
        limit: action.limit
      }
    case actionTypes.SET_SEARCH_KEYWORD:
      return {
        ...state,
        search_keyword: action.search_keyword
      }
    case actionTypes.RESET_LISTING_STATES:
      return {
        ...state,
        page_no: 1,
        limit: 10,
        search_keyword: ""
      }
    default:
      return state
  }
}

export default reducer