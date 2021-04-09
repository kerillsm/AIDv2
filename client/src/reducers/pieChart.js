import {FETCH_PIE, LOGOUT} from "../actions/types";
import {List,Map} from 'immutable';

const initialState = Map().set('data',List()).set('loading',true)

export default function (state = initialState, action){

    switch (action.type){
        case FETCH_PIE:{
            const newState = List()
            const newMap = Map();
            const maps = action.maps[0].filter(item => typeof(item) !== "string" );
            const mapsObj = newMap.set('id','Decisions')
                .set('label','Decisions')
                .set('value',maps.length);
            const goalsObj = newMap
                .set('id','Goals')
                .set('label','Goals')
                .set('value',action.goals.length);
            const multiDecisionObj = newMap.set('id','ProsCons')
                .set('label','ProsCons')
                .set('value',action.multiDecision.length)
            const trees = newMap.set('id','Trees')
                .set('label','Trees')
                .set('value',action.trees.length)

            return Map().set('data',newState.push(mapsObj).push(goalsObj).push(multiDecisionObj).push(trees)).set('loading',false)
        }
        case LOGOUT:{
            return initialState
        }

        default:{
            return state;
        }

    }
}

