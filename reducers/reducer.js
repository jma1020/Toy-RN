const initState = {
    data: [],
    loading: true,
    userData: [],
    login: false,
   
}

export const reducer = (state = initState, action) => {

    if (action.type == "ADD_DATA") {
        return {
            ...state,
            data: action.payload
        }
    }
    if (action.type == "SET_LOADING") {
        return {
            ...state,
            loading: action.payload
        }

    }
    if (action.type == "USER_DATA") {
        return {
            ...state,
            userData: action.payload
        }
    }
    if (action.type == "LOGIN_DATA") {
        return {
            ...state,
            login: action.payload
        }
    }
  
    //찜을 눌렀을때 액션이 하면서 스택에 쌓이게 하는거 

    return state
}