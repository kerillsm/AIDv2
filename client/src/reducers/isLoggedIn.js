import {CHECK_AUTH, LOGOUT} from "../actions/types";


export default function (state = {}, action){

    switch (action.type){
        case CHECK_AUTH:{
            return action.payload
        }

        case LOGOUT:{
            return action.payload
        }
        default:{
            return state;
        }
    }
}

