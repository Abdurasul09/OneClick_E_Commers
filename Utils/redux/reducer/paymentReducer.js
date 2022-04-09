import Cookies from "js-cookie";
import {ActionType} from "../actions/types";

const initialState = {
    shippingAddress: [],
    paymentMethod:  Cookies.get('paymentMethod')
        ? Cookies.get('paymentMethod')
        : '',
}

export const PaymentMethodReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.SAVE_SHIPPING_ADDRESS: {
            return {...state, shippingAddress: [...state.shippingAddress, action.payload]}
        }

        case ActionType.SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: [...state.paymentMethod, action.payload]}

        default:
            return state
    }
}