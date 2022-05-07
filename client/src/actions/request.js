import * as API from '../api/index';
import {CREATEREQUEST, UPDATEREQUEST, DELETEREQUEST, GETREQUEST} from '../constants/actionTypes';



/**/
/*
CreateRequest()
NAME
    CreateRequest - Sends a POST request for creating book request and updates the global store for booklist.
SYNOPSIS
    CreateRequest(requestInformation);
        requestInformation -> object consisting of the details of the request to be created.
DESCRIPTION
    It sends a POST request to the server and dispatches the CREATEREQUEST action
    to update the global store with the book request information received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const CreateRequest = (requestInformation) => async(dispatch) => {
    try{
        const {data} = await API.CreateRequest(requestInformation);
        dispatch({type: CREATEREQUEST, payload: data});
    } catch (error){
        console.log(error.message);
    }
}
// CreateRequest(requestInformation);



/**/
/*
GetRequests()
NAME
    GetRequests - Sends a GET request for fetching book requests and updates the global store for booklist.
SYNOPSIS
    GetRequests();
        No arguments passed.
DESCRIPTION
    It sends a GET request to the server and dispatches the GETREQUEST action
    to update the global store with the book request information received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const GetRequests = () => async(dispatch) => {
    try{
        const {data} = await API.GetRequests();
        dispatch({type: GETREQUEST, payload: data.myrequests});
    } catch (error){
        console.log(error.message);
    }
}
// GetRequests();




/**/
/*
UpdateRequest()
NAME
    UpdateRequest - Sends a POST request for editing book request's information 
                    and updates the global store for booklist.
SYNOPSIS
    UpdateRequest(id, requestInfo);
        id           -> id of the book request
        requestInfo  -> object consisting of the updated details of the book request to be edited.
DESCRIPTION
    It sends a POST request to the server with the requestinformation and the id
    and dispatches the UPDATEREQUEST action to update the global store with the book request 
    information received from the server. It also logs any errors that are encountered while sending
    the request to the console. 
RETURNS
    Void
*/
/**/
export const UpdateRequest = (id, requestInfo) => async (dispatch) => {
    try{
        const {data} = await API.UpdateRequest(id, requestInfo);
        dispatch({type: UPDATEREQUEST, data});      
    } catch (error){
        console.log(error.message);
    }
}
// UpdateRequest(id, requestInfo);



/**/
/*
DeleteRequest()
NAME
    DeleteRequest - Sends a POST request for deleting a book request
                    and updates the global store for booklist.
SYNOPSIS
    DeleteRequest(id);
        id        -> id of the book request to be deleted
DESCRIPTION
    It sends a POST request to the server with the book request id and dispatches the DELETEREQUEST
    action to update the global store to remove the id of the deleted book request. It also logs any 
    errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const DeleteRequest = (id) => async(dispatch) => {
    try{
        await API.DeleteRequest(id);
        dispatch({type: DELETEREQUEST, id});
    } catch(error){
        console.log(error.message);
    }
}
// DeleteRequest(id);

