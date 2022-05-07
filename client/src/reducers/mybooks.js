import { CREATEBOOK, GETBOOK, GETALLBOOK, DELETEBOOK, UPDATEBOOK } from "../constants/actionTypes";
import { CREATEREQUEST, GETREQUEST, DELETEREQUEST, UPDATEREQUEST } from "../constants/actionTypes";


/**/
/*
BookReducer()
NAME
    BookReducer - Reducer for managing the list of books/requests in the global store.
SYNOPSIS
    BookReducer({mybooks, action}); 
        mybooks   -> global state for storing the list of books/requests for the current user.
        action    -> action object consisting of the response data and the type of action dispatched.
DESCRIPTION
    It updates the global state for the list of books/requests to be shown for the current user
    depending on the type of action creator called. One can update the mybooks global state upon
    getting, creating, updating and deleting books and requests.
RETURNS
    Returns the mybooks array that consists of updated list of books for the current user.
*/
/**/
const BookReducer = (mybooks = [], action) =>{
    switch (action.type){
        case GETBOOK:
            return action.payload;
        case GETALLBOOK:
            return action.payload;
        case CREATEBOOK:
            return [... mybooks, action.payload];  
        case UPDATEBOOK:
            return mybooks.map((updatedBook) => updatedBook._id === action.data._id ? action.data : updatedBook);
        case DELETEBOOK:
            return mybooks.filter((mybooks) => mybooks._id !== action.id);
        case GETREQUEST:
            return action.payload;
        case CREATEREQUEST:
            return [... mybooks, action.payload];  
        case UPDATEREQUEST:
            return mybooks.map((updatedBook) => updatedBook._id === action.data._id ? action.data : updatedBook);
        case DELETEREQUEST:
            return mybooks.filter((mybooks) => mybooks._id !== action.id);
        default:
            return mybooks;      
    }
};
// BookReducer({mybooks, action});


export default BookReducer;