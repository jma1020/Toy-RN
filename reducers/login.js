const USER_DATA = 'USER_DATA'
const LOGIN_DATA = 'LOGIN_DATA'

export const userData = () => ({type: USER_DATA})
export const loginData = () => ({type: LOGIN_DATA})


const initialState = {
    userData: [],
    login: false,
   
}

export default function login(state = initialState, action) {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        case LOGIN_DATA:
            return{
                ...state,
                login: action.payload
            }

        default:
            return state
    }
}