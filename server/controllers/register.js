import Register from "../models/register.js";



/**/
/*
RegisterCollege()
NAME
    RegisterCollege - Registers the college for BookStore application and keeps it in
               the mailing list.
SYNOPSIS
    RegisterCollege = async(req, res);
    req       -> Request object that consists of the information about the college.
    res       -> Response object that will carry the college information and the status code back to the client. 
DESCRIPTION
    It receives the email and collegename saves it in the mailing list of the database.
RETURNS
    Returns the college information along with the status code 201 as a part of the response object if successful
    in saving the college information. Returns error message with status code 400 if not successful.
*/
/**/
export const RegisterCollege = async (req, res) => {
    const { emailAddress, collegeName} = req.body;
    try {
      const result = await Register.create({ emailAddress, collegeName });
      res.status(201).json({result});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}; 
/* Register = async(req, res); */  