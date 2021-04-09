import { FETCH_ISADMIN } from "../actions/types";

export default function (state = null, action){

    switch (action.type){
        case FETCH_ISADMIN: {
            return action.payload.user
        }
        default:{
            return state;
        }
    }
}