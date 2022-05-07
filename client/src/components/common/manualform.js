import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {CreateBook, UpdateBook} from '../../actions/book';
import {CreateRequest, UpdateRequest} from '../../actions/request';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



// Function for alert after submitting the search form. 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



/**/
/*
ManualForm()
NAME
    ManualForm - Generates and returns the Javascript XML for the form for updating the book/request
                 posted by the user.
SYNOPSIS
    Manualform({myrequests, currentId, setCurrentId}); 
        myrequests   -> a boolean that is true if the current page is displaying the request section
                        and false otherwise.
        currentId    -> the id of the selected book.
        setCurrentId -> state handler for changing the id of the selected book.
DESCRIPTION
    It generates a form consisting of the information of the book or the request posted
    by the user for updating its information.   
RETURNS
    Returns the Javascript XML for the form for updating book/request posted by the user.
*/
/**/
const Manualform = ({myrequests, currentId, setCurrentId}) => {
  
  // Redux object.
  const dispatch = useDispatch();
  
  // State and state handlers.
  const [open, setOpen] = React.useState(false);
  const [bookInfo, setBookInfo] = useState({name: '', author: '', condition: 'Brand New', subject: '', 
                                            professor: '', notes: 'Present', exam: 'Present'});
  
  // Retrieving books and owner information.                                 
  const ownerInformation = JSON.parse(localStorage.getItem('profile'));
  const ownerId = ownerInformation?.result._id;
  const info = window.location.href.split("/");
  const currentPage =  info[info.length - 1]; 
  const book = useSelector((state) => currentId ? state.Mybooks.find((p) => p._id == currentId) : null);
  
  // Event handler for removing the modal.
  const HandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  // Hook for updating the selected book.
  useEffect(() => {
      if(book) setBookInfo(book);
  }, [book]);

  // Event handler called when book information is changed in the form.
  const HandleChange = (e) => {
    setBookInfo({...bookInfo, [e.target.name]: e.target.value});
  };

  // Function for clearing the information of the selected book.
  const ClearInfo = () =>{
    setBookInfo({name: '', author: '', condition: 'Brand New', subject: '', professor: '', notes: 'Present', exam: 'Present'});
    setCurrentId(0)
  }

  // Event handler for submitting the updated information of the book.
  const HandleSubmit = (event) =>{
    
    // If no book was selected, then dispatch create call.
    if (currentId == 0){
      event.preventDefault();

      // If we are in mybooks page, then dispatch create book call.
      if (currentPage === "mybooks"){
        const bookInformation = bookInfo;
        bookInformation.Owner = ownerId;
        dispatch(CreateBook(bookInformation));
      }
      // If we are in myrequests page, then dispatch create request call.
      else if (currentPage === 'myrequests'){
        const requestInformation = bookInfo;
        delete requestInformation["condition"];
        delete requestInformation["notes"];
        delete requestInformation["exam"];
        requestInformation.Owner = ownerId;
        dispatch(CreateRequest(requestInformation));
      } 
      
    // If a book was selected, then dispatch update call.
    }else{
      if (currentPage === "mybooks"){
        dispatch(UpdateBook(currentId, bookInfo));
      } else if (currentPage === "myrequests"){
        dispatch(UpdateRequest(currentId, bookInfo));
      }
    }
    setOpen(true);
    setCurrentId(0);
    ClearInfo(); 
  };

  return (
        <div>

          {/* Text for creating or editing a book and request. */}
          {!currentId ? 
            <h1> Post a {currentPage === 'mybooks'?  <> Book </> : <> Request </> } </h1> :
            <h1> Edit a {currentPage === 'mybooks'?  <> Book </> : <> Request </> }</h1> 
          }

          {/* Book details form. */}
          <Form type = "submit">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name and Edition</Form.Label>
              <Form.Control onChange = {HandleChange} name = "name" value = {bookInfo.name} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Author's Name</Form.Label>
              <Form.Control onChange = {HandleChange} name = "author" value = {bookInfo.author} />
            </Form.Group>
            {!myrequests &&
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Condition</Form.Label>
                <Form.Control onChange = {HandleChange} name = "condition" value = {bookInfo.condition} as="select">
                  <option value = "Brand New">Brand New</option>
                  <option value = "Like New">Like New</option>
                  <option value = "Very Good">Very Good</option>
                  <option value = "Good">Good</option>
                  <option value = "Acceptable">Acceptable</option>
                </Form.Control>
              </Form.Group>
            } 

          {/* Modal for notification once a book is created or edited. */}
          <Snackbar open={open} autoHideDuration={6000} onClose={HandleClose}>
              <Alert onClose={HandleClose} severity="success">
                Your {currentPage === 'mybooks'?  <> book </> : <> request </> } has been posted! 
              </Alert>
          </Snackbar>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control onChange = {HandleChange} name = "subject" value = {bookInfo.subject} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Professor's Name</Form.Label>
                  <Form.Control onChange = {HandleChange} name = "professor" value = {bookInfo.professor} />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {/*  If we are creating a request, then two additional input boxes are displayed. */}
          {!myrequests &&
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="select" value = {bookInfo.notes} name = "notes" onChange = {HandleChange}>
                  <option value = "Present">Present</option>
                  <option value = "Absent">Absent</option>
                </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Exam Materials</Form.Label>
                  <Form.Control onChange = {HandleChange} as="select" name = "exam" value = {bookInfo.exam}>
                    <option value = "Present">Present</option>
                    <option value = "Absent">Absent</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          }
          <br />
          {/* Submit and clear buttons. */}
          <Button onClick = {HandleSubmit} variant="outline-primary">Submit</Button> &nbsp; &nbsp; {'  '} 
          <Button onClick = {ClearInfo} variant="outline-danger">Clear</Button>
        </Form>  
      </div>
  )
};
// Manualform({myrequests, currentId, setCurrentId});



export default Manualform;
