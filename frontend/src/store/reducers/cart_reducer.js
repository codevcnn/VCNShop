import { createSlice, current } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
        loading: false,
        removeItemLoading: false,
        error: false,
    },
    reducers: {
        addProductToCartRequest: (state, action) => {
            state.loading = true
            state.error = false
        },
        addProductToCartSuccess: (state, action) => {
            let newProduct = action.payload.product
            let cartItemsPrev = current(state).cartItems

            let prosuctIsExisted = cartItemsPrev.find(({ image_link }) =>
                image_link === newProduct.image_link
            )

            if (prosuctIsExisted) { //update cartItems if new product is exist
                state.cartItems = cartItemsPrev.map((product) =>
                    newProduct.image_link === product.image_link ? newProduct : product
                )
            } else { //push new product if new product not exist
                state.cartItems = [...cartItemsPrev, newProduct]
            }

            state.loading = false
        },
        addProductToCartFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
        removeItemFromCartRequest: (state, action) => {
            state.error = false
            state.removeItemLoading = true

            let product_id = action.payload._id
            let cart_items = state.cartItems
            
            state.cartItems = cart_items.filter(({ _id }) => _id !== product_id)
        },
        removeItemFromCartFail: (state, action) => {
            state.removeItemLoading = false
            state.error = action.payload.error
        }
    },
})

export const {
    addProductToCartRequest, addProductToCartSuccess, addProductToCartFail,
    removeItemFromCartRequest, removeItemFromCartFail,
} = cartSlice.actions

export default cartSlice.reducer