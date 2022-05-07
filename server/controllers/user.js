import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import SendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';



/**/
/*
SignIn()
NAME
    SignIn - Enables user to sign in to the application.
SYNOPSIS
    SignIn = async(req, res);
    req       -> Request object that consists of the information about the user's email and password.
    res       -> Response object that will carry the user information, token and the status code back to the client. 
DESCRIPTION
    It receives the information of the user's email and password and validates the credentials by
    comparing it with the information in the database.  
RETURNS
    Returns the user information and authentication token along with the status code 200 as a part of the 
    response object if successful in loggin in. Returns error message with status code 400 if not successful.
*/
/**/
export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(200).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, 'bookstoreapplication', { expiresIn: "2h" });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* SignIn = async(req, res); */



/**/
/*
SignUp()
NAME
    SignUp - Enables user to register to the application.
SYNOPSIS
    SignUp = async(req, res);
    req       -> Request object that consists of the information about the user.
    res       -> Response object that will carry the user information, token and the status code back to the client. 
DESCRIPTION
    It receives the information of the user and stores the user information in the database as register it 
    as a new user if the user information is not already present.
RETURNS
    Returns the user information and authentication token along with the status code 201 as a part of the 
    response object if successful in signing up. Returns error message with status code 400 if not successful.
*/
/**/
export const SignUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, collegeYear, collegeName, major, latitude, longitude} = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists." });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords didn't match." });
    const hashedPassword = await bcrypt.hash(password, 12);  // Hashing the password.
    const result = await User.create({ email, password: hashedPassword, collegeYear: collegeYear, 
                                       collegeName: collegeName,  name: `${firstName} ${lastName}`, 
                                       major: major, latitude: latitude, longitude: longitude });
    const token = jwt.sign( { email: result.email, id: result._id }, 'bookstoreapplication', { expiresIn: "2h" } );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 
/* SignUp = async(req, res); */



/**/
/*
UpdateInformation()
NAME
    UpdateInformation - Enables user to update their information.
SYNOPSIS
    UpdateInformation = async(req, res);
    req       -> Request object that consists of the updated information about the user.
    res       -> Response object that will carry the updated user information, token and 
                   the status code back to the client. 
DESCRIPTION
    It receives the new information of the user and updates it in the application's database.
RETURNS
    Returns the updated user information and authentication token along with the status code 200 as a part of the 
    response object if successful in updating information. 
    Returns error message with status code 400 if not successful.
*/
/**/
export const UpdateInformation = async (req, res) => {
  const {firstName, lastName, email, collegeYear, collegeName, image} = req.body;
  try{
    const userInfo = await User.findOne({email});
    const {_id, password} = userInfo;
    const name = firstName + " " + lastName;
    const updatedUser = {email, password, collegeYear, collegeName, name, image};
    const id = _id;
    await User.findByIdAndUpdate(id, updatedUser, {new: true});
    const result = await User.findOne({email});
    const token = jwt.sign( { email: result.email, id: result._id }, 'bookstoreapplication', { expiresIn: "2h" } ); 
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}
/* UpdateInformation = async(req, res); */




/**/
/*
SendMail()
NAME
    SendMail - Enables user to send mail to one specific user.
SYNOPSIS
    SendMail = async(req, res);
    req       -> Request object that consists of the sender's and receiver's information.
    res       -> Response object that will carry the bookId based on which the email was sent 
                   and the status code back to the client. 
DESCRIPTION
    It receives the information of the sender and the receiver and sends an email for
    a book with given bookId.
RETURNS
    Returns the bookId along with the status code 200 as a part of the response object if 
    successful in sending the email. 
    Returns error message with status code 400 if not successful.
*/
/**/
export const SendMail = async (req, res) =>{
  SendGrid.setApiKey(process.env.SENDGRID_KEY)
  const {bookId, receiverName, receiverEmail, bookName, authorName, senderName, senderCollege, senderEmail} = req.body;
  const msg = {
      to: "sjoshi4@ramapo.edu",
      from: "adhikarisanskar99@gmail.com", 
      subject: "BookStore Request",
      text:  
      `Dear ${receiverName},
I found your email from the Bookstore application online. I was really interested in the book ${bookName} written by ${authorName}. Can you please give me your book if you don't need it? 
My email address is ${senderEmail}.

Sincerely,
${senderName} 
${senderCollege}` 
};
  try{
    await SendGrid.send(msg);
    res.status(200).json([bookId]);
  } catch(error){
    res.status(400).json({message: error.message})
  }
}
/* SendMail = async(req, res); */



/**/
/*
SendMultipleMails()
NAME
    SendMultipleMails - Enables user to send multiple mails to different users.
SYNOPSIS
    SendMultipleMails = async(req, res);
    req       -> Request object that consists of the sender's and receivers' information.
    res       -> Response object that will carry the list of bookIds based on which the email was sent 
                   and the status code back to the client. 
DESCRIPTION
    It receives the information of the sender and the receivers and sends emails for all the books
    with the given bookId.
RETURNS
    Returns the list of bookIds along with the status code 200 as a part of the response object 
    if successful in sending the email. 
    Returns error message with status code 400 if not successful.
*/
/**/
export const SendMultipleMails = async (req, res) =>{
  SendGrid.setApiKey(process.env.SENDGRID_KEY)
  const userInfo = await User.findOne({_id: req.userId});
  const senderName = userInfo.name;
  const senderCollege = userInfo.collegeName;
  const senderEmail = userInfo.email;
  let listofIds = [];
  const selectedBooks = req.body;
  selectedBooks.map((book)=>{
    let bookId = book._id;
    listofIds.push(bookId)
  })
  selectedBooks.map( async (book) =>{
    let receiverName = book.provider;
    let bookName = book.name;
    let authorName = book.author;
    let receiverEmail = book.email;
    let msg = {
        to: "sjoshi4@ramapo.edu",
        from: "adhikarisanskar99@gmail.com",
        subject: "BookStore Request",
        text:  
        `Dear ${receiverName},
I found your email from the Bookstore application online. I was really interested in the book ${bookName} written by ${authorName}. Can you please give me your book if you don't need it? 
My email address is ${senderEmail}.

Sincerely,
${senderName} 
${senderCollege}` 
};
    try{
      await SendGrid.send(msg);
    } catch(error){
      res.status(400).json({message: error.message})
    }
  })

  try{
    res.status(200).json({listofIds});
  } catch(error){
    res.status(400).json({message: error.message});
  }
}
/* SendMultipleMails = async(req, res); */

