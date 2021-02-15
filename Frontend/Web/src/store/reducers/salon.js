import * as Types from '../actions/actionTypes';
import { manageBarbers, deleteBarbers, updateBarberBusinessExceptionHours, editProfile } from '../actions/salon';

const initialState = {
    salons: {},
    blockUnblockSalon: {},
    reviews: {},
    businessHours: {},
    editBusinessHours: {},
    getserviceCategorySuccessRes: {},
    updateRes: {},
    barbers: {},
    editBarberRes: {},
    getServicesRes: {},
    addserviceSuccessRes: {},
    editserviceSuccessRes: {},
    deleteServiceRes: {},
    countries: {},
    totalOrders: {},
    barberBusinessHours: {},
    editBarberBusinessHours: {},
}


const getSalonsSuccess = (state, action) => {
    return {
        ...state,
        salons: action.res,
    }
}

const getCountriesSuccess = (state, action) => {
    return {
        ...state,
        countries: action.res,
    }
}

const getAppointmentSuccess = (state, action) => {
    return {
        ...state,
        totalOrders: action.res,
    }
}
const updateSalonSuccess = (state, action) => {
    return {
        ...state,
        updateRes: action.res,
    }
}

const blockUnblockSalonSuccess = (state, action) => {
    return {
        ...state,
        blockUnblockSalon: action.res,
    }
}

const getReviewsSuccess = (state, action) => {
    return {
        ...state,
        reviews: action.res,
    }
}
const getEarningSuccess = (state, action) => {
    return {
        ...state,
        total: action.res,
    }
}

const getPortfolioSuccess = (state, action) => {
    return {
        ...state,
        portfolio: action.res,
    }
}
const getBusinessHoursSuccess = (state, action) => {
    return {
        ...state,
        businessHours: action.res,
    }
}
const getDailyBusinessHours = (state, action) => {
    return {
        ...state,
        dailyBusinessHoursRes: action.res
    }
}

const updateDailyBusinessHours = (state, action) => {
    return {
        ...state,
        updateDailyBusinessHoursRes: action.res
    }
}

const editBusinessHoursRes = (state, action) => {
    return {
        ...state,
        editBusinessHoursRes: action.res,
    }
}
const getServicesSuccess = (state, action) => {
    return {
        ...state,
        getServicesRes: action.res,
    }
}
const addServicesSuccess = (state, action) => {
    return {
        ...state,
        addserviceSuccessRes: action.res,
    }
}
const editServicesSuccess = (state, action) => {
    return {
        ...state,
        editserviceSuccessRes: action.res,
    }
}
const deleteServiceRes = (state, action) => {
    console.log("inside reducer", action.res);

    return {
        ...state,
        deleteServiceRes: action.res,
    }
}

const getBarbersSuccess = (state, action) => {
    return {
        ...state,
        barbers: action.res,
    }
}

const editBarberSuccess = (state, action) => {
    return {
        ...state,
        editBarberRes: action.res,
    }
}

const getBarberExceptionHours = (state, action) => {
    return {
        ...state,
        barberExceptionRes: action.res
    }
}

const updateBarberExceptionHours = (state, action) => {
    return {
        ...state,
        updateBarberExceptionRes: action.res
    }
}


const getBarberBusinessHoursSuccess = (state, action) => {
    return {
        ...state,
        barberBusinessHours: action.res,
    }
}

const addBarbersSuccess = (state, action) => {
    return {
        ...state,
        addBarberRes: action.res,
    }
}

const deleteBarbersSuccess = (state, action) => {
    return {
        ...state,
        deleteBarbersRes: action.res
    }
}
const deletePortfolioSuccess = (state, action) => {
    return {
        ...state,
        deletePortfolioRes: action.res
    }
}
const editBarberBusinessHoursSuccess = (state, action) => {
    return {
        ...state,
        editBarberBusinessHours: action.res,
    }
}

const manageBarbersSuccess = (state, action) => {
    return {
        ...state,
        manageBarberRes: action.res,
    }
}

const manageBarbersFailure = (state, action) => {
    return {
        ...state,
        failRes: action.res
    }
}

const contactUsSuccess = (state, action) => {
    return {
        ...state,
        contactUsSuccessRes: action.res
    }
}
const editProfileSuccess = (state, action) => {
    return {
        ...state,
        editProfileRes: action.res
    }
}
const getFreeSlotsSuccess = (state, action) => {
    return {
        ...state,
        getFreeSlotsRes: action.res
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_SALONS_SUCCESS: return getSalonsSuccess(state, action)
        case Types.BLOCK_UNBLOCK_SALONS_SUCCESS: return blockUnblockSalonSuccess(state, action)
        case Types.GET_SALON_REVIEWS_SUCCESS: return getReviewsSuccess(state, action)
        case Types.GET_BUSINESS_HOURS_SUCCESS: return getBusinessHoursSuccess(state, action)
        case Types.EDIT_BUSINESS_HOURS_SUCCESS: return editBusinessHoursRes(state, action)
        case Types.GET_COUNTRIES_SUCCESS: return getCountriesSuccess(state, action)
        case Types.GET_APPOINTMENT_SUCCESS: return getAppointmentSuccess(state, action)
        case Types.EDIT_SALON_PROFILE: return updateSalonSuccess(state, action)
        case Types.GET_SERVICES_SUCCESS: return getServicesSuccess(state, action)
        case Types.ADD_SERVICES_SUCCESS: return addServicesSuccess(state, action)
        case Types.EDIT_SERVICES_SUCCESS: return editServicesSuccess(state, action)
        case Types.DELETE_SERVICES_SUCCESS: return deleteServiceRes(state, action)
        case Types.GET_BARBERS_SUCCESS: return getBarbersSuccess(state, action)
        case Types.ADD_BARBERS_SUCCESS: return addBarbersSuccess(state, action)
        case Types.GET_BARBER_BUSINESS_EXCEPTION_HOURS: return getBarberExceptionHours(state, action)
        case Types.UPDATE_BARBER_BUSINESS_EXCEPTION_HOURS: return updateBarberExceptionHours(state, action)
        case Types.DELETE_BARBERS_SUCCESS: return deleteBarbersSuccess(state, action)
        case Types.EDIT_BARBER_SUCCESS: return editBarberSuccess(state, action)
        case Types.GET_BARBER_BUSINESS_HOURS_SUCCESS: return getBarberBusinessHoursSuccess(state, action)
        case Types.EDIT_BARBER_BUSINESS_HOURS_SUCCESS: return editBarberBusinessHoursSuccess(state, action)
        case Types.MANAGE_BARBERS_SUCCESS: return manageBarbersSuccess(state, action)
        case Types.MANAGE_BARBERS_FAILURE: return manageBarbersFailure(state, action)
        case Types.GET_EARNINGS_SUCCESS: return getEarningSuccess(state, action)
        case Types.GET_PORTFOLIO_SUCCESS: return getPortfolioSuccess(state, action)
        case Types.CONTACT_US_SUCCESS: return contactUsSuccess(state, action)
        case Types.GET_DAILY_BUSINESS_HOURS_SUCCESS: return getDailyBusinessHours(state, action)
        case Types.UPDATE_DAILY_BUSINESS_HOURS_SUCCESS: return updateDailyBusinessHours(state, action)
        case Types.EDIT_PROFILE_SUCCESS: return editProfileSuccess(state, action)
        case Types.GET_FREESLOTS_SUCCESS: return getFreeSlotsSuccess(state, action)
        case Types.DELETE_SALON_PORTFOLIO_SUCCESS: return deletePortfolioSuccess(state, action)


        default:
            return state;
    }
}
export default reducer;