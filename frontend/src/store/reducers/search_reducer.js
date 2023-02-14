import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        suggestions: {},
        history: [],
        loading: false,
        error: false,
    },
    reducers: {
        getSuggestionsRequest: (state, action) => {
            state.loading = true
            state.error = false
        },
        getSuggestionsSuccess: (state, action) => {
            state.loading = false
            state.suggestions = action.payload.suggestions
        },
        getSuggestionsFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
    },
})

export const {
    getSuggestionsRequest, getSuggestionsSuccess, getSuggestionsFail,
} = searchSlice.actions

export default searchSlice.reducer