import { createSlice } from '@reduxjs/toolkit'

export const couponsSlice = createSlice({
    name: 'coupons',
    initialState: {
        coupons: [],
        error: false,
        loading: true,
        confirming: false,
        canceling: false,
    },
    reducers: {
        getCouponsRequest: (state, action) => {
            state.error = false
            state.loading = true
        },
        getCouponsSuccess: (state, action) => {
            state.loading = false
            state.coupons = action.payload.coupons
        },
        getCouponsFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
        confirmCouponRequest: (state, action) => {
            state.error = false
            state.confirming = true
        },
        confirmCouponSuccess: (state, action) => {
            state.confirming = false
        },
        confirmCouponFail: (state, action) => {
            state.confirming = false
            state.error = action.payload.error
        },
        cancelPickCouponRequest: (state, action) => {
            state.error = false
            state.canceling = true
        },
        cancelPickCouponSuccess: (state, action) => {
            state.canceling = false
        },
        cancelPickCouponFail: (state, action) => {
            state.canceling = false
            state.error = action.payload.error
        },
    },
})

export const {
    getCouponsRequest, getCouponsSuccess, getCouponsFail,
    confirmCouponRequest, confirmCouponSuccess, confirmCouponFail,
    cancelPickCouponRequest, cancelPickCouponSuccess, cancelPickCouponFail,
} = couponsSlice.actions

export default couponsSlice.reducer