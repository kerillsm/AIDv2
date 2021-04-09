import {
    FETCH_MAPS_PROFILE, FETCH_SLIDER_PROFILE, FETCH_TREES_PROFILE, SEARCH_MAPS, SORT_ASC,
    SORT_DESC, LOGOUT, FETCH_ALL, FETCH_MULTI_DECISIONS
} from "../actions/types";
import {fromJS, List} from 'immutable'

const initialState = List()

export default function (state = initialState, action){

    switch (action.type){
        case FETCH_MAPS_PROFILE:{
            console.log('action',action);
            const maps = List().merge(fromJS(action.payload[0].filter(item => typeof(item) !== "string" )))
            return List().merge(maps);

        }

        case FETCH_ALL:{
            console.log(action.maps);
            const maps = List().merge(fromJS(action.maps[0].filter(item => typeof(item) !== "string" )))
            console.log('maps',maps.toJS());
            const multi = List().merge(fromJS(action.multiDecision))

            const newState = maps.toSet().union(multi.toSet()).toList();

            return state.merge(newState)

        }

        case FETCH_MULTI_DECISIONS:{
            const multi = List().merge(fromJS(action.multiDecision))

            return List().merge(multi)
        }

        case FETCH_SLIDER_PROFILE:{
            const slider = action.payload[0].filter(item => typeof(item) !== "string" );
            const res = initialState.set(0,slider);
            return res;

        }

        case FETCH_TREES_PROFILE:{
            const trees = action.payload[1].filter(item => typeof(item) !== "string" );
            const res = List().set(0,trees);
            return res;

        }
        case SORT_ASC:{

            const data = fromJS(action.payload).sort(function(a,b){
                console.log('a',a.get('title'),'b',b.get('title'));
                if (a.get('title') > b.get('title')) {
                    return 1;
                }
                if (a.get('title')< b.get('title')) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            });



            return List().merge(data);

        }

        case SORT_DESC:{

            const data = fromJS(action.payload).sort(function(a,b){
                if (a.get('title') > b.get('title')) {
                    return 1;
                }
                if (a.get('title')< b.get('title')) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            }).reverse();

            console.log(data.toJS());

            return List().merge(data);

        }

        case SEARCH_MAPS:{
            console.log('Payload',action.payload);
            const test = action.payload.filter(item => typeof(item) !== "string" ).filter(item => {
                return item.title.toLowerCase().includes(action.searchReq.toLowerCase())
            })
            console.log(test)
            return List().merge(test);
        }

        case LOGOUT:{
            return initialState
        }




        default:{
            return state;
        }
    }
}

