import {
    TOGGLE_NAV
} from '../Actions/types';

const initialState = {
    showSidenav: false
}

export default (state=initialState, action)=>{
    switch(action.type){
        case TOGGLE_NAV: 
            return{
                showSidenav: !state.showSidenav
            }
        default: 
            return state;
    }
}