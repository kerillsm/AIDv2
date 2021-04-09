import {IS_AUTH_SHOWN} from "../actions/types";


export default function (state = false, action){

    switch (action.type){
        case IS_AUTH_SHOWN:{
            return action.payload

        }
        default:{
            return state;
        }
    }
}

