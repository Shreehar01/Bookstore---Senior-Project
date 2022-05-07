import {SENDMAIL, SENDMULTIPLEMAILS} from '../constants/actionTypes';
import * as API from '../api/index';



/**/
/*
SendMail()
NAME
    SendMail - Sends POST request to send an email to the provider of a book.
SYNOPSIS
    SendMail(mailInformation);
        mailInformation -> object consisting of the details of the sender, provider, and the book.
DESCRIPTION
    It sends a POST request to the server to send an email to the provider and dispatches the 
    SENDMAIL action to update the global store with the ids of the books which the user has sent email to.
    It also logs any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const SendMail = (mailInformation) => async(dispatch) => {
    try{
        const {data} = await API.SendMail(mailInformation);
        dispatch({type: SENDMAIL, payload: data});
    } catch (error){
        console.log(error.message);
    }
}
// SendMail(mailInformation);



/**/
/*
SendMultipleMails()
NAME
    SendMultipleMail - Sends POST request to send emails to the providers of different books at once.
SYNOPSIS
    SendMultipleMails(selectedBook);
        selectedBook -> object consisting of the details of the books and their providers that have been
                        selected to send emails.
DESCRIPTION
    It sends a POST request to the server to send multiple emails to the provider and dispatches the 
    SENDMULTIPLEMAILS action to update the global store with the ids of the books which the user has 
    sent email to. It also logs any errors that are encountered while sending the request to the console. 
RETURNS
    Void
*/
/**/
export const SendMultipleMails = (selectedBook) => async(dispatch) => {
    try{
        const {data} = await API.SendMultipleMails(selectedBook);
        dispatch({type: SENDMULTIPLEMAILS, payload: data.listofIds});
    } catch (error){
        console.log(error.message);
    }
}
// SendMultipleMails(selectedBook);
