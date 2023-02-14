import axios from 'axios'
import {
    getShopRequest, getShopSuccess, getShopFail,
} from '../reducers/shop_reducer.js'

const getShop = (username_shop) => async (dispatch) => {
    try {
        dispatch(getShopRequest())

        let api_to_get_shop = '/api/getShopInfo?username=' + username_shop

        let { data } = await axios.get(api_to_get_shop)

        dispatch(getShopSuccess({ shopInfo: data.shopInfo }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get shop. ',
            error,
        } 

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getShopFail({ error: errorObject }))
    }
}

export {
    getShop,
}