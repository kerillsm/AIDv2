import {FETCH_MAPS} from "../actions/types";
import {List,Map,fromJS} from 'immutable'

const initialState = List()
export default function (state = initialState, action){

    switch (action.type){
        case FETCH_MAPS:{
            let data =  fromJS(action.payload)
            console.log('data',data.toJS());
            return data.map(item=>{
                return Map().set('to',`/maps/${item.get('id')}`).set('name',item.get('title'))
            })

        }
        default:{
            return state;
        }
    }
}

