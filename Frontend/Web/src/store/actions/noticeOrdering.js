import * as Types from './actionTypes';
import * as common from '../../utils/functions';

/**get list of Notices  based on salon id */
export const getNoticesReq = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('POST', 'getNoticeListByStateId', Types.GET_NOTICE_LIST_SUCCESS, reqData)
        dispatch({
            type: Types.GET_NOTICE_LIST_SUCCESS,
            res: response
        });
    }
}
