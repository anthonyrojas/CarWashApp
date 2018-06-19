import {
    CONTACT_FORM_EMAIL_CHANGED,
    CONTACT_FORM_FNAME_CHANGED,
    CONTACT_FORM_LNAME_CHANGED,
    CONTACT_FORM_SUBJECT_CHANGED,
    CONTACT_FORM_MESSAGE_CHANGED,
    CONTACT_FORM_SEND_ATTEMPT,
    CONTACT_FORM_SEND_FAILURE,
    CONTACT_FORM_SEND_SUCCESS,
    CONTACT_FORM_STATUS_RESET
} from './types';
import {host, EMPTY_STR} from '../constants';
import axios from 'axios';
export const contactFormEmailChanged = (data)=>{
    return{
        type: CONTACT_FORM_EMAIL_CHANGED,
        payload: data
    }
}
export const contactFormFirstNameChanged = (data)=>{
    return{
        type: CONTACT_FORM_FNAME_CHANGED,
        payload: data
    }
}

export const contactFormLastNameChanged = (data)=>{
    return{
        type: CONTACT_FORM_LNAME_CHANGED,
        payload: data
    }
}

export const contactFormSubjectChanged = (data)=>{
    return{
        type: CONTACT_FORM_SUBJECT_CHANGED,
        payload: data
    }
}
export const contactFormMessageChanged = (data)=>{
    return{
        type: CONTACT_FORM_MESSAGE_CHANGED,
        payload: data
    }
}
export const resetEmailStatuses = (data)=>{
    return{
        type: CONTACT_FORM_STATUS_RESET,
        payload: data
    }
}
export const sendEmailFailure = (dispatch, data)=>{
    dispatch({
        type: CONTACT_FORM_SEND_FAILURE,
        payload: data
    });
}
export const sendEmailSuccess = (dispatch, data)=>{
    dispatch({
        type: CONTACT_FORM_SEND_SUCCESS,
        payload: data
    });
}
export const sendEmailAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: CONTACT_FORM_SEND_ATTEMPT,
            payload: true
        });
        let errorMsgs = {};
        let errorExists = false;
        if(!data.email){
            errorExists = true;
            errorMsgs.email = 'You must enter a valid email.';
        }
        let email = data.email.toLowerCase();
        email = email.trim();
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)){
            errorExists = true;
            errorMsgs.email = 'You must enter a valid email.';
        }
        if(!data.firstName || data.firstName.trim() === ''){
            errorExists = true;
            errorMsgs.firstName = 'You must enter your first name';
        }
        if(!data.lastName || data.lastName.trim() === ''){
            errorExists = true;
            errorMsgs.lastName = 'You must enter your last name.';
        }
        if(!data.subject || data.subject.trim() === ''){
            errorExists = true;
            errorMsgs.subject = 'You must enter an email subject';
        }
        if(!data.emailMessage || data.emailMessage === ''){
            errorExists = true;
            errorMsgs.emailMessage = 'You must enter an email message.';
        }
        if(errorExists){
            sendEmailFailure(dispatch, errorMsgs);
        }else{
            let httpData={
                email: data.email,
                subject: data.subject,
                firstName: data.firstName,
                lastName: data.lastName,
                emailMessage: data.emailMessage
            };
            axios.post(`${host}/public/mail`, data).then(res=>{
                if(!res){
                    sendEmailFailure(dispatch, {
                        email: EMPTY_STR,
                        firstName: EMPTY_STR,
                        lastName: EMPTY_STR,
                        subject: EMPTY_STR,
                        emailMessage: EMPTY_STR
                    });
                }
                sendEmailSuccess(dispatch, 'Email sent!');
            }).catch(err=>{
                sendEmailFailure(dispatch, {
                    email: EMPTY_STR,
                    firstName: EMPTY_STR,
                    lastName: EMPTY_STR,
                    subject: EMPTY_STR,
                    emailMessage: EMPTY_STR
                });
            });
        }
        //axios.post().then().catch();
        //check the email with regex and trim it
        //also check if email exists
    }
}