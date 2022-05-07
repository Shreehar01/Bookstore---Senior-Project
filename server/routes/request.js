import express from 'express';
import {CreateRequest, GetRequests, UpdateRequest, DeleteRequest} from '../controllers/Request.js';
import Auth from '../middleware/Auth.js';

const router = express.Router()

// Request routes
router.post('/createrequest', Auth, CreateRequest);                 // For creating a book request
router.post('/updaterequest/:id', Auth, UpdateRequest);             // For updating a book request
router.get('/getrequests', Auth, GetRequests);                      // For retrieving all the book requests for a user
router.delete('/deleterequest/:id', DeleteRequest);                 // For deleting a book request

export default router;
