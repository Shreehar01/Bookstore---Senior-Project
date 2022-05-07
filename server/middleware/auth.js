import jwt from 'jsonwebtoken';



/**/
/*
Auth()
NAME
    Auth - Middleware that verifies the authentication token.
SYNOPSIS
    Auth = async(req, res);
    req       -> Request object that consists of the authenticaton token in the headers.
    res       -> Response object that will carry the user information, token and the status code back to the client. 
DESCRIPTION
    It receives the information of the authentication token for a user and verifies it. If verification is successful,
    the control is passed to next function on line. If it is unsuccessful, it stops the execution of the 
    request from the client.
RETURNS
    Returns error message to the client if the authentication token cannot be validated.
*/
/**/
const Auth = async(req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'bookstoreapplication');
            req.userId = decodedData?.id;
        } else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
/* Auth = async(req, res); */



export default Auth;