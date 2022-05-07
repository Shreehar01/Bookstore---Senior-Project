import mongoose from 'mongoose';
import Book from '../models/book.js';
import User from '../models/user.js';
import Request from '../models/request.js';
import request from 'request-promise';
import dotenv from 'dotenv';
import SendGrid from '@sendgrid/mail';



/**/
/*
CreateBooks()
NAME
    CreateBooks - Creates a new book object and stores it in the database.
SYNOPSIS
    CreateBooks = async(req, res);
    req       -> Request object that consists of the information about the book.
    res       -> Response object that will carry the book information and the status code back to the client. 
DESCRIPTION
    It receives the information of the book posted by any user and saves it in the database. It also checks 
    for any book requests that match to the book information posted and sends mass email to all the users 
    whose requests match.  
RETURNS
    Returns the book information along with the status code 200 as a part of the response object if successful
    in saving the book and sending email. Returns error message with status code 400 if not successful.
*/
/**/
export const CreateBooks = async (req, res) =>{
    
    const book = req.body;
    const newBook = new Book({...book});
    
    // Sending the emails to the users whose book requests match 
    // the subject of the book that is being created.
    const requests = await Request.find({ subject: book.subject });
    const getOwnerInfo = () => {
        const promises = requests.map(async (book) => {
            let ownerInfos = await User.find({_id: book.Owner})      
            return ownerInfos;   
        });
        return Promise.all(promises);
    }

    // Getting the information of owners who have made book requests.
    let owners = await getOwnerInfo();                              
    let ownerInfo = []
    owners.map((owner)=>{
        ownerInfo.push(owner[0])
    })
    
    // Merging the owner information with the respective books.
    let idx = 0;
    let requestbooks = []
    requests.forEach((book)=>{
        const {_id, name, author, subject, professor, Owner} = book;
        requestbooks.push({ _id, name, author, subject, professor, Owner, email: ownerInfo[idx].email, userName: ownerInfo[idx].name});
        idx++;
    })

    // Sending emails.
    SendGrid.setApiKey(process.env.SENDGRID_KEY)
    requestbooks.map( async (book) =>{
        let receiverName = book.userName.split(" ")[0];
        let bookName = book.name;
        let authorName = book.author;
        let receiverEmail = book.email;
        let msg = {
            to: receiverEmail,
            from: "adhikarisanskar99@gmail.com",
            subject: "BookStore Request",
            text:  
                `Dear ${receiverName},
                Based on your request posted on the Bookstore application for the book with the name of 
                ${bookName} written by ${authorName}, we are sending you this email to notify you that someone 
                has just uploaded a book with the name ${req.body.name} written by author(s) ${req.body.author}. 
                Log into the Bookstore to see about the book in more detail and check if this matches what you need.       
                Sincerely,
                BookStore Team`   
        };
        try {
            await SendGrid.send(msg);
        } catch (error) {
            res.status(400).json({message: error.message})
        }

    })    

    // Saving the newly posted book and sending the book information back to the client.
    try{
        await newBook.save();
        res.status(200).json(newBook);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}
/* CreateBooks = async(req, res); */



/**/
/*
GetBooks()
NAME
    GetBooks - Retrieves all the books posted by user.
SYNOPSIS
    GetBooks = async(req, res);
    req       -> Request object that consists of the information about the user id.
    res       -> Response object that will carry the book information and the status code back to the client. 
DESCRIPTION
    It receives the information of the user's id and returns the lists of books the user has posted.
RETURNS
    Returns all the book information that user has posted along with the status code 200 as a part of the 
    response object if successful in finding the books from the database.
    Returns error message with status code 400 if not successful.
*/
/**/
export const GetBooks = async (req, res) =>{
    try{
        const mybooks = await Book.find({Owner: req.userId});
        res.status(200).json({mybooks});
    } catch (error){
        res.status(400).json({message: error.message})
    }
}
/* GetBooks = async(req, res); */



/**/
/*
GetAllBooks()
NAME
    GetAllBooks - Retrieves all the books based on the subject.
SYNOPSIS
    GetBooks = async(req, res);
    req       -> Request object that consists of the information about the subject of the book.
    res       -> Response object that will carry the book information and the status code back to the client. 
DESCRIPTION
    It receives the information of a study subject and returns the lists of books for that subject.
RETURNS
    Returns all the list of the books for a given subject along with the status code 200
    as a part of the response object if successful in finding the books from the database.
    Returns error message with status code 400 if not successful.
*/
/**/
export const GetAllBooks = async (req, res) =>{
    try{
        // Finding the books based on search parameter
        let books = await Book.find({subject: req.params.search});
        
        // Getting the information of owner of all the books found above
        const getOwnerInfo = () => {
            const promises = books.map(async (book) => {
                let ownerInfos = await User.find({_id: book.Owner})      
                return ownerInfos;        
            });
            return Promise.all(promises);
        }
        let owners = await getOwnerInfo();        
        let ownerInfo = []
        owners.map((owner)=>{
            ownerInfo.push(owner[0])
        })

        // Merging the owner information with the respective books and sending it to the client
        let idx = 0;
        let mybooks = []
        books.forEach((book)=>{
            const {notes, exam, _id, name, author, condition, subject, professor, Owner} = book;
            mybooks.push({notes, exam, _id, name, author, condition, subject, professor, Owner, email: ownerInfo[idx].email, provider: ownerInfo[idx].name, college:ownerInfo[idx].collegeName, latitude: ownerInfo[idx].latitude, longitude: ownerInfo[idx].longitude });
            idx++;
        })
        res.status(200).json({mybooks});
    } catch (error){
        res.status(400).json({message: error.message});
    }
}
/* GetAllBooks = async(req, res); */



/**/
/*
UpdateBook()
NAME
    UpdateBook - Updates a book with the new information.
SYNOPSIS
    UpdateBook = async(req, res);
    req       -> Request object that consists of the updated information of the book.
    res       -> Response object that will carry the updated book information and the 
                   status code back to the client. 
DESCRIPTION
    It receives the updated information of a book along with its id and returns updated 
    information back after saving it.
RETURNS
    Returns the book with the updated information along with the status code 200
    as a part of the response object if successful in updating the book.
    Returns error message with status code 400 if not successful.
*/
/**/
export const UpdateBook = async (req, res) => {
    try{

        // Retreiving the id and updated book information from the client. 
        const {id} = req.params;
        const {name, author, condition, subject, professor, notes, exam} = req.body;
        const Owner = req.userId;

        // Searching the book with the given id and updating it.
        if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).send('No book presend with the given id.');
        const updatedBook = {name, author, condition, subject, professor, notes, exam, Owner, _id: id} 
        await Book.findByIdAndUpdate(id, updatedBook, {new: true});
        res.status(200).json(updatedBook);

    } catch (error){
        res.status(400).json({message: error.message});
    }  
}
/* UpdateBook = async(req, res); */



