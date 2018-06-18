import {
    CONTACT_FORM_EMAIL_CHANGED,
    CONTACT_FORM_LNAME_CHANGED,
    CONTACT_FORM_FNAME_CHANGED,
    CONTACT_FORM_SUBJECT_CHANGED,
    CONTACT_FORM_MESSAGE_CHANGED,
    CONTACT_FORM_SEND_ATTEMPT,
    CONTACT_FORM_SEND_FAILURE,
    CONTACT_FORM_SEND_SUCCESS
} from '../Actions/types';
const initialState = {
    email: '',
    subject: '',
    firstName: '',
    lastName: '',
    emailMessage: '',
    sendingEmail: false
}

export default (state=initialState, action)=>{
    switch(action.type){
        case CONTACT_FORM_EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload
            }
        case CONTACT_FORM_FNAME_CHANGED:
            return{
                ...state,
                firstName: action.payload
            }
        case CONTACT_FORM_LNAME_CHANGED:
            return{
                ...state,
                lastName: action.payload
            }
        case CONTACT_FORM_SUBJECT_CHANGED:
            return{
                ...state,
                subject: action.payload
            }
        case CONTACT_FORM_MESSAGE_CHANGED:
            return{
                ...state,
                emailMessage: action.payload
            }
        default: 
            return state
    }
}