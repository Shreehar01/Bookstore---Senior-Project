import mongoose from 'mongoose';
import Request from '../models/request.js';
import User from '../models/user.js';



/**/
/*
CreateRequest()
NAME
    CreateRequest - Creates a new book object request and stores it in the database.
SYNOPSIS
    CreateRequest = async(req, res);
    req       -> Request object that consists of the information about the book.
    res       -> Response object that will carry the book information and the status code back to the client. 
DESCRIPTION
    It receives the information of the book request posted by any user and saves it in the database.
RETURNS
    Returns the book information along with the status code 201 as a part of the response object if successful
    in saving the book and sending email. Returns error message with status code 400 if not successful.
*/
/**/
export const CreateRequest = async (req, res) =>{
    const request = req.body;
    const newRequest = new Request({...request});
    try{
        await newRequest.save();
        res.status(201).json(newRequest);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}
/* CreateRequest = async(req, res); */



/**/
/*
GetRequests()
NAME
    GetRequests - Retrieves all the book requests posted by user.
SYNOPSIS
    GetRequests = async(req, res);
    req       -> Request object that consists of the information about the user id.
    res       -> Response object that will carry the book information and the status code back to the client. 
DESCRIPTION
    It receives the information of the user's id and returns the lists of book requests the user has posted.
RETURNS
    Returns all the book request information that user has posted along with the status code 200 as a part 
    of the response object if successful in finding the books from the database.
    Returns error message with status code 400 if not successful.
*/
/**/
export const GetRequests = async (req, res) =>{
    try{
        const myrequests = await Request.find({Owner: req.userId});
        res.status(200).json({myrequests});
    } catch (error){
        res.status(400).json({message: error.message});
    }
}
/* GetRequests = async(req, res); */



/**/
/*
UpdateRequest()
NAME
    UpdateRequest - Updates a book request with the new information.
SYNOPSIS
    UpdateRequest = async(req, res);
    req       -> Request object that consists of the updated information of the book.
    res       -> Response object that will carry the updated book information and the 
                   status code back to the client. 
DESCRIPTION
    It receives the updated information of a book request along with its id and returns 
    updated information back after saving it.
RETURNS
    Returns the book request with the updated information along with the status code 200
    as a part of the response object if successful in updating the book.
    Returns error message with status code 400 if not successful.
*/
/**/
export const UpdateRequest = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, author, condition, subject, professor, notes, exam} = req.body;
        const Owner = req.userId;
        if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).send('No request with that id');
        const updatedRequest = {name, author, condition, subject, professor, notes, exam, Owner, _id: id} 
        await Request.findByIdAndUpdate(id, updatedRequest, {new: true});
        res.status(200).json(updatedRequest);
    } catch (error){
        res.status(400).json({message: error.message});
    }  
}
/* UpdateRequest = async(req, res); */



/**/
/*
DeleteRequest()
NAME
    DeleteRequest - Deletes the book based on the id.
SYNOPSIS
    DeleteRequest = async(req, res);
    req       -> Request object that consists of the id of the book to be deleted.
    res       -> Response object that will carry the error or successfull message upon 
                   completion of deletion.
DESCRIPTION
    It receives the id of the book request to be deleted and removes it from the database.
RETURNS
    Returns the success message along with the status code 200
    as a part of the response object if successful in deleting the book.
    Returns error message with status code 400 if not successful.
*/
/**/
export const DeleteRequest = async (req, res) => {
    try{
        const {id}  = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).send('No post with that id');
        await Request.findByIdAndRemove(id);
        res.status(200).json({message: 'Post deleted successfully'});
    } catch (error){
        res.status(400).json({message: error.message});
    }
}
/* DeleteRequest = async(req, res); */