import {ActionType} from "../actions/types";

const defaultState = {
    cart: [],
}


export const CartReducer = (state = defaultState, action) => {
    switch (action.type){
        case ActionType.ADD_TO_CARD: {
            const findProduct = state.cart.find(el => el.id === action.payload.id)
            if (findProduct) {
                return {
                    ...state, cart: state.cart.map(el => el.id === action.payload.id ?
                        {...el, quantity: el.quantity + 1} : el)
                }
            }
            return {...state, cart: [...state.cart, {...action.payload, quantity: 1}]};
        }
        case ActionType.REMOVE_FROM_CARD: {
            return {...state, cart: state.cart.filter((el) => el.id !== action.payload)};
        }
        case ActionType.DEC_FROM_CART: {
            if (state.cart [action.payload].quantity > 0)
                return {
                    ...state, cart: state.cart.map((el, id) => id === action.payload ?
                        {...el, quantity: el.quantity - 1} : el)
                }
        }

        // eslint-disable-next-line no-fallthrough
        default:
            return state
    }
}