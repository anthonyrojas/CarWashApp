import {
    FETCH_USER_INFO_ATTEMPT,
    FETCH_USER_INFO_FAILURE,
    FETCH_USER_INFO_SUCCESS
} from '../Actions/types';
import {EMPTY_STR, host} from '../constants';

let initialState = {
    userDataUsername: EMPTY_STR,
    userDataEmail: EMPTY_STR,
    userDataFirstName: EMPTY_STR,
    userDataLastName: EMPTY_STR,
    userDataPhone: EMPTY_STR,
    userDataUsernameEditable: false,
    userDataEmailEditable: false,
    userDataPhoneEditable: false,
    userDataFNameEditable: false,
    userDataLNameEditable: false,
    fetchMyUserErrMsg: EMPTY_STR,
    statusMessage: EMPTY_STR
}

export default (state=initialState, action)=>{
    switch(action.type){
        case FETCH_USER_INFO_ATTEMPT:
            return{
                ...state,
                fetchingUserData: true
            }
        case FETCH_USER_INFO_FAILURE:
            return{
                ...state,
                fetchingUserData: false,
                fetchMyUserErrMsg: action.payload
            }
        case FETCH_USER_INFO_SUCCESS:
            return{
                ...state,
                userDataEmail: action.payload.email,
                userDataUsername: action.payload.username,
                userDataFirstName: action.payload.firstName,
                userDataLastName: action.payload.lastName,
                userDataPhone: action.payload.phone,
                fetchingUserData: false
            }
        default: return state
    }
}