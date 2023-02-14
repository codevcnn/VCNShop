import axios from 'axios'
import {
    getCouponsRequest, getCouponsSuccess, getCouponsFail,
    confirmCouponRequest, confirmCouponSuccess, confirmCouponFail,
    cancelPickCouponRequest, cancelPickCouponSuccess, cancelPickCouponFail,
} from '../reducers/coupons_reducer'

const getCoupons = () => async (dispatch) => {
    try {
        dispatch(getCouponsRequest())

        let username = localStorage.getItem('usernameVCNShop') //get user from local

        let api_to_get_coupons = '/api/getCoupons/' + username

        let { data } = await axios.get(api_to_get_coupons)

        dispatch(getCouponsSuccess({ coupons: data.coupons }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get coupons. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getCouponsFail({ error: errorObject }))
    }
}

const confirmCoupons = (coupon_ids = []) => async (dispatch) => {
    try {
        dispatch(confirmCouponRequest())

        let username = localStorage.getItem('usernameVCNShop') //get user from local

        let api_to_confirm = '/api/confirmCoupons/' + username

        await axios.put(api_to_confirm, { coupon_ids })

        dispatch(confirmCouponSuccess())
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to confirm coupons. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(confirmCouponFail({ error: errorObject }))
    }
}

const cancelPickCoupon = (type) => async (dispatch) => {
    try {
        dispatch(cancelPickCouponRequest())

        let username = localStorage.getItem('usernameVCNShop') //get user from local

        let api_to_cancel_pick = '/api/cancelPickCoupon/' + username

        await axios.put(api_to_cancel_pick, { type })

        dispatch(cancelPickCouponSuccess())
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to cancel pick coupon. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(cancelPickCouponFail({ error: errorObject }))
    }
}

export {
    getCoupons, confirmCoupons, cancelPickCoupon,
}