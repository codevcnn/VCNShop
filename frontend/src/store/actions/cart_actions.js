import axios from 'axios'
import {
    addProductToCartRequest, addProductToCartSuccess, addProductToCartFail,
    removeItemFromCartRequest, removeItemFromCartFail,
} from '../../store/reducers/cart_reducer'

const addProductToCart = (product_id, options) => async (dispatch, getState) => {
    try {
        dispatch(addProductToCartRequest())
        
        let api_to_get_products_cart =
            '/api/addProductToCart?productId=' + product_id +
            (options ? '&options[color]=' + options.color +
                '&options[size]=' + options.size : '')

        let { data } = await axios.get(api_to_get_products_cart)

        dispatch(addProductToCartSuccess({ product: data.product }))

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to add product to cart. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(addProductToCartFail({ error: errorObject }))
    }
}

const removeItemFromCart = (product_id) => async (dispatch, getState) => {
    try {
        dispatch(removeItemFromCartRequest({ _id: product_id }))

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to remove item frm cart. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(removeItemFromCartFail({ error: errorObject }))
    }
}

export {
    addProductToCart, removeItemFromCart
}