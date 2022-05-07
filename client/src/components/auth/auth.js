import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Avatar, Button, Paper, Grid, Typography} from '@material-ui/core';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import useStyles from './styles';
import Input from './input';
import {SignIn, SignUp, Register} from '../../actions/auth';
import {Container, Row, Col} from 'react-bootstrap'
import SchoolIcon from '@material-ui/icons/School';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Form} from 'react-bootstrap'
import SlideShow from './slideShow';
import Navbar from '../common/navbar';
import Footer from '../common/footer';



// Initial values for the form.
const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '', major: '', 
                      collegeName: '', collegeYear: '', latitude: '', longitude: ''};
const initialRegisterState = {emailAddress: '', collegeName: ''}



// Alert PopUp function.
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



/**/
/*
Auth()
NAME
    Auth - Generates and returns the Javascript XML for the authentication page.
SYNOPSIS
    Auth(); 
        No props passed.
DESCRIPTION
    It generates a slideshow container and two forms for getting input from the user. The slideshow container
    displays the list of 13 features each with image of the feature and its short description. The first form
    allows the users to register their college for getting updates for the bookstore application. The second form
    allows the users to sign in or sign up to the application.   
RETURNS
    Returns the Javascript XML for the authentication page that consists of the slideshow container and 
    the forms for registering college, signing in and signing up.
*/
/**/
const Auth = () => {
    
    // Style and redux objects.
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    // States and state handlers.
    const [showPassword, setshowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const [registerData, setRegisterData] = useState(initialRegisterState);
    const [count, setCount] = useState(-1);
    var authMessage = useSelector(state => state.Auth.authData);
    if (authMessage == "Invalid credentials"){
      if (count == -1) {
        setOpenFail(true);
        setCount(0);
      }
    }
    // Function to be executed after submitting the signup or signin form.
    const HandleSubmit = (event) =>{
        event.preventDefault();
        if(isSignup){
            dispatch(SignUp(formData, history))
        } else{
            dispatch(SignIn(formData, history)) 
            setCount(-1);
        }
    };
    
    // Function to clear the form values for registering college.
    const Clear = () => {
      setRegisterData({emailAddress: '', collegeName: ''});
    }

    // Function to be executed after submitting the register form.
    const HandleRegisterSubmit = (event) =>{
      event.preventDefault();
      dispatch(Register(registerData))
      setOpen(true);
      Clear();
    };

    // Event Handler function to be called every single time signin/signup form changes.
    const HandleChange = (e) =>{
      if (isSignup && formData.latitude.length === 0){
        navigator.geolocation.getCurrentPosition(function(position) {
          setFormData({...formData, latitude:position.coords.latitude, longitude: position.coords.longitude })
        });
      }  
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Event Handler function to be called every single time register form changes.
    const HandleRegisterChange = (e) =>{
      setRegisterData({...registerData, [e.target.name]: e.target.value});
    };
    
    // Function to close the alert popup.
    const HandleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    // Function to close the alert popup.
    const HandleCloseFail = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenFail(false);
    };

    // Function to show or hide the password.
    const HandleShowPassword = () => setshowPassword((prevshowPassword) => !prevshowPassword);
    
    // Function to switch between signup and sign in.
    const SwitchMode = () => {
        setisSignup((previsSignup) => !previsSignup);
        setshowPassword(false);
    };
   
    return (
        <div>
          {/* Navigation bar fixed on top. */}
          <Navbar homepage = {true} />

            {/* Main container for the page */}
            <Container>
              <Row>

                {/* Slide show container */}
                <Col sm={8}>
                  <Paper className = {classes.paper} >
                    <SlideShow />
                  </Paper>
                </Col>
                <Col sm={4}>

                  {/* Register form */}
                  <Snackbar open={open} autoHideDuration={6000} onClose={HandleClose}>
                    <Alert onClose={HandleClose} severity="success">
                      Your email has been registered. You will be notified about the updates soon.
                    </Alert>
                  </Snackbar>
                  <Snackbar open={openFail} autoHideDuration={6000} onClose={HandleCloseFail}>
                    <Alert onClose={HandleCloseFail} severity="error">
                      Invalid Credentials. Please Try Again!
                    </Alert>
                  </Snackbar>

                  {/* SignUp and SignIn Form */}
                  {!isSignup &&  
                    <> 
                      <Container component = "main" maxWidth = "xs">
                        <Paper className = {classes.paper} >
                          <Avatar className={classes.blue}>
                            <SchoolIcon color= "primary" />
                          </Avatar>
                          <Typography variant = "h5">Register your College </Typography>
                            <form className = {classes.form} onSubmit = {HandleRegisterSubmit}>
                              <Grid xs = {12} container spacing = {1}>
                                <Grid item xs = {12} sm = {12}>
                                  <Form.Group style = {{paddingBottom: '3px'}} controlId="exampleForm.ControlInput1">
                                    <Form.Control style={{ height: '55px'}} required  type = "email" onChange = {HandleRegisterChange} placeholder = "Email Address *" name = "emailAddress" value = {registerData.emailAddress} />
                                  </Form.Group>
                                </Grid>
                                <Grid item xs = {12} sm = {12}>
                                  <Form.Group style = {{position: 'relative', top:'-1px' }} controlId="exampleForm.ControlInput1">
                                    <Form.Control style={{ height: '55px'}} required onChange = {HandleRegisterChange} placeholder = "College Name *" name = "collegeName" value = {registerData.collegeName} />
                                  </Form.Group>
                                </Grid>
                              </Grid>
                              < br />
                              <Grid item>
                                <Button type = "submit" fullWidth variant = "contained" color = "primary" className = {classes.Submit}>
                                  Submit
                                </Button>
                              </Grid>        
                            </form>  
                        </Paper>
                      </Container>     
                    </>
                  }

                {/* Additional form elements for the signup. */}
                <Container component = "main" maxWidth = "xs">
                  <Paper className = {classes.paper} >
                    <Avatar className={classes.blue}>
                        <LockOpenRoundedIcon color= "primary" />
                    </Avatar>
                    <Typography variant = "h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                    <form className = {classes.form} onSubmit = {HandleSubmit}>
                      <Grid container spacing = {2}>
                        {isSignup && (
                          <>
                            <Input name = "firstName" label = "First Name" handleChange = {HandleChange} autoFocus half />
                            <Input name = "lastName" label = "Last Name" handleChange = {HandleChange} half />
                            <Input name = "collegeYear" label = "Year In College" handleChange = {HandleChange} />
                            <Input name = "collegeName" label = "College Name" handleChange = {HandleChange}/>
                            <Input name = "major" label = "Major" handleChange = {HandleChange}/>  
                          </>
                        )}
                        <Input name = "email" label = "Email Address" handleChange = {HandleChange} type = "email" />
                        <Input name = "password" label = "Password" handleChange = {HandleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {HandleShowPassword}/>
                        {isSignup && <Input name = "confirmPassword" label = "Repeat Password" handleChange = {HandleChange} type = "password"/>}    
                      </Grid>
                      <br />
                      <Button type = "submit" fullWidth variant = "contained" color = "primary" className = {classes.Submit}> 
                          {isSignup ? "Sign Up" : "Sign In"}
                      </Button>
                      
                      {/* Switching between sign up and sign in */}
                      <Grid container justify = "flex-end">
                        <Grid item>
                          <Button onClick = {SwitchMode}>
                            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>     
                </Container>
              </Col>
            </Row>
          </Container>

          {/* Footer Component fixed on bottom. */}
          <Footer />
        </div>
    );
};
// Auth();



export default Auth;