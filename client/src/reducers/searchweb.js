import {GETAMAZONBOOKS} from "../constants/actionTypes";



/**/
/*
WebBooksRecuer()
NAME
    WebBooksRecuer - Reducer for managing the list of books from the web in the global store.
SYNOPSIS
    WebBooksRecuer({webbooks, action}); 
        webbooks   -> global state for storing the list of books from the web for the current user.
        action     -> action object consisting of the response data and the type of action dispatched.
DESCRIPTION
    It updates the global state for the list of books from the web to be shown for the current user
    depending on the type of action creator called.
RETURNS
    Returns the webbooks array that consists of list of books from the web for the current user.
*/
/**/
const WebBooksReducer = (webbooks = [], action) =>{
    switch (action.type){
        case GETAMAZONBOOKS:
            return action.payload;
        default:
            return webbooks;      
    }
};
// WebBooksRecuer({webbooks, action});



export default WebBooksReducer;