import {LOGIN, LOGOUT} from "../actions/types";


export default function (state = {info:null,err:null,status:false}, action){

    switch (action.type){
        case LOGIN:{
            console.log('LOGGGGGGGGGGGG',action.test)
            return {...action.payload,user:action.user}

        }
        case LOGOUT:{
            return {...action.payload,info:null,err:null,status:false}
        }
        default:{
            return state;
        }
    }
}

