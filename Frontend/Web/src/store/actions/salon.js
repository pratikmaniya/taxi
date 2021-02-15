import * as Types from './actionTypes';
import * as common from '../../utils/functions';

/** get salon details */
export const getSalons = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'admin/salons', Types.GET_SALONS_SUCCESS, {}, reqData)
        console.log('Response::::  ---------', response)
        dispatch({
            type: Types.GET_SALONS_SUCCESS,
            res: response
        });
    }
}

export const blockUnblockSalon = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'admin/block_user', Types.BLOCK_UNBLOCK_SALONS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.BLOCK_UNBLOCK_SALONS_SUCCESS,
            res: response
        });
    }
}

export const deleteSalons = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'admin/users', Types.DELETE_SALONS_SUCCESS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_SALONS_SUCCESS,
            res: response
        });
    }
}

export const verifySalons = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/verify_salon', Types.VERIFY_SALONS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.VERIFY_SALONS_SUCCESS,
            res: response
        });
    }
}

export const getReviews = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'admin/salon_review/' + reqData.salonId, Types.GET_SALON_REVIEWS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_SALON_REVIEWS_SUCCESS,
            res: response
        });
    }
}

export const deleteReviews = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'admin/review/' + reqData.reviewId, Types.DELETE_SALON_REVIEWS_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_SALON_REVIEWS_SUCCESS,
            res: response
        });
    }
}
export const getEarnings = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'earnings', Types.GET_EARNINGS_SUCCESS, {}, reqData)
        console.log('Response::::earning', response)
        dispatch({
            type: Types.GET_EARNINGS_SUCCESS,
            res: response
        });
    }
}
export const getPortfolio = (salon_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'salon_portfolio/' + salon_id, Types.GET_PORTFOLIO_SUCCESS, {}, {})
        console.log('Response::::', response)
        dispatch({
            type: Types.GET_PORTFOLIO_SUCCESS,
            res: response
        });
    }
}

export const salonPortfolio = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'salon_portfolio', Types.SALON_PORTFOLIO_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.SALON_PORTFOLIO_SUCCESS,
            res: response
        });
    }
}
export const deleteImageVideo = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'salon_portfolio/' + reqData, Types.DELETE_SALON_PORTFOLIO_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_SALON_PORTFOLIO_SUCCESS,
            res: response
        });
    }
}
export const getBusinessHours = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'salon_daily_working_slots', Types.GET_BUSINESS_HOURS_SUCCESS, {}, {})
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_BUSINESS_HOURS_SUCCESS,
            res: response
        });
    }
}

export const getDailyBusinessHours = (reqData) => {
    console.log("reqData", reqData);

    return async (dispatch) => {
        let response = await common.apiCall('GET', `salon_exception_working_slots/${reqData}`, Types.GET_DAILY_BUSINESS_HOURS_SUCCESS, {}, {})
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_DAILY_BUSINESS_HOURS_SUCCESS,
            res: response
        });
    }
}

export const UpdateDailyBusinessHours = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'salon_exception_working_slot', Types.UPDATE_DAILY_BUSINESS_HOURS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.UPDATE_DAILY_BUSINESS_HOURS_SUCCESS,
            res: response
        });
    }
}

export const editBusinessHours = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'salon_daily_working_slot', Types.EDIT_BUSINESS_HOURS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.EDIT_BUSINESS_HOURS_SUCCESS,
            res: response
        });
    }
}
export const getServices = (reqData, salon_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET',
            'services/' + salon_id, Types.GET_SERVICES_SUCCESS, {}, reqData)
        // console.log('Response:::: servivcee', response)
        dispatch({
            type: Types.GET_SERVICES_SUCCESS,
            res: response
        });
    }
}

export const getFreeSlots = (reqData, date, salon_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET',
            'free_slots/' + date + '/' + salon_id, Types.GET_FREESLOTS_SUCCESS, {}, reqData)
        // console.log('Response:::: servivcee', response)
        dispatch({
            type: Types.GET_FREESLOTS_SUCCESS,
            res: response
        });
    }
}


export const deleteService = (service_id) => {
    console.log("service id ios", service_id);

    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'service/' + service_id, Types.DELETE_SERVICES_SUCCESS)
        // console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_SERVICES_SUCCESS,
            res: response
        });
    }
}

export const editService = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'service', Types.EDIT_SERVICES_SUCCESS, params)
        dispatch({
            type: Types.EDIT_SERVICES_SUCCESS,
            res: response
        });
    }
}
export const addService = (params, salon_id) => {
    console.log("Salon id is", params);

    return async (dispatch) => {
        let response = await common.apiCall('POST', 'service', Types.ADD_SERVICES_SUCCESS, params)
        // console.log('Response::::', response)
        dispatch({
            type: Types.ADD_SERVICES_SUCCESS,
            res: response
        });
    }
}
/** get country name and code api */
export const getCountries = (headers) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'countries', Types.GET_COUNTRIES_SUCCESS, '', '', headers)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_COUNTRIES_SUCCESS,
            res: response
        });
    }
}

/** get appointments  api */
export const getAppointments = (params) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/appointment', Types.GET_APPOINTMENT_SUCCESS, '', params)
        dispatch({
            type: Types.GET_APPOINTMENT_SUCCESS,
            res: response
        });
    }
}

/** edit salon profile api called */
// export const editProfile = (params) => {
//     return async (dispatch) => {
//         let response = await common.apiCall('PUT', 'admin/edit-salon', Types.EDIT_SALON_PROFILE, params)
//         dispatch({
//             type: Types.EDIT_SALON_PROFILE,
//             res: response
//         });
//     }
// }

export const getBarbers = (reqData, salon_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'barbers/' + salon_id, Types.GET_BARBERS_SUCCESS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_BARBERS_SUCCESS,
            res: response
        });
    }
}

export const addBarbers = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'barber', Types.ADD_BARBERS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.ADD_BARBERS_SUCCESS,
            res: response
        });
    }
}

export const deleteBarbers = (barber_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('DELETE', 'barber/' + barber_id, Types.DELETE_BARBERS_SUCCESS)
        // console.log('Response::::', response)
        dispatch({
            type: Types.DELETE_BARBERS_SUCCESS,
            res: response
        });
    }
}
export const manageBarbers = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'manage-barber', Types.MANAGE_BARBERS_SUCCESS, reqData)
        // console.log('Response OF MANAGE BARBER::::', response);
        if (response.code == 1) {
            dispatch({
                type: Types.MANAGE_BARBERS_SUCCESS,
                res: response
            });
        }
        else {
            dispatch({
                type: Types.MANAGE_BARBERS_FAILURE,
                res: response
            });
        }

    }
}

export const editBarber = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'barber', Types.EDIT_BARBER_SUCCESS, reqData)
        dispatch({
            type: Types.EDIT_BARBER_SUCCESS,
            res: response
        });
    }
}

export const getBarberBusinessHours = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'barber_daily_working_slots', Types.GET_BARBER_BUSINESS_HOURS_SUCCESS, {}, reqData)
        console.log('Response:barber :::', response)
        dispatch({
            type: Types.GET_BARBER_BUSINESS_HOURS_SUCCESS,
            res: response
        });
    }
}

export const editBarberBusinessHours = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'barber_daily_working_slot', Types.EDIT_BARBER_BUSINESS_HOURS_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.EDIT_BARBER_BUSINESS_HOURS_SUCCESS,
            res: response
        });
    }
}

export const getBarberBusinessExceptionHours = (date, reqData) => {


    return async (dispatch) => {
        let response = await common.apiCall('GET', 'barber_exception_working_slots/' + date, Types.GET_BARBER_BUSINESS_EXCEPTION_HOURS, {}, reqData)
        dispatch({
            type: Types.GET_BARBER_BUSINESS_EXCEPTION_HOURS,
            res: response
        });
    }
}

export const updateBarberBusinessExceptionHours = (reqData) => {


    return async (dispatch) => {
        let response = await common.apiCall('POST', 'barber_exception_working_slot', Types.UPDATE_BARBER_BUSINESS_EXCEPTION_HOURS, reqData)
        dispatch({
            type: Types.UPDATE_BARBER_BUSINESS_EXCEPTION_HOURS,
            res: response
        });
    }
}

export const contactUs = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'contact_us', Types.CONTACT_US_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.CONTACT_US_SUCCESS,
            res: response
        });
    }
}

export const editProfile = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'editProfile', Types.EDIT_PROFILE_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.EDIT_PROFILE_SUCCESS,
            res: response
        });
    }
}