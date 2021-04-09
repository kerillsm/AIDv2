import {REGISTER} from "../actions/types";


export default function (state = {info:null,err:null}, action){

    switch (action.type){
        case REGISTER:{
            return action.payload

        }
        default:{
            return state;
        }
    }
}

