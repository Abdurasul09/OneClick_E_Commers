import {ActionType} from "../actions/types";

const initialState = {
    userInfo: []
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.USER_LOGIN: {
            return {...state, userInfo: action.payload}
        }
        case ActionType.USER_LOGOUT: {
            return {...state, userInfo: null, cart: {cart: []}}
        }
        default:
            return state
    }
}