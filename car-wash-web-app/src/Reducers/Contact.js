import {
    CONTACT_FORM_EMAIL_CHANGED,
    CONTACT_FORM_LNAME_CHANGED,
    CONTACT_FORM_FNAME_CHANGED,
    CONTACT_FORM_SUBJECT_CHANGED,
    CONTACT_FORM_MESSAGE_CHANGED,
    CONTACT_FORM_SEND_ATTEMPT,
    CONTACT_FORM_SEND_FAILURE,
    CONTACT_FORM_SEND_SUCCESS,
    CONTACT_FORM_STATUS_RESET
} from '../Actions/types';
import {EMPTY_STR} from '../constants';
const initialState = {
    email: EMPTY_STR,
    subject: EMPTY_STR,
    firstName: EMPTY_STR,
    lastName: EMPTY_STR,
    emailMessage: EMPTY_STR,
    sendingEmail: false,
    sendingEmailErr: false,
    sendingEmailSuccess: false,
    emailErr: EMPTY_STR,
    firstNameErr: EMPTY_STR,
    lastNameErr: EMPTY_STR,
    subjectErr: EMPTY_STR,
    emailMessageErr: EMPTY_STR
}

export default (state=initialState, action)=>{
    switch(action.type){
        case CONTACT_FORM_EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload,
                emailErr: EMPTY_STR,
                sendingEmailErr: false,
                sendingEmailSuccess: false
            }
        case CONTACT_FORM_FNAME_CHANGED:
            return{
                ...state,
                firstName: action.payload,
                firstNameErr: EMPTY_STR,
                sendingEmailSuccess: false,
                sendingEmailErr: false
            }
        case CONTACT_FORM_LNAME_CHANGED:
            return{
                ...state,
                lastName: action.payload,
                lastNameErr: EMPTY_STR,
                sendingEmailErr: false,
                sendingEmailSuccess: false
            }
        case CONTACT_FORM_SUBJECT_CHANGED:
            return{
                ...state,
                subject: action.payload,
                subjectErr: EMPTY_STR,
                sendingEmailErr: false,
                sendingEmailSuccess: false
            }
        case CONTACT_FORM_MESSAGE_CHANGED:
            return{
                ...state,
                emailMessage: action.payload,
                emailMessageErr: EMPTY_STR,
                sendingEmailErr: false,
                sendingEmailSuccess: false
            }
        case CONTACT_FORM_SEND_ATTEMPT:
            return{
                ...state,
                sendingEmail: true,
                sendingEmailErr: false,
                sendingEmailSuccess: true
            }
        case CONTACT_FORM_SEND_FAILURE:
            return{
                ...state,
                sendingEmail: false,
                sendingEmailErr: true,
                sendingEmailSuccess: false,
                emailErr: action.payload.email,
                subjectErr: action.payload.subject,
                firstNameErr: action.payload.firstName,
                lastNameErr: action.payload.lastName,
                emailMessageErr: action.payload.emailMessage
            }
        case CONTACT_FORM_SEND_SUCCESS:
            return{
                ...state,
                sendingEmail: false,
                sendingEmailErr: false,
                sendingEmailSuccess: true,
                email: EMPTY_STR,
                subject: EMPTY_STR,
                firstName: EMPTY_STR,
                lastName: EMPTY_STR,
                emailMessage: EMPTY_STR
            }
        case CONTACT_FORM_STATUS_RESET:
            return{
                ...state,
                sendingEmailErr: action.payload,
                sendingEmailSuccess: action.payload
            }
        default: 
            return state
    }
}