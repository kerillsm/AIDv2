import {FETCH_MAPS_PROFILE, FETCH_SLIDER_PROFILE, FETCH_TREES_PROFILE, SORT_ASC} from "../actions/types";
import {List,fromJS} from 'immutable'

const initialState = List()

export default function (state = initialState, action){

    switch (action.type){


        case SORT_ASC:{
            const data = fromJS(action.payload)
            const res = data.sort()
            return res.toJS();

        }

        default:{
            return state;
        }
    }
}

