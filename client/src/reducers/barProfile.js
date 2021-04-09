import {FETCH_GOALS_BAR} from "../actions/types";
import {List,Map,fromJS} from 'immutable';


export default function (state = List(), action){

    switch (action.type){
        case FETCH_GOALS_BAR:{

            const data100 = List()
            const data = action.goals.map(item=>{
                const randomValue = Math.random().toFixed(1)*360;
                console.log(randomValue);
                if(item.end > Date.now()){
                    const passed = (((Date.now()-item.start)/(item.end-item.start))*100).toFixed(1);
                    return fromJS(item)
                        .set('Passed',passed)
                        .set('PassedColor',`hsl(${randomValue}, 100%, 50%)`)
                        .set('Left',(100-passed).toFixed(1))
                        .set('LeftColor',"hsl(0, 2%, 81%)")
                }
                else {
                    return fromJS(item)
                        .set('Passed',100)
                        .set('PassedColor',`hsl(${randomValue}, 100%, 50%)`)
                        .set('Left',0)
                        .set('LeftColor',"hsl(0, 2%, 81%)")

                }
            }).reverse()
            const now = data.filter(item => fromJS(item).get('Passed') !== 100).sort((a,b)=>{
                return fromJS(a).get('end')-fromJS(b).get('end')
            })
            const finished = data.filter(item => fromJS(item).get('Passed') === 100)
            const res = [...now,...finished].reverse()

            return List(res)
        }


        // .sort((a,b)=>{
        //     if (a.end > b.end) {
        //         return 1;
        //     }
        //     if (a.end < b.end) {
        //         return -1;
        //     }
        //     return 0;
        // })

        default:{
            return state;
        }
    }
}

