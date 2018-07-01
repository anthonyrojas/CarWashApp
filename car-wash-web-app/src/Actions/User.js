import {
    USER_FORM_EMAIL_CHANGED,
    USER_FORM_FIRST_NAME_CHANGED,
    USER_FORM_LAST_NAME_CHANGED,
    USER_FORM_CONFIRM_PASSWORD_CHANGED,
    USER_FORM_PASSWORD_CHANGED,
    USER_FORM_PHONE_CHANGED,
    USER_FORM_USERNAME_CHANGED,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_ATTEMPT,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    TOGGLE_PASSWORD_VISIBILITY,
    RESET_STATUS_MESSAGE,
    CHECK_USER_AUTH,
    SET_USER_AUTH_MESSAGE
} from '../Actions/types';
import axios from 'axios';
import Cookies from 'universal-cookie';

import {EMPTY_STR, host, EMAIL_REGEX, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PHONE_REGEX} from '../constants';
export const togglePasswordVisibility = (data)=>{
    return{
        type: TOGGLE_PASSWORD_VISIBILITY,
        payload: data
    }
}
export const userFormEmailChanged = (data)=>{
    return{
        type: USER_FORM_EMAIL_CHANGED,
        payload: data
    }
}
export const userFormFirstNameChanged = (data)=>{
    return{
        type: USER_FORM_FIRST_NAME_CHANGED,
        payload: data
    }
}
export const userFormLastNameChanged = (data)=>{
    return{
        type: USER_FORM_LAST_NAME_CHANGED,
        payload: data
    }
}
export const userFormUsernameChanged = (data)=>{
    return{
        type: USER_FORM_USERNAME_CHANGED,
        payload: data
    }
}
export const userFormPhoneChanged = (data)=>{
    return{
        type: USER_FORM_PHONE_CHANGED,
        payload: data
    }
}
export const userFormPasswordChanged = (data)=>{
    return{
        type: USER_FORM_PASSWORD_CHANGED,
        payload: data
    }
}
export const userFormConfirmPasswordChanged = (data)=>{
    return{
        type: USER_FORM_CONFIRM_PASSWORD_CHANGED,
        payload: data
    }
}
export const userRegisterFailure = (dispatch, data)=>{
    dispatch({
        type: USER_REGISTER_FAILURE,
        payload: data
    });
}
export const userRegisterSuccess = (dispatch, data)=>{
    dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
    });
}
export const userRegisterAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: USER_REGISTER_ATTEMPT,
            payload: true
        });
        let errorExists = false;
        let errorMsgs = {
            username: EMPTY_STR,
            email: EMPTY_STR,
            phone: EMPTY_STR,
            firstName: EMPTY_STR,
            lastName: EMPTY_STR,
            password: EMPTY_STR,
            confirmPassword: EMPTY_STR
        };
        if(!data.username || data.username.trim() === EMPTY_STR){
            errorExists = true;
            errorMsgs.username = 'You must enter a valid username.';
        }
        else if(data.username.length > 64 || data.username.length < 5){
            errorExists = true;
            errorMsgs.username = 'You must enter a valid username that is between 5 and 64 characters in length.';
        }
        else if(/\s/g.test(data.username)){
            errorExists = true;
            errorMsgs.username = 'You must enter a valid username. Your username cannot contain any white space.'
        }
        if(!data.email || data.email.trim() === EMPTY_STR){
            errorExists = true;
            errorMsgs.email = 'You must enter a valid email.';
        }
        else if(!EMAIL_REGEX.test(data.email)){
            errorExists = true;
            errorMsgs.email = 'You must enter a valid email.';
        }
        if(!data.firstName || data.firstName.trim() === EMPTY_STR){
            errorExists = true;
            errorMsgs.firstName = 'You must enter your first name.';
        }
        if(!data.lastName || data.lastName.trim() === EMPTY_STR){
            errorExists = true;
            errorMsgs.lastName = 'You must enter your last name.';
        }
        if(!data.phone || data.phone === EMPTY_STR){
            errorExists = true;
            errorMsgs.phone = 'You must enter a valid phone number.';
        }
        else if(!PHONE_REGEX.test(data.phone)){
            errorExists = true;
            errorMsgs.phone = 'You must enter a valid phone numner. It must contain only digits.'
        }
        if(!data.password || data.password === EMPTY_STR){
            errorExists = true;
            errorMsgs.password = 'You must enter a password.';
        }
        else if(data.password > PASSWORD_MAX_LENGTH || data.password < PASSWORD_MIN_LENGTH){
            errorExists = true;
            errorMsgs.password = `You must enter a valid password. Your password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long.`;
        }
        if(!data.confirmPassword || data.confirmPassword === EMPTY_STR){
            errorExists = true;
            errorMsgs.confirmPassword = 'You must confirm your passwords.';
        }
        else if(data.password !== data.confirmPassword){
            errorExists = true;
            errorMsgs.confirmPassword = 'Your passwords do not match.';
        }
        if(errorExists){
            let failData = {errorExists, errorMsgs, statusMessage: 'Unable to register. Check error messages.'};
            userRegisterFailure(dispatch, failData);
        }
        else{
            let axiosData = {
                username: data.username.trim(),
                email: data.email.trim(),
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                phone: data.phone.trim(),
                password: data.password
            }
            axios.post(`${host}/auth/register`, axiosData).then(res=>{
                let successData = {
                    user: res.data.user,
                    statusMessage: res.data.message,
                    errorExists: errorExists
                }
                userRegisterSuccess(dispatch, successData);
            }).catch(err=>{
                if(err.response){
                    let failData = {
                        errorMsgs: {
                            username: EMPTY_STR,
                            email: EMPTY_STR,
                            phone: EMPTY_STR,
                            firstName: EMPTY_STR,
                            lastName: EMPTY_STR,
                            password: EMPTY_STR,
                            confirmPassword: EMPTY_STR
                        },
                        errorExists: true,
                        statusMessage: `${err.response.data.message}`
                    }
                    userRegisterFailure(dispatch, failData);
                }else{
                    let failData = {
                        errorMsgs: {
                            username: EMPTY_STR,
                            email: EMPTY_STR,
                            phone: EMPTY_STR,
                            firstName: EMPTY_STR,
                            lastName: EMPTY_STR,
                            password: EMPTY_STR,
                            confirmPassword: EMPTY_STR
                        },
                        errorExists: true,
                        statusMessage: 'Unable to register at this time due to server being down.'
                    }
                    userRegisterFailure(dispatch, failData);
                }
            });
        }
    }
}
export const userLoginFailure = (dispatch, data)=>{
    dispatch({
        type: USER_LOGIN_FAILURE,
        payload: data
    });
}
export const userLoginSuccess = (dispatch, data)=>{
    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
    });
}
export const userLoginAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: USER_LOGIN_ATTEMPT,
            payload: data
        });
        let errorExists = false;
        let errorMsgs = {
            username: EMPTY_STR,
            password: EMPTY_STR
        };
        if(!data.username || data.username.trim() === EMPTY_STR){
            errorExists = true;
            errorMsgs.username = 'You must enter your username.';
        }
        if(!data.password || data.password.trim() === EMPTY_STR){
            errorExists = true;
            errorMsgs.password = 'You must enter your password.';
        }
        if(errorExists){
            let failData = {
                errorExists: errorExists,
                errorMsgs: errorMsgs,
                statusMessage: 'Unable to login. Check error messages.'
            }
            userLoginFailure(dispatch, failData);
        }else{
            let axiosData = {
                username: data.username.trim(),
                password: data.password
            };
            axios.post(`${host}/auth/login`, axiosData).then(res=>{
                const cookies = new Cookies();
                cookies.set('authentication', res.data.token, {path: '/'});
                let successData = {
                    statusMessage: res.data.message
                };
                userLoginSuccess(dispatch, successData);
            }).catch(err=>{
                if(err.response){
                    let failData = {
                        errorExists: true,
                        errorMsgs: {
                            username: EMPTY_STR,
                            password: EMPTY_STR
                        },
                        statusMessage: err.response.data.message
                    };
                    userLoginFailure(dispatch, failData);
                }else{
                    let failData={
                        errorExists: true,
                        errorMsgs: {
                            username: EMPTY_STR,
                            password: EMPTY_STR
                        },
                        statusMessage: 'Cannot receive response from server. Service may be unavailable.'
                    }
                    userLoginFailure(dispatch, failData);
                }
            });
        }
    }
}
export const resetStatusMessage = (data)=>{
    return{
        type: RESET_STATUS_MESSAGE,
        payload: data
    }
}
export const checkUserAuth = (data)=>{
    return{
        type: CHECK_USER_AUTH,
        payload: data
    }
}
export const setUserAuthStatusMessage = (data)=>{
    return{
        type: SET_USER_AUTH_MESSAGE,
        payload: data
    }
}