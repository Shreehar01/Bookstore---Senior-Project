import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { UpdateInformation } from '../../actions/auth';
import ProfileImage from "@daym3l/react-profile-image";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './styles.css';



// Function for alert after submitting the search form.
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



/**/
/*
InfoForm()
NAME
    InfoForm - Generates and returns the Javascript XML for the form in the personal information page.
SYNOPSIS
    InfoForm({user}); 
        user -> object consisting of the name, email, password, collegeyear, image data, 
        and major of the user.
DESCRIPTION
    It updates the input box with the existing user information and displays the form,
    allowing the users to update their information and profile picture.
RETURNS
    Returns the Javascript XML for the form in personal information page.
*/
/**/
const InfoForm = ({user}) => {
  
  // Reducer objects.
  const dispatch = useDispatch();
  const history = useHistory();
  
  // State and state handlers.
  const [open, setOpen] = React.useState(false);
  const [personalInformation, setPersonalInformation] = useState({firstName: user?.result.name.split(" ")[0], 
                                                        lastName: user?.result.name.split(" ")[1] , email: user?.result.email, 
                                                        newPassword: "", collegeYear: user?.result.collegeYear, major: user?.result.major, 
                                                        collegeName: user?.result.collegeName, image: user?.result.image, newPassword: ''});
  
  // Event handler for closing the alert.                                                      
  const HandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  // Event handler for submitting the updated information.
  const HandleSubmit = (event) =>{
    event.preventDefault();
    dispatch(UpdateInformation(personalInformation));
    setOpen(true);
  };
  
  // Event handler for updating the input box.
  const HandleChange = (e) => {
    setPersonalInformation({...personalInformation, [e.target.name]: e.target.value});
  };

  // Function for retrieving the user image.
  const GetImages = (base64Image, fileImage) => {
		setPersonalInformation({...personalInformation, image: base64Image})
	};


  return (
        <div>

          {/* Alert modal. */}
          <Snackbar open={open} autoHideDuration={6000} onClose={HandleClose}>
            <Alert onClose={HandleClose} severity="success">
              Your profile has been updated!
            </Alert>
          </Snackbar>
          <br />
          <br />
          
          {/* Form container. */}
          <Container>      
            <Row>
              <Col sm= {4}>
                <Form type = "submit">
                  <Row>
                    <Col sm = {2}>
                    </Col> 
                    
                    {/* Camera and Image component. */}
                    <Col>
                      <ProfileImage
                        camera
                        returnImage={GetImages}
                        defaultImage = {user?.result?.image}
                        uploadBtnProps={{ variant: "contained", label: "Browse" }}
                        styles = {{ height: 200, width: 200, backgorundColor: '#87ceeb', borderRadius: '250px'}}
                      />
                    </Col>  
                  </Row>
                  <br /> 

                  {/* Input boxes for personal information. */}
                  <Row> 
                    <Col>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name = "firstName" value = {personalInformation.firstName} onChange = {HandleChange} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name = "lastName" value = {personalInformation.lastName} onChange = {HandleChange}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control disabled name = "email" type="email" value = {personalInformation.email} />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name = "newPassword" type="password" placeholder = "*********" value = {personalInformation.newPassword} onChange = {HandleChange}/>
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Major</Form.Label>
                    <Form.Control name = "major" value = {personalInformation.major} onChange = {HandleChange}/>
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Year In College</Form.Label>
                    <Form.Control name = "collegeYear" value = {personalInformation.collegeYear} onChange = {HandleChange}/>
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>College's Name</Form.Label>
                    <Form.Control name = "collegeName" value = {personalInformation.collegeName} onChange = {HandleChange}/>
                  </Form.Group>
                  <br />

                  {/* Buttons. */}
                  <Button onClick = {() => {history.push('/homepage')}} variant="outline-danger">Cancel</Button> {'  '}
                  <Button onClick = {HandleSubmit} variant="outline-primary">Update</Button>
                </Form>
              </Col>
              <Col sm = {8}>
              </Col>
            </Row>
          </Container>
      </div>
    )
};
// InfoForm({user}); 



export default InfoForm;
