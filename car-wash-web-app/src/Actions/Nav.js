import {
    TOGGLE_NAV
} from './types';

export const toggleSidenav = (data) =>{
    return {
        type: TOGGLE_NAV,
        payload: data
    }
}