import * as Types from '../actions/actionTypes';

const initialState = {
    dashboardUsers: {},
    dashboardAppointments: {},
    upcomingAppointments: {},
    cancelUpcomingAppointments: {},
    addAppointment: {}
}


const getDashboardUsersSuccess = (state, action) => {
    return {
        ...state,
        dashboardUsers: action.res,
    }
}

const getReviewSuccess = (state, action) => {
    return {
        ...state,
        reviewRes: action.res,
    }
}
const getDashboardAppointmentsSuccess = (state, action) => {
    return {
        ...state,
        dashboardAppointments: action.res,
    }
}
const getUpcomingSuccess = (state, action) => {
    return {
        ...state,
        upcomingAppointments: action.res,
    }
}
const cancelUpcomingAppointmentsRes = (state, action) => {
    return {
        ...state,
        cancelUpcomingAppointmentsRes: action.res
    }
}
const addAppointmentRes = (state, action) => {
    return {
        ...state,
        addAppointmentRes: action.res
    }
}

const getNotification = (state, action) => {
    return {
        ...state,
        getNotificationsSuccessRes: action.res
    }
}
const readNotification = (state, action) => {
    return {
        ...state,
        readNotificationsSuccessRes: action.res
    }
}
const appointmentMissSuccess = (state, action) => {
    return {
        ...state,
        missedAppointmentRes: action.res
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_DASHBOARD_USERS_SUCCESS: return getDashboardUsersSuccess(state, action)
        case Types.GET_DASHBOARD_APPOINTMENTS_SUCCESS: return getDashboardAppointmentsSuccess(state, action)
        case Types.GET_UPCOMING_APPOINTMENT_SUCCESS: return getUpcomingSuccess(state, action)
        case Types.ORDER_CANCEL_STATUS_SUCCESS: return cancelUpcomingAppointmentsRes(state, action)
        case Types.GET_REVIEW_SUCCESS: return getReviewSuccess(state, action)
        case Types.ADD_APPOINTMENT: return addAppointmentRes(state, action)
        case Types.GET_NOTIFICATION_SUCCESS: return getNotification(state, action)
        case Types.ORDER_MISS_STATUS_SUCCESS: return appointmentMissSuccess(state, action)
        case Types.READ_NOTIFICATION_SUCCESS: return readNotification(state, action)

        default:
            return state;
    }
}
export default reducer;