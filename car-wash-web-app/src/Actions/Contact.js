import {
    CONTACT_FORM_EMAIL_CHANGED,
    CONTACT_FORM_FNAME_CHANGED,
    CONTACT_FORM_LNAME_CHANGED,
    CONTACT_FORM_SUBJECT_CHANGED,
    CONTACT_FORM_MESSAGE_CHANGED,
    CONTACT_FORM_SEND_ATTEMPT,
    CONTACT_FORM_SEND_FAILURE,
    CONTACT_FORM_SEND_SUCCESS
} from './types';

export const contactFormEmailChanged = (data)=>{
    console.log(data);
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
export const sendEmailFailure = (dispatch, data)=>{}
export const sendEmailSuccess = (disptach, data)=>{}
export const sendEmailAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: CONTACT_FORM_SEND_ATTEMPT,
            payload: true
        });
        let email = data.email.trim();
        //check the email with regex and trim it
        //also check if email exists
    }
}