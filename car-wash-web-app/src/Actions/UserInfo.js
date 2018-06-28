import axios from 'axios';
import {
    FETCH_USER_INFO_ATTEMPT,
    FETCH_USER_INFO_FAILURE,
    FETCH_USER_INFO_SUCCESS
} from './types';
import {host} from '../constants';
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
                console.log(payloadData);
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