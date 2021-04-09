import {
    FETCH_LAST_MULTI_DECISION, LOGOUT
} from "../actions/types";
import {fromJS, List, Map} from 'immutable'

const initialState = Map().set('data',List()).set('loading',true)

export default function (state = initialState, action){

    switch (action.type){
        case FETCH_LAST_MULTI_DECISION:{
            console.log('action',action);
            const maps = action.payload
            console.log(List(maps).reverse().toJS());
            return Map().set('data',List(maps).reverse().slice(0,5)).set('loading',false)

        }


        case LOGOUT:{
            return initialState
        }

        default:{
            return state;
        }
    }
}

