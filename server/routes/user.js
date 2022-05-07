import express from 'express';
import { SignIn, SignUp, UpdateInformation, SendMail, SendMultipleMails} from '../controllers/User.js';
import Auth from '../middleware/Auth.js';

const router= express.Router()

// User and Mail routes
router.post('/signin', SignIn);                                     // For signing into the application 
router.post('/signup', SignUp);                                     // For signing up for the application
router.patch('/updateinformation', UpdateInformation);              // For updating user information
router.post('/sendmail', SendMail);                                 // For sending an email
router.post('/sendmultiplemails', Auth, SendMultipleMails);         // For sending multiple emails

export default router;

