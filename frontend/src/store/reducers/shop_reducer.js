import { createSlice } from '@reduxjs/toolkit'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shop: {},
        loading: false,
        error: false,
    },
    reducers: {
        getShopRequest: (state, action) => {
            state.error = false
            state.loading = true
        },
        getShopSuccess: (state, action) => {
            state.loading = false
            state.shop = action.payload.shopInfo
        },
        getShopFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
    },
})

export const {
    getShopRequest, getShopSuccess, getShopFail,
} = shopSlice.actions

export default shopSlice.reducer