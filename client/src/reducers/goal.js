import {POST_GOAL,FETCH_GOAL} from "../actions/types";



export default function (state = {}, action){

    switch (action.type){

        case FETCH_GOAL:{
            return action.goal
        }
        default:{
            return state;
        }
    }
}

