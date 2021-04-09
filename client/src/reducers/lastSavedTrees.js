import {
    FETCH_LAST_SAVED_TREES,LOGOUT
} from "../actions/types";
import {fromJS, List, Map} from 'immutable'

const initialState = Map().set('data',List()).set('loading',true)

export default function (state = initialState, action){

    switch (action.type){
        case FETCH_LAST_SAVED_TREES:{
            return Map().set('data',List(action.trees).reverse().slice(0,5)).set('loading',false)

        }


        case LOGOUT:{
            return initialState
        }

        default:{
            return state;
        }
    }
}

