import {COMPLETED} from '../actions/types'


const initialState = {
    completedToggle:false
}

export default function(state=initialState, action){
    switch(action.type){
        case COMPLETED:
            return{
                ...state,
                completedToggle:!state.completedToggle
            }
            default:
                return state
    }
}