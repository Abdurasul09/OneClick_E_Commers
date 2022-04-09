import {ActionType} from "./types";

export const addToCartHandler = (product) => {
    return {type: ActionType.ADD_TO_CARD, payload: product}
}

export const decFromCart = (id) => {
    return {type: ActionType.DEC_FROM_CART, payload: id}
}

export const removeFromCart = (el) => {
    return {type: ActionType.REMOVE_FROM_CARD, payload: el.id}
}

export const  AddToCart = (el) => {
    return {type: ActionType.ADD_TO_CARD, payload: el}
}