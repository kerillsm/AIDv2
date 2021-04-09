import {FETCH_ACHIEVMENTS, LOGOUT} from "../actions/types";
import {List,Map} from 'immutable';

const initialState = Map().set('data',Map()).set('loading',true)

export default function (state = initialState, action){

    switch (action.type){
        case FETCH_ACHIEVMENTS:{
            const newState = List()
            console.log(action.bookTrees);
            const maps = action.maps[0].filter(item => typeof(item) !== "string" );
            const result = Map().set('firstMaps',maps.length !== 0)
                .set('firstGoal',action.goals.length !== 0)
                .set('firstMultiDecision',action.multiDecision.length !== 0)
                .set('firstMovieTree',action.movieTrees.length !== 0)
                .set('firstBookTrees',action.bookTrees.length !== 0)
                .set('goalPioneer',action.goals.length >= 5)
                .set('goalExpert',action.goals.length >= 25)
                .set('goalPro',action.goals.length >= 50)
                .set('decisionPioneer',maps.length >= 10)
                .set('decisionExpert',maps.length >= 50)
                .set('decisionPro',maps.length >= 100)


            return Map().set('data',result).set('loading',false)
        }
        case LOGOUT:{
            return initialState
        }

        default:{
            return state;
        }

    }
}

