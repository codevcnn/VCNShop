import axios from 'axios'
import {
    getProductsRequest, getProductsSuccess, getProductsFail, //products search
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail, //top week
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail, //best selling
    getProductsFilteredRequest,
} from '../reducers/products_reducer.js'
import {
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail, //product detail
    newReviewRequest, newReviewSuccess, newReviewFail,
} from '../reducers/product_detail_reducer.js'
import { toast } from 'react-toastify'

const getProducts = (
    limit = 100, category, keyword, rating = 0, price = [0, 25000], isFilter,
) => async (dispatch) => {
    try {
        if (isFilter) dispatch(getProductsFilteredRequest())
        else dispatch(getProductsRequest())

        let api_to_getProducts =
            '/api/getProducts?' + (category ? 'category=' + category : '') +
            (keyword ? '&keyword=' + keyword : '') + '&limit=' + limit +
            '&rating=' + rating + '&price[gte]=' + price[0] + '&price[lte]=' + price[1]

        let { data } = await axios.get(api_to_getProducts)

        dispatch(getProductsSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get products, with status ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getProductsFail({ error: errorObject }))
    }
}

const getTopWeek = (limit = 9) => async (dispatch) => {
    try {
        dispatch(getTopWeekRequest())

        let api_to_getTopWeek =
            '/api/getTopWeek?limit=' + limit + '&topWeek=true'

        let { data } = await axios.get(api_to_getTopWeek)

        dispatch(getTopWeekSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get top week. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getTopWeekFail({ error: errorObject }))
    }
}

const getBestSelling = (sold = true, rating = false, limit = 20) => async (dispatch) => {
    try {
        dispatch(getBestSellingRequest())

        let api_to_getBestSelling =
            '/api/getBestSelling?limit=' + limit + (sold ? '&sold=' + sold : '') +
            (rating ? '&rating=' + rating : '')

        let { data } = await axios.get(api_to_getBestSelling)

        dispatch(getBestSellingSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get best selling. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getBestSellingFail({ error: errorObject }))
    }
}

const getProductDetail = (product_id) => async (dispatch) => {
    try {
        dispatch(getProductDetailRequest())

        let api_to_getProductDetail = '/api/getProductDetail/' + product_id

        let { data } = await axios.get(api_to_getProductDetail)

        dispatch(getProductDetailSuccess({
            product: data.product,
            shopInfo: data.shopInfo,
        }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get product detail. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getProductDetailFail({ error: errorObject }))
    }
}

const newReview = (
    { productId, rating, title, comment, imagesData }
) => async (dispatch) => {
    try {
        dispatch(newReviewRequest())

        let username = localStorage.getItem('usernameVCNShop') //get user from local

        let api_to_make_new_review =
            '/api/newReview/?productId=' + productId + '&username=' + username

        let imageURLs = []
        if (imagesData) {
            let api_to_upload_files =
                'api/uploadImages/?productId=' + productId + '&username=' + username +
                '&type=review'

            let { data } = await axios.post(api_to_upload_files, imagesData, 
                { headers: { 'Content-Type': 'multipart/form-data' } },
            )

            imageURLs = data.imageURLs
        }

        let { data } = await axios.put(api_to_make_new_review,
            { rating, comment, title, imageURLs },
            { headers: { 'Content-Type': 'application/json' } },
        )

        dispatch(newReviewSuccess({
            newReview: data.newReview,
            newRating: data.newRating,
            newRatingCount: data.newRatingCount,
        }))

        toast.success(data.newReviewMessage)
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to make new review. ',
            error,
        }

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
            toast.error(error.response.data.message)
        } else
            errorObject.message += error.message

        dispatch(newReviewFail({ error: errorObject }))
    }
}

export {
    getProducts, getBestSelling, getTopWeek,
    getProductDetail, newReview,
}