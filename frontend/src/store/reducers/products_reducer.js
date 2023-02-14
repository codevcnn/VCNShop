import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productsSearch: {
            loading: false,
            filterLoading: false,
            isFiltered: false,
            error: false,
            products: [],
        },
        topWeek: {
            loading: false,
            error: false,
            products: [],
        },
        bestSelling: {
            loading: false,
            error: false,
            products: [],
        },
    },
    reducers: {
        getProductsFilteredRequest: (state, action) => {
            state.productsSearch.filterLoading = true
            state.productsSearch.error = false
        },
        getProductsRequest: (state, action) => {
            state.productsSearch.loading = true
            state.productsSearch.error = false
        },
        getProductsSuccess: (state, action) => {
            state.productsSearch.loading = false
            state.productsSearch.filterLoading = false
            state.productsSearch.products = action.payload.products
        },
        getProductsFail: (state, action) => {
            state.productsSearch.loading = false
            state.productsSearch.filterLoading = false
            state.productsSearch.error = action.payload.error
        },
        getTopWeekRequest: (state, action) => {
            state.topWeek.loading = true
            state.topWeek.error = false
        },
        getTopWeekSuccess: (state, action) => {
            state.topWeek.loading = false
            state.topWeek.products = action.payload.products
        },
        getTopWeekFail: (state, action) => {
            state.topWeek.loading = false
            state.topWeek.error = action.payload.error
        },
        getBestSellingRequest: (state, action) => {
            state.bestSelling.loading = true
            state.bestSelling.error = false
        },
        getBestSellingSuccess: (state, action) => {
            state.bestSelling.loading = false
            state.bestSelling.products = action.payload.products
        },
        getBestSellingFail: (state, action) => {
            state.bestSelling.loading = false
            state.bestSelling.error = action.payload.error
        },
    }
})

export const {
    getProductsRequest, getProductsSuccess, getProductsFail,
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
    getProductsFilteredRequest,
} = productsSlice.actions

export default productsSlice.reducer