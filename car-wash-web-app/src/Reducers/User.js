import {
    USER_FORM_CONFIRM_PASSWORD_CHANGED,
    USER_FORM_EMAIL_CHANGED,
    USER_FORM_FIRST_NAME_CHANGED,
    USER_FORM_LAST_NAME_CHANGED,
    USER_FORM_PASSWORD_CHANGED,
    USER_FORM_PHONE_CHANGED,
    USER_FORM_USERNAME_CHANGED,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_ATTEMPT,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    TOGGLE_PASSWORD_VISIBILITY
} from '../Actions/types';
import {EMPTY_STR} from '../constants';
const initialState = {
    email: EMPTY_STR,
    username: EMPTY_STR,
    phone: EMPTY_STR,
    firstName: EMPTY_STR,
    lastName: EMPTY_STR,
    password: EMPTY_STR,
    confirmPassword: EMPTY_STR,
    errorExists: false,
    statusMessage: EMPTY_STR,
    usernameErr: EMPTY_STR,
    phoneErr: EMPTY_STR,
    firstNameErr: EMPTY_STR,
    lastNameErr: EMPTY_STR,
    passwordErr: EMPTY_STR,
    confirmPasswordErr: EMPTY_STR,
    showPassword: false,
    attemptingRegistration: false,
    attemptingLogin: false
};
export default (state=initialState, action)=>{
    switch(action.type){
        case TOGGLE_PASSWORD_VISIBILITY:
            return{
                ...state,
                showPassword: action.payload
            }
        case USER_FORM_CONFIRM_PASSWORD_CHANGED:
            return{
                ...state,
                confirmPassword: action.payload,
                confirmPasswordErr: EMPTY_STR
            }
        case USER_FORM_EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload,
                emailErr: EMPTY_STR
            }
        case USER_FORM_PHONE_CHANGED:
            return{
                ...state,
                phone: action.payload,
                phoneErr: EMPTY_STR
            }
        case USER_FORM_FIRST_NAME_CHANGED:
            return{
                ...state,
                firstName: action.payload,
                firstNameErr: EMPTY_STR
            }
        case USER_FORM_LAST_NAME_CHANGED:
            return{
                ...state,
                lastName: action.payload,
                lastNameErr: EMPTY_STR
            }
        case USER_FORM_USERNAME_CHANGED:
            return{
                ...state,
                username: action.payload,
                usernameErr: EMPTY_STR
            }
        case USER_FORM_PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload,
                passwordErr: EMPTY_STR
            }
        case USER_REGISTER_ATTEMPT:
            return{
                ...state,
                attemptingRegistration: action.payload
            }
        case USER_REGISTER_FAILURE:
            return{
                ...state,
                usernameErr: action.payload.errorMsgs.username,
                passwordErr: action.payload.errorMsgs.password,
                emailErr: action.payload.errorMsgs.email,
                firstNameErr: action.payload.errorMsgs.firstName,
                lastNameErr: action.payload.errorMsgs.lastName,
                confirmPasswordErr: action.payload.errorMsgs.confirmPassword,
                attemptingRegistration: false,
                statusMessage: action.payload.statusMessage,
                errorExists: action.payload.errorExists
            }
        case USER_REGISTER_SUCCESS:
            return{
                ...state,
                username: EMPTY_STR,
                email: EMPTY_STR,
                firstName: EMPTY_STR,
                lastName: EMPTY_STR,
                password: EMPTY_STR,
                confirmPassword: EMPTY_STR,
                errorExists: action.payload.errorExists,
                statusMessage: action.payload.statusMessage,
                attemptingRegistration: false
            }
        case USER_LOGIN_ATTEMPT:
            return{
                ...state,
                attemptingLogin: action.payload
            }
        case USER_LOGIN_FAILURE:
            return{
                ...state,
                usernameErr: action.payload.errorMsgs.username,
                passwordErr: action.payload.errorMsgs.password,
                attemptingLogin: false,
                errorExists: action.payload.errorExists,
                statusMessage: action.payload.statusMessage
            }
        case USER_LOGIN_SUCCESS:
            return{
                ...state,
                username: EMPTY_STR,
                password: EMPTY_STR,
                statusMessage: action.payload.statusMessage,
                errorExists: action.payload.errorExists,
                attemptingLogin: false
            }
        default: 
            return state
    }
}