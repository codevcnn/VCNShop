import { createSlice, current } from '@reduxjs/toolkit'

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: {},
        shopInfo: {},
        loading: true,
        error: false,
        newReviewProcessing: false,
    },
    reducers: {
        getProductDetailRequest: (state, action) => {
            state.loading = true
            state.error = false
            state.newReviewProcessing = false
        },
        getProductDetailSuccess: (state, action) => {
            state.loading = false
            state.product = action.payload.product
            state.shopInfo = action.payload.shopInfo
        },
        getProductDetailFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
        newReviewRequest: (state, action) => {
            state.newReviewProcessing = true
            state.error = false
        },
        newReviewSuccess: (state, action) => {
            state.newReviewProcessing = false

            let { newReview, newRating, newRatingCount } = action.payload
            let user_username = newReview.username
            let current_reviews = current(state).product.review.reviews

            let reviews_filter = current_reviews.filter(({ username }) =>
                username !== user_username
            )

            state.product = {
                ...state.product,
                review: {
                    count: newRatingCount,
                    rating: newRating,
                    reviews: [
                        newReview,
                        ...reviews_filter,
                    ],
                }
            }
        },
        newReviewFail: (state, action) => {
            state.newReviewProcessing = false
            state.error = action.payload.error
        },
    },
})

export const {
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail,
    newReviewRequest, newReviewSuccess, newReviewFail,
} = productDetailSlice.actions

export default productDetailSlice.reducer