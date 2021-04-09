import {
    ADD_COLUMN, ADD_ROW, DELETE_COLUMN, DELETE_ROW, FETCH_MULTI_DECISION, HANDLE_CHANGE_ITEM, HANDLE_CHANGE_TITLE,
    LOGOUT, SCORE_COLUMN,DEFAULT_MULTI_DECISION,
    TOGGLE_PROS_CONF
} from "../actions/types";
import {List,Map,fromJS} from 'immutable';

const obj = {
    columnId:1,
    columnScore:0,
    inputTitleValue:'',
    childRow:[
        {
            rowId:1,
            toggled:true,
            inputValue1:''
        },
        {
            rowId:2,
            toggled:false,
            inputValue2:''
        }
    ]
}

const test = Map(fromJS(obj))


const initialState = List().push(test)

export default function (state = List(), action){

    switch (action.type){
        case DEFAULT_MULTI_DECISION:{
            return initialState
        }

        case 'ADD_NEW': {
            const newState = List().merge(action.payload)
            
            return newState
        }

        case FETCH_MULTI_DECISION:{
            console.log(action.payload.procon[0].data)
            const test = action.payload.procon[0].data
            const newState = List().merge(test)
            return state.merge(newState)
        }

        case HANDLE_CHANGE_ITEM:{
            let input = `inputValue${action.rowId}`
            let column = action.columnId-1
            let item = action.rowId -1
            // let findRow = state.get(0).childRow[action.id-1]
            // findRow[input] = action.event.target.value;
            let test =  state.setIn([column,'childRow',item,input],action.event.target.value)
            return state.merge(test)
        }

        case HANDLE_CHANGE_TITLE:{
            let input = `inputTitleValue`
            let column = action.columnId-1

            let test =  state.setIn([column,input],action.event.target.value)
            console.log('HANDLE_CHANGE_TITLE',test.toJS())
            return state.merge(test)
        }


        case ADD_ROW:{

            let columnId = state.findIndex(item => item.get('columnId')===action.columnId)
            console.log('columnId',columnId)
            let lastIndex = state.find(item=>item.get('columnId')===action.columnId).get('childRow').size;

            console.log('LastIndex',lastIndex)
            let input = `inputValue${lastIndex+1}`
            let find = state.find(item=>item.get('columnId')===action.columnId)
            let findArr = find.get('childRow').push(Map().set('rowId',lastIndex+1).set('toggled',true).set(input,''))
            console.log('findArr',findArr.toJS())

            let test = state.setIn([columnId,'childRow'],findArr)
            return state.merge(test)

        }

        case ADD_COLUMN:{
            let newIndex = state.last().get('columnId')+1
            let newState = state.set(action.columnId,Map().set('columnId',newIndex).set('inputTitleValue','').set('columnScore',0).set('childRow',List())).filter(item => item !== undefined)
            return state.merge(newState)
        }

        case TOGGLE_PROS_CONF:{
            console.log(action.rowId,action.columnId)
            let column = action.columnId-1
            let item = action.rowId -1
            let newState = state.setIn([column,'childRow',item,'toggled'],!action.status);
            console.log(newState.toJS());
            return state.merge(newState)
        }

        case DELETE_ROW:{
            let column = action.columnId-1
            let item = action.rowId -1
            console.log('column',column,'row',item)
            let newState = state.deleteIn([column,'childRow',item])
            return newState
        }

        case DELETE_COLUMN:{
            console.log('Я хочу удалить колонку',action.columnId);
            let column = action.columnId-1;
            let newState = state.filter(item=>{
                return item.get('columnId') !== action.columnId
            })
            console.log('Новое состояние',newState.toJS())
            return newState
        }

        case LOGOUT:{
            return initialState
        }


        default:{
            return state;
        }

    }
}

