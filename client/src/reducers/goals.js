import {
    FETCH_GOALS,LOGOUT
} from "../actions/types";
import {fromJS, List,Map} from 'immutable'

const initialState = Map().set('data',List()).set('loading',true)

export default function (state = initialState, action){

    switch (action.type){
        case FETCH_GOALS:{
            const active = action.goals.filter(item=>{
                return item.end > Date.now()
            }).sort((a,b)=>{
                return fromJS(a).get('end')-fromJS(b).get('end')
            })

            const finished = action.goals.filter(item=>{
                return item.end < Date.now()
            }).reverse()

            const res = [...active,...finished]


            return Map().set('data',List(res)).set('loading',false)
        }

        case LOGOUT:{
            return initialState
        }

        default:{
            return state
        }
    }
}

