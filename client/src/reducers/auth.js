import {AUTH, AUTHFAIL, AUTHUPDATE, LOGOUT, REGISTER} from '../constants/actionTypes';



/**/
/*
AuthReducer()
NAME
    AuthReducer - Reducer for managing the authentication data in the global store.
SYNOPSIS
    AuthReducer({state, action}); 
        state  -> global state for authentication data
        action -> action object consisting of the response data and the type of action dispatched.
DESCRIPTION
    It updates the global state for the authentication data depending on the type of action
    creator called. One can update the data while logging in, logging out, updating the authentication
    token, and register a college name.    
RETURNS
    Returns the state object that consists of authData as the key an array consisting of user
    information and authentication token as value. 
*/
/**/
const AuthReducer = (state = {authData: null}, action) =>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data};
        case AUTHFAIL:
            return {...state, authData: action.data.message};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case AUTHUPDATE:
            localStorage.clear();
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        case REGISTER:
            return state;
        default: 
            return state;
    }   
};
// AuthReducer({state, action});



export default AuthReducer;