import {ActionType} from "./types";

export const Order = (data) => {
    console.log(data)
   return (dispatch) => {
       dispatch({type: ActionType.ORDER_TRUE, payload: data})
   }
}