import {SENDMAIL, SENDMULTIPLEMAILS} from '../constants/actionTypes';



/**/
/*
MailReducer()
NAME
    MailReducer - Reducer for managing the receiver ids in the global store.
SYNOPSIS
    MailReducer({mailsent, action}); 
        mailsent  -> global state for storing the list of recievers for whom the mail has been sent.
        action    -> action object consisting of the response data and the type of action dispatched.
DESCRIPTION
    It updates the global state for the list of users receiving the mail depending on the type of action
    creator called. One can update the mailsent global state upon sending a single mail or multiple mails.
RETURNS
    Returns the mailsent array that consists of updated list of ids of the receivers.
*/
/**/
const MailReducer = (mailsent = [], action) =>{
    switch (action.type){
        case SENDMAIL:
            return [... mailsent, action.payload];      
        case SENDMULTIPLEMAILS:
            return [mailsent[0], ...action.payload]
        default:
            return mailsent;      
    }
};
// MailReducer({mailsent, action});



export default MailReducer;