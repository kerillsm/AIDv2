import {DELETE_MAP} from "../actions/types";


export default function (state = {err:null,success:null,delete:null}, action){

    switch (action.type){
        case DELETE_MAP:{
            return action.payload
        }

        default:{
            return state;
        }
    }
}

