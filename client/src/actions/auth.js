import * as api from '../api/index';
import {AUTH, AUTHFAIL, AUTHUPDATE, REGISTER} from '../constants/actionTypes';



/**/
/*
SignIn()
NAME
    SignIn - Sends a signin request and updates the authData.
SYNOPSIS
    SignIn(formData, history); 
        formData -> User email and password for the application
        history  -> Javascript object that consists of the browser history
DESCRIPTION
    It sends a sign in GET request to the server and dispatches the AUTH or AUTHFAIL action
    to update the global store with the authData received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const SignIn = (formData, history) => async (dispatch) => {
    try{
        const {data} = await api.SignIn(formData);
        console.log(data);

        // If an error message has been receive, dispatch an 
        // authentication failure action
        if (data.message){
            dispatch({type:AUTHFAIL, data})

        // Else, update the global state with the user information.
        } else{
            dispatch({type: AUTH, data});
            history.push('/homepage');
        }
    } catch (error) {
        console.log(error);
    }
};
// SignIn(formData, history);



/**/
/*
SignUp()
NAME
    SignUp - Sends a signup request and updates the authData.
SYNOPSIS
    SignIn(formData, history); 
        formData -> User email, password and other details for the application
        history  -> Javascript object that consists of the browser history
DESCRIPTION
    It sends a sign up POST request to the server and dispatches the AUTH action
    to update the global store with the authData received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const SignUp = (formData, history) => async (dispatch) => {
    try{
        const {data} = await api.SignUp(formData);
        dispatch({type: AUTH, data});
        history.push('/homepage');
    } catch (error) {
        console.log(error);
    }
};



/**/
/*
UpdateInformation()
NAME
    UpdateInformation - Sends an update request and modifies the authData.
SYNOPSIS
    UpdateInformation(personalInformation); 
    personalInformation -> object that consists of the updated information of the user.
DESCRIPTION
    It sends an update POST request to the server and dispatches the AUTHUPDATE action
    to update the global store with the authData received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const UpdateInformation = (personalInformation) => async (dispatch) => {
    try{
        const {data} = await api.UpdateInformation(personalInformation);
        dispatch({type: AUTHUPDATE, data});
    } catch (error){
        console.log(error);
    }
}
// UpdateInformation(personalInformation);



/**/
/*
Register()
NAME
    Register - Sends a POST request to store college information.
SYNOPSIS
    SignIn(registerData); 
        registerData -> College's email and name to be stored in the mailing list.
DESCRIPTION
    It sends a POST request to the server and dispatches the REGISTER action
    to update the global store with the data received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const Register = (registerData) => async (dispatch) => {
    try{
        const {data} = await api.Register(registerData);
        dispatch({type: REGISTER, data});
    } catch (error) {
        console.log(error);
    }
};