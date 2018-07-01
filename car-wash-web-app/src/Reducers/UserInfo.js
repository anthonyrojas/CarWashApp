import {
    FETCH_USER_INFO_ATTEMPT,
    FETCH_USER_INFO_FAILURE,
    FETCH_USER_INFO_SUCCESS,
    EDIT_ACCOUNT_INFO_TOGGLE,
    UPDATE_ACCOUNT_INFO_ATTEMPT,
    UPDATE_ACCOUNT_INFO_FAILURE,
    UPDATE_ACCOUNT_INFO_SUCCESS,
    ACCOUNT_EMAIL_CHANGED,
    ACCOUNT_FIRST_NAME_CHANGED,
    ACCOUNT_LAST_NAME_CHANGED,
    ACCOUNT_PHONE_CHANGED,
    RESET_STATUS_MESSAGE
} from '../Actions/types';
import {EMPTY_STR, host} from '../constants';

let initialState = {
    userDataUsername: EMPTY_STR,
    userDataEmail: EMPTY_STR,
    userDataFirstName: EMPTY_STR,
    userDataLastName: EMPTY_STR,
    userDataPhone: EMPTY_STR,
    editableEmail: EMPTY_STR,
    editablePhone: EMPTY_STR,
    editableFirstName: EMPTY_STR,
    editableLastName: EMPTY_STR,
    userDataEditable: false,
    editableEmailErr: EMPTY_STR,
    editablePhoneErr: EMPTY_STR,
    editableLastNameErr: EMPTY_STR,
    editableFirstNameErr: EMPTY_STR,
    fetchMyUserErrMsg: EMPTY_STR,
    statusMessage: EMPTY_STR,
    attemptingAccountInfoUpdate: false
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
                editableEmail: action.payload.email,
                editablePhone: action.payload.phone,
                editableFirstName: action.payload.firstName,
                editableLastName: action.payload.lastName,
                fetchingUserData: false
            }
        case EDIT_ACCOUNT_INFO_TOGGLE: 
            return{
                ...state,
                userDataEditable: action.payload
            }
        case ACCOUNT_EMAIL_CHANGED:
            return{
                ...state,
                editableEmail: action.payload,
                editableEmailErr: EMPTY_STR
            }
        case ACCOUNT_PHONE_CHANGED:
            return{
                ...state,
                editablePhone: action.payload,
                editablePhoneErr: EMPTY_STR
            }
        case ACCOUNT_FIRST_NAME_CHANGED: 
            return{
                ...state,
                editableFirstName: action.payload
            }
        case ACCOUNT_LAST_NAME_CHANGED:
            return{
                ...state,
                editableLastName: action.payload
            }
        case UPDATE_ACCOUNT_INFO_ATTEMPT:
            return{
                ...state,
                attemptingAccountInfoUpdate: true
            }
        case UPDATE_ACCOUNT_INFO_SUCCESS:
            return{
                ...state,
                userDataEmail: action.payload.user.email,
                userDataPhone: action.payload.user.phone,
                userDataFirstName: action.payload.user.firstName,
                userDataLastName: action.payload.user.lastName,
                editableEmail: action.payload.user.email,
                editablePhone: action.payload.user.phone,
                editableFirstName: action.payload.user.firstName,
                editableLastName: action.payload.user.lastName,
                attemptingAccountInfoUpdate: false,
                statusMessage: action.payload.statusMessage,
                userDataEditable: false
            }
        case UPDATE_ACCOUNT_INFO_FAILURE:
            return{
                ...state,
                attemptingAccountInfoUpdate: false,
                statusMessage: action.payload.statusMessage,
                editableEmailErr: action.payload.errMsgs.email,
                editablePhoneErr: action.payload.errMsgs.phone,
                editableFirstNameErr: action.payload.errMsgs.firstName,
                editableLastNameErr: action.payload.errMsgs.lastName
            }
        case RESET_STATUS_MESSAGE:
            return{
                ...state,
                statusMessage: action.payload
            }
        default: return state
    }
}