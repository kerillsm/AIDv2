import {FETCH_USERNAME,LOGOUT} from "../actions/types";


export default function (state = null, action){

    switch (action.type){
        case FETCH_USERNAME:{
            return action.payload.user
        }
        case LOGOUT:{
            return null
        }
        default:{
            return state;
        }
    }
}

