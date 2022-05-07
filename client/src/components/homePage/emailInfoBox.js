import React from 'react'
import { Card, Button } from 'react-bootstrap'
import {SendMultipleMails} from '../../actions/mail';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './styles.css';



// Function for pop-up alert.
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


/**/
/*
EmailInfoBox()   
NAME
    EmailInfoBox - Generates and returns the Javascript XML for the card consisting of list of selected books.
SYNOPSIS
    EmailInfoBox({selectedBook, setSelectedBook}); 
        selectedBook -> array consisting of list of selected books and their poster's email.
        setSelectedBook -> state handler for updating the list of selected books.
DESCRIPTION
    It generates a card component that is displayed on the search-by-map page to display the list 
    of selected books and emails. One can add or delete the selected books.   
RETURNS
    Returns the Javascript XML for the card consisting of list of selected books and emails.
*/
/**/
const EmailInfoBox = ({selectedBook, setSelectedBook}) => {
  
  // State and redux objects.
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  // Event handler for closing the pop-up.
  const HandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Event handler for sending multiple emails.
  const HandleSubmit = () =>{
    dispatch(SendMultipleMails(selectedBook))
    setSelectedBook([]);
    setOpen(true);
  }
    
  // Event handler for removing receiver from booklists.
  const HandleDeleteBooks = (book) =>{
      function arrayRemove(arr, value) { 
          return arr.filter(function(ele){ 
              return ele != value; 
          });
      }
      setSelectedBook(arrayRemove(selectedBook, book))
  }  

  return (
      <div>
        <Card
        bg={'light'}
        text={'dark'}
        style={{ width: '18rem' }}
        className="mb-2"
        >

        {/* Alert */}
        <Snackbar open={open} autoHideDuration={6000} onClose={HandleClose}>
          <Alert onClose={HandleClose} severity="success">
            Your book requests have been sent!
          </Alert>
        </Snackbar>
        
        {/* Card Component containing the list of emails */}
        <Card.Header>Emails</Card.Header>
        <Card.Body>
          {!selectedBook.length && <Card.Text> Add the emails to send multiple book requests at once. </Card.Text>}
          <Card.Text>
            <div>
              {selectedBook.map(book => ( 
                <div className="tag-item" key={book._id}>
                  {book.email}
                  <button
                    type="button"
                    className="button"
                    onClick={() => {HandleDeleteBooks(book)}}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </Card.Text>
          {<Button variant="outline-primary" disabled = {selectedBook.length === 0} onClick = {HandleSubmit}>Send Email</Button>}
        </Card.Body>
      </Card>  
    </div>
  )
};
// EmailInfoBox({selectedBook, setSelectedBook});



export default EmailInfoBox;
