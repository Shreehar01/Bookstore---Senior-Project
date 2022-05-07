import {combineReducers} from 'redux';
import Auth from './auth';
import Mybooks from './mybooks';
import Mailsent from './mail';
import Webbooks from './searchweb';


// Merging and exporting all the values stored in the global store.
export default combineReducers({Auth, Mybooks, Mailsent, Webbooks});    