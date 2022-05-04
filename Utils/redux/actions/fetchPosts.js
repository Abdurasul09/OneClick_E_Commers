import React from 'react';
import {ActionType} from "./types";
import api from "../../../api/globalApi";

export const fetchPosts =  (filter) => {
    return async (dispatch) => {
        try {
            const res = await api(`/products?search=${filter}`)
          dispatch({type: ActionType.FETCH_POSTS, payload: res.data.results})
        } catch (e) {
            console.log(e)
        }
    }
}
