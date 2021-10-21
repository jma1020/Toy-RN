const ADD_DATA = 'ADD_DATA'
const SET_LOADING = 'SET_LOADING'

export const addData = () => ({type: ADD_DATA})
export const setLoading = () => ({type: SET_LOADING})

const initialState = {
    data: [],
    loading: true
}

export default function postList(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA:
            return {
                ...state,
                data: action.payload
            }
        case SET_LOADING:
            return{
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}