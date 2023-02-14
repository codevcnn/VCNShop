import axios from 'axios'
import {
    getSuggestionsRequest, getSuggestionsSuccess, getSuggestionsFail,
} from '../reducers/search_reducer.js'

const getSearchSuggestions = () => async (dispatch) => {
    try {
        dispatch(getSuggestionsRequest())

        let { data } = await axios.get('/api/getSearchSuggestions')

        dispatch(getSuggestionsSuccess({ suggestions: data.suggestions }))
    } catch (error) {
        let errorObject = {
            message: 'Error Warning: fail to get products. ',
            error,
        } 

        if (error.response) {
            errorObject.message += error.response.status + ', ' + error.response.data.message
        } else
            errorObject.message += error.message

        dispatch(getSuggestionsFail({ error: errorObject }))
    }
}

export {
    getSearchSuggestions,
}