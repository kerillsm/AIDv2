import {
    REGISTER_USER_RESTRICTION, LOGOUT, UPDATE_USER_RESTRICTION, SAVE_MAP_USER_RESTRICTION,
    SAVE_GOAL_USER_RESTRICTION, SAVE_PROSCONS_USER_RESTRICTION, SAVE_MOVIESTREE_USER_RESTRICTION,
    SAVE_BOOKSTREE_USER_RESTRICTION
} from "../actions/types";
import {Map,fromJS} from 'immutable';

const initialState = Map()

export default function (state = initialState, action){
    // console.log('ACTION TYPE',action.type)
    switch (action.type){

        case REGISTER_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }
        case UPDATE_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }
        case SAVE_MAP_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }
        case SAVE_GOAL_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }
        case SAVE_PROSCONS_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }
        case SAVE_MOVIESTREE_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }
        case SAVE_BOOKSTREE_USER_RESTRICTION:{
            return Map().merge(fromJS(action.payload))
        }


        case LOGOUT:{
            return initialState
        }

        default:{
            return state;
        }
    }
}

