import * as API from '../api';
import {CREATEBOOK, UPDATEBOOK, DELETEBOOK, GETBOOK, GETALLBOOK, GETAMAZONBOOKS} from '../constants/actionTypes';



/**/
/*
CreateBook()
NAME
    CreateBook - Sends a POST request for creating books and updates the global store for booklist.
SYNOPSIS
    CreateBook(bookInformation);
        bookInformation -> object consisting of the details of the book to be created.
DESCRIPTION
    It sends a POST request to the server and dispatches the CREATEBOOK action
    to update the global store with the book information received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const CreateBook = (bookInformation) => async(dispatch) => {
    try{
        const {data} = await API.CreateBook(bookInformation);
        dispatch({type: CREATEBOOK, payload: data});
    } catch (error){
        console.log(error.message);
    }
}
// CreateBook(bookInformation);



/**/
/*
GetBooks()
NAME
    GetBooks - Sends a GET request for fetching books and updates the global store for booklist.
SYNOPSIS
    GetBooks();
        No arguments passed.
DESCRIPTION
    It sends a GET request to the server and dispatches the GETBOOK action
    to update the global store with the book information received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const GetBooks = () => async(dispatch) => {
    try{
        const {data} = await API.GetBooks();
        dispatch({type: GETBOOK, payload: data.mybooks});
    } catch (error){
        console.log(error.message);
    }
}
// GetBooks();



/**/
/*
GetAllBooks()
NAME
    GetAllBooks - Sends a POST request for fetching books based on search parameter and updates the 
                  global store for booklist.
SYNOPSIS
    GetAllBooks(search);
        search -> the name of the subject for which the book is being searched.
DESCRIPTION
    It sends a POST request to the server with the search parameter and dispatches the GETALLBOOK 
    action to update the global store with the book information received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const GetAllBooks = (search) => async(dispatch) => {
    try{
        const {data} = await API.GetAllBooks(search);
        dispatch({type: GETALLBOOK, payload: data.mybooks});
    } catch (error){
        console.log(error.message);
    }
}
// GetAllBooks(search);



/**/
/*
UpdateBook()
NAME
    UpdateBook - Sends a POST request for editing book's information 
                 and updates the global store for booklist.
SYNOPSIS
    UpdateBook(id, bookInfo);
        id        -> id of the book
        bookInfo  -> object consisting of the updated details of the book to be edited.
DESCRIPTION
    It sends a POST request to the server with the bookinformation and the id
    and dispatches the UPDATEBOOK action to update the global store with the book information 
    received from the server. It also logs any errors that are encountered while sending the 
    request to the console. 
RETURNS
    Void
*/
/**/
export const UpdateBook = (id, bookInfo) => async (dispatch) => {
    try{
        const {data} = await API.UpdateBook(id, bookInfo);
        console.log(data);
        dispatch({type: UPDATEBOOK, data});      
    } catch (error){
        console.log(error.message);
    }
}
// UpdateBook(id, bookInfo);



/**/
/*
DeleteBook()
NAME
    DeleteBook - Sends a POST request for deleting a book 
                 and updates the global store for booklist.
SYNOPSIS
    DeleteBook(id);
        id        -> id of the book to be deleted
DESCRIPTION
    It sends a POST request to the server with the book id and dispatches the DELETEBOOK action 
    to update the global store to remove the id of the deleted book. It also logs any errors that 
    are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const DeleteBook = (id) => async(dispatch) => {
    try{
        const data = await API.DeleteBook(id);
        dispatch({type: DELETEBOOK, id});
    } catch(error){
        console.log(error.message);
    }
}
// DeleteBook(id);



/**/
/*
GetAmazonBooks()
NAME
    GetAmazonBooks - Sends a POST request for fetching books from Amazon based on search parameter 
                    and updates the global store for booklist.
SYNOPSIS
    GetAllBooks(search);
        search -> the name of the book which is being searched.
DESCRIPTION
    It sends a POST request to the server with the search parameter and dispatches the GETAMAZONBOOKS 
    action to update the global store with the book information received from the server. It also logs
    any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const GetAmazonBooks = (search) => async(dispatch) => {
    try{
        const {data} = await API.GetAmazonBooks(search);
        dispatch({type: GETAMAZONBOOKS, payload: data});
    } catch (error){
        console.log(error.message);
    }
}
// GetAllBooks(search);
