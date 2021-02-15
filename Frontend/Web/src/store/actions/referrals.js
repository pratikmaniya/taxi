import * as Types from './actionTypes';
import * as common from '../../utils/functions';

/**get list of service category based on salon type(1-hair,2-nail) */
export const getReferrals = (reqData) => {
    return async (dispatch) => {
        let response = await common.apiCall('GET', 'admin/referrals', Types.GET_REFERRAL_SUCCESS, {}, reqData)
        dispatch({
            type: Types.GET_REFERRAL_SUCCESS,
            res: response
        });
    }
}