/**/
/*
DeleteBook()
NAME
    DeleteBook - Deletes the book based on the id.
SYNOPSIS
    DeleteBook = async(req, res);
    req       -> Request object that consists of the id of the book to be deleted.
    res       -> Response object that will carry the error or successfull message upon 
                   completion of deletion.
DESCRIPTION
    It receives the id of the book to be deleted and removes it from the database.
RETURNS
    Returns the success message along with the status code 200
    as a part of the response object if successful in deleting the book.
    Returns error message with status code 400 if not successful.
*/
/**/
export const DeleteBook = async (req, res) => {
    try{
        const {id}  = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that id');
        await Book.findByIdAndRemove(id);
        res.json({message: 'Post deleted successfully'});
    } catch (error){
        res.status(400).json({message: error.message});
    }
}
/* DeleteBook = async(req, res); */



/**/
/*
GetAmazonBooks()
NAME
    GetAmazonBooks - Retrieves books from amazon and sends it back to the client.
SYNOPSIS
    GetAmazonBooks = async(req, res);
    req       -> Request object that consists of search parameter.
    res       -> Response object that will carry the list of books from the amazon.
DESCRIPTION
    It receives the search parameter from the client and sends a request to retrieve
    all the books matching the search string from Amazon.
RETURNS
    Returns the list of books matching the search parameter from amazon and sends the 
    information along with the status code 200 as a part of the response object if successful 
    in retrieving the book.
    Returns error message with status code 400 if not successful.
*/
/**/
export const GetAmazonBooks = async (req, res) =>{
    const apiKey = process.env.SCRAPIFY_KEY
    const {search} = req.params;
    try {
        const response = await request(`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=https://www.amazon.com/s?k=${search}`);
        res.status(200).json(JSON.parse(response).results);
    } catch (error) {
        res.status(400).json(error);
    }
}
/* GetAmazonBooks = async(req, res); */


