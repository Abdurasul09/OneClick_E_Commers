import {ActionType} from "./types";

export const addToCartHandler = (product) => {
    return async dispatch => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const foundProduct = cart.products?.find(el => el.id === product.id)
        if(foundProduct){
            cart = cart.products.map(el => el.id === product.id ?
                    {...el, quantity: el.quantity + 1} : el)
        }else {
            cart = [...cart, {...product, quantity:1}]
        }
        window.localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({type: ActionType.ADD_TO_CARD, payload: product})
    }
}


export const DecFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const findProduct = cart?.find(el => el.id === id)
    if (findProduct.quantity > 1)
        cart = cart.products.map(el => el.id === id ?
            {...el, quantity: el.quantity - 1} : el)
    window.localStorage.setItem('cart', JSON.stringify(cart));
    return {type: ActionType.DEC_TO_QUANTITY, payload: id}
}

export const DeleteFromCart = (el) => {
    localStorage.removeItem('cart')
    return {type: ActionType.DELETE_FROM_CARD, payload: el.id}
}

export const getCart = (cart) => {
    return async (dispatch) => {
        dispatch({type: ActionType.GET_CART, payload: cart});
    }
};


export const addToCartProductPrice = (el) => {
    return {type: ActionType.ADD_TO_CART_PRODUCT_PRICE, payload: el}
}