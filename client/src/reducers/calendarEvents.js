import {FETCH_CALENDAR_EVENT} from "../actions/types";
import {List} from 'immutable';


export default function (state = List(), action){

    switch (action.type){
        case FETCH_CALENDAR_EVENT:{
            const newState = List()
            const slider = action.maps[0].filter(item => typeof(item) !== "string" );
            const trees = action.maps[1].filter(item => typeof(item) !== "string" );

            return newState.push(...slider).push(...trees).push(...action.goals).push(...action.multiDecision)
        }

        default:{
            return state;
        }
    }
}

