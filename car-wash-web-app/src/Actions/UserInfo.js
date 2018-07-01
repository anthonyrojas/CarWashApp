import axios from 'axios';
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
} from './types';
import {host, EMPTY_STR, EMAIL_REGEX, PHONE_REGEX} from '../constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const fetchMyUserInfoAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: FETCH_USER_INFO_ATTEMPT,
            payload: data
        });
        let token = cookies.get('authentication');
        if(token !== null && token !== undefined){
            let config = {headers: {authorization: token}};
            axios.get(`${host}/api/user`, config).then(res=>{
                let userInfo = res.data.userInfo;
                let payloadData = {
                    email: userInfo.email,
                    phone: userInfo.phone,
                    username: userInfo.username,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName
                }
                fetchMyUserInfoSuccess(dispatch, payloadData);
            }).catch(err=>{
                if(err.response){
                    fetchMyUserInfoFailure(dispatch, err.response.data.message)
                }else{
                    fetchMyUserInfoFailure(dispatch, 'Unable to fetch your user account information at this time. Service unavailable.');
                }
            });
        }else{
            fetchMyUserInfoFailure(dispatch, 'Unable to fetch your user account information at this time.');
        }
    }
}
export const fetchMyUserInfoSuccess = (dispatch, data)=>{
    dispatch({
        type: FETCH_USER_INFO_SUCCESS,
        payload: data
    });
}
export const fetchMyUserInfoFailure = (dispatch, data)=>{
    dispatch({
        type: FETCH_USER_INFO_FAILURE,
        payload: data
    });
}
export const toggleEditAccountInfo = (data)=>{
    return{
        type: EDIT_ACCOUNT_INFO_TOGGLE,
        payload: data
    }
}
export const accountFirstNameChanged = (data)=>{
    return{
        type: ACCOUNT_FIRST_NAME_CHANGED,
        payload: data
    }
}
export const accountLastNameChanged = (data)=>{
    return{
        type: ACCOUNT_LAST_NAME_CHANGED,
        payload: data
    }
}
export const accountEmailChanged = (data)=>{
    return{
        type: ACCOUNT_EMAIL_CHANGED,
        payload: data
    }
}
export const accountPhoneChanged = (data)=>{
    return{
        type: ACCOUNT_PHONE_CHANGED,
        payload: data
    }
}
export const updateAccountInfoAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: UPDATE_ACCOUNT_INFO_ATTEMPT,
            payload: true
        });
        let errMsgs = {
            email: EMPTY_STR,
            phone: EMPTY_STR,
            firstName: EMPTY_STR,
            lastName: EMPTY_STR
        };
        let errorExists = false;
        if(!data.email){
            errorExists = true;
            errMsgs.email = 'You must enter a valid email.';
        }else if(!EMAIL_REGEX.test(data.email)){
            errorExists = true;
            errMsgs.email = 'You must enter a valid email.';
        }
        if(!data.phone){
            errorExists = true;
            errMsgs.phone = 'You must enter a valid phone number';
        }else if(!PHONE_REGEX.test(data.phone)){
            errorExists = true;
            errMsgs.phone = 'You must enter a valid phone number.';
        }
        if(!data.firstName){
            errorExists = true;
            errMsgs.firstName = 'You must enter your first name.';
        }else if(data.firstName.trim() === EMPTY_STR){
            errorExists = true;
            errMsgs.firstName = 'You must enter your first name';
        }
        if(!data.lastName){
            errorExists = true;
            errMsgs.lastName = 'You must enter your last name.';
        }else if(data.lastName.trim() === EMPTY_STR){
            errorExists = true;
            errMsgs.lastName = 'You must enter your last name';
        }
        if(errorExists){
            let failData = {
                statusMessage: 'Unable to update your account. Check error messages.',
                errMsgs: errMsgs
            }
            updateAccountInfoFailure(dispatch, failData);
        }else{
            let token = cookies.get('authentication');
            if(token !== null && token !== undefined && token !== EMPTY_STR){
                let config = {headers: {authorization: token}};
                axios.put(`${host}/api/user`, data, config).then(res=>{
                    let successData = {
                        user: res.data.userInfo,
                        statusMessage: res.data.message
                    };
                    updateAccountInfoSuccess(dispatch, successData);
                }).catch(err=>{
                    if(!err.response){
                        let failData = {
                            statusMessage: 'Cannot update your account at this time. Server unavailable. Try again later.',
                            errMsgs: errMsgs
                        }
                        updateAccountInfoFailure(dispatch, failData);
                    }else{
                        let failData={
                            statusMessage: err.response.data.message,
                            errMsgs: errMsgs
                        }
                        updateAccountInfoFailure(dispatch, failData);
                    }
                });
            }else{
                let failData = {
                    statusMessage: 'Authentication failed. Your token is invalid. Please login again.',
                    errMsgs: errMsgs
                }
                updateAccountInfoFailure(dispatch, failData);
            }
        }
    }
}
export const updateAccountInfoFailure = (dispatch, data)=>{
    dispatch({
        type: UPDATE_ACCOUNT_INFO_FAILURE,
        payload: data
    });
}
export const updateAccountInfoSuccess = (dispatch, data)=>{
    dispatch({
        type: UPDATE_ACCOUNT_INFO_SUCCESS,
        payload: data
    });
}
export const resetAccountStatusMessage = (data)=>{
    return{
        type: RESET_STATUS_MESSAGE,
        payload: data
    }
}