import * as Types from './actionTypes';
import * as common from '../../utils/functions';

export const getDashboardUsers = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'profile', Types.GET_DASHBOARD_USERS_SUCCESS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_DASHBOARD_USERS_SUCCESS,
            res: response
        });
    }
}
export const getNotifications = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'get_notifications', Types.GET_NOTIFICATION_SUCCESS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_NOTIFICATION_SUCCESS,
            res: response
        });
    }
}

export const readNotification = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'read_notification', Types.READ_NOTIFICATION_SUCCESS, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.READ_NOTIFICATION_SUCCESS,
            res: response
        });
    }
}

export const getReview = (reqData, salon_id) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'salon_review/' + salon_id, Types.GET_REVIEW_SUCCESS, {}, reqData)
        // console.log('Response::::', response)
        dispatch({
            type: Types.GET_REVIEW_SUCCESS,
            res: response
        });
    }
}
export const getDashboardAppointments = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'admin/dashboard_appointments', Types.GET_DASHBOARD_APPOINTMENTS_SUCCESS, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.GET_DASHBOARD_APPOINTMENTS_SUCCESS,
            res: response
        });
    }
}

export const getUpcomingAppointment = (reqData, status) => {
    console.log("statussss", status)
    if (status == 1) {
        var sendStatus = 2
    }
    else if (status == 2) {
        var sendStatus = 4
    }
    else if (status == 3) {
        var sendStatus = 35
    }
    else if (status == 10) {
        sendStatus = 10
    }
    return async (dispatch) => {
        let response = await common.apiCall('GET',
            `orders/${sendStatus}`, Types.GET_UPCOMING_APPOINTMENT_SUCCESS, {}, reqData)
        console.log('Response::::SendStatus', sendStatus)
        dispatch({
            type: Types.GET_UPCOMING_APPOINTMENT_SUCCESS,
            res: response
        });
    }
}
export const cancelUpcomingAppointments = (reqData) => {

    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'order_status', Types.ORDER_CANCEL_STATUS_SUCCESS, reqData)
        dispatch({
            type: Types.ORDER_CANCEL_STATUS_SUCCESS,
            res: response
        });
    }
}

export const missedAppointment = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('PUT', 'missed_order', Types.ORDER_MISS_STATUS_SUCCESS, reqData)
        dispatch({
            type: Types.ORDER_MISS_STATUS_SUCCESS,
            res: response
        });
    }
}


export const addAppointment = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'orders', Types.ADD_APPOINTMENT, reqData)
        console.log('Response::::', response)
        dispatch({
            type: Types.ADD_APPOINTMENT,
            res: response
        });
    }
}
