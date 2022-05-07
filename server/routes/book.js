import express from 'express';
import {CreateBooks, GetBooks, UpdateBook, DeleteBook, GetAllBooks, GetAmazonBooks} from '../controllers/Book.js';
import Auth from '../middleware/Auth.js';

const router = express.Router()

// Book routes
router.post('/createbook', Auth, CreateBooks);                      // For creating new books
router.post('/updatebook/:id', Auth, UpdateBook);                   // For updating a book 
router.get('/getbooks', Auth, GetBooks);                            // For retrieving all the books for a user
router.post('/getallbooks/:search', Auth, GetAllBooks);             // For retrieving all the books based on search parameter
router.delete('/deletebook/:id', DeleteBook);                       // For deleting a book
router.post('/getamazonbooks/:search', Auth, GetAmazonBooks);       // For retrieving all the books from amazon

export default router;
