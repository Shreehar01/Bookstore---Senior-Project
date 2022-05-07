import React , {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {GetBooks, DeleteBook} from '../../actions/book';
import {GetRequests, DeleteRequest } from '../../actions/request';
import {SendMail} from '../../actions/mail';
import { IoIosSend } from 'react-icons/io';
import {FiEdit} from 'react-icons/fi';
import {RiDeleteBin7Line} from 'react-icons/ri';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {Modal} from 'react-bootstrap';
import SearchMaps from '../homePage/searchMaps.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Background from './images/bookstore.png';
import {Tooltip, OverlayTrigger } from 'react-bootstrap';



// Function for alert after submitting the search form.
function Alert(props) {
  return <MuiAlert elevation={7} variant="filled" {...props} />;
}



// Customization for the react-boostrap table.
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 700,
},
}));



// Customization of columns in the react-bootstrap table.
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1c2e4a',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



// Customization of rows in the react-bootstrap table.
const StyledTableRow = withStyles((theme) => ({
root: {
  '&:nth-of-type(odd)': {
    backgroundColor: '#a7c9f2',
  },
},
}))(TableRow);



/**/
/*
CenteredModal()   
NAME
    CenteredModal - Generates and returns the Javascript XML for the modal consisting of the 
                    pre-ready prompt for the email.
SYNOPSIS
    CenteredModal(props); 
        props -> object consisting of the sender's and receiver's information for sending the email.
DESCRIPTION
    It generates a vertically centered modal that consists of the pre-ready prompt for the email
    to be sent to the users who had posted for the book.   
RETURNS
    Returns the Javascript XML for the modal that consists of the email body to be sent to the user.
*/
/**/
function CenteredModal(props) {
  return (
    // Modal component.
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      {/* Modal header. Contains the title. */}
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Send Email
        </Modal.Title>
      </Modal.Header>

      {/* Modal content. Contains the email prompt. */}
      <Modal.Body>
        <p>
          Dear {props.bookInfo?.provider?.split(" ")[0]}, <br />
          I found your email from the Bookstore application online. I was really interested in the book {props.bookInfo.name} 
          written by {props.bookInfo.author}. Can you please lend me your book if you do not need it at the moment? My email 
          address is {props.myProfile?.result.email}.
          <br />  <br />
          Sincerely,
          <br />
          {props.myProfile?.result.name} 
          <br />
          {props.myProfile?.result.collegeName} 
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.sendmail}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};
// CenteredModal(props);



/**/
/*
Contents()   
NAME
    Contents - Generates and returns the Javascript XML for the table for the homepage, mybooks
               myrequests section of the application. 
SYNOPSIS
    Contents({mybooks, myrequests, checkedStatus, setCurrentId}); 
        mybooks       -> boolean that is true if the current user is in the mybooks section
                         and false otherwise.
        myrequests    -> boolean that is true if the current user is in the myrequests section
                         and false otherwise.
        checkedStatus -> boolean that is true if the toggle button for map was turned on
                         and false otherwise.
        setCurrentId  -> state handler for updating the id of the selected book for editing. 
DESCRIPTION
    It generates the table displaying the list of entries of the books and their user information.
    Current user can toggle between seeing the entries in tables and map and send emails
    using the pre-ready prompt.   
RETURNS
    Returns the Javascript XML for list of entries for the book searched or posted by the user.
*/
/**/
const Contents = ({mybooks, myrequests, checkedStatus, setCurrentId}) => {
    
    // Style and redux objects.
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    
    // States and state handlers.
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedBook, setSelectedBook] = React.useState({});
    const [open2, setOpen2] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [open, setOpen] = React.useState(false);

    // Retrieving information about the books and the current page details.
    const myProfile = JSON.parse(localStorage.getItem('profile'));
    const books = useSelector((state)=> state.Mybooks);
    const sentId = useSelector((state)=> state.Mailsent);
    const info = window.location.href.split("/");
    const currentPage =  info[info.length - 1];
    let listIds = []
    sentId?.map((sent)=>{
        listIds = listIds.concat(sent)
    })

    // Getting the current location.
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    //  Event handler for changing the page.
    const HandleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    // Event handler to prevent automatic row-wise page change.
    const HandleChangeRowsPerPage = (event) => {
        event.preventDefault();
    };

    // Hook for retrieving books and requests. Called after the page loads.
    useEffect (()=>{
      if (currentPage === "mybooks") {
        dispatch(GetBooks());
      }else if (currentPage === "myrequests"){
        dispatch(GetRequests());
      }
    }, [])
    
    // Helper function for sending mail with pre-ready prompts.
    const SendMailHelper = () =>{
      const mailInformation = {bookId: selectedBook._id, receiverName: selectedBook.provider.split(" ")[0], 
                               receiverEmail: selectedBook.email, bookName: selectedBook.name, authorName: selectedBook.author, 
                               senderName: myProfile?.result.name, senderCollege: myProfile?.result.collegeName, 
                               senderEmail: myProfile?.result.email}
      dispatch(SendMail(mailInformation));
      setOpen(true)
      setModalShow(false);
    }

    // Event handler for closing the mail-prompt.
    const HandleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
    }
      setOpen(false);
    };

    // Event handler for closing the modal.
    const HandleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen2(false);
    };
    
    // Function for redirecting to the home page.
    const GoToHomepage = () =>{
      history.push('/');
    }
        
    return (
        <div> 

          {/* If profile doesnt exist, redirect back to homepage. */}
          {!myProfile && GoToHomepage()}
          
          {/* Modal for pre-ready email. */}
          <CenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  bookInfo = {selectedBook}
                  myProfile = {myProfile}
                  sendmail = {SendMailHelper}
          />

          {/* Display the table if map-button is not turned on. */}
          {!checkedStatus ? 
          <>
            <Container>
                <Snackbar open={open2} autoHideDuration={7000} onClose={HandleClose2}>
                  <Alert onClose={HandleClose2} severity="error">
                      Your {currentPage === 'mybooks'?  <> book </> : <> request </> } has been deleted! 
                  </Alert>
                </Snackbar> 
                <Snackbar open={open} autoHideDuration={7000} onClose={HandleClose}>
                  <Alert onClose={HandleClose} severity="success">
                    Your mail has been sent! 
                  </Alert>
                </Snackbar>
                
                {/* If no entries match the search parameter, display the modal and message. */}
                {!books?.length ? 
                  <div> 
                    <React.Fragment>
                      <CssBaseline />
                      <Container>
                        <Typography component="div" style={{backgroundImage: `url(${Background})`, backgroundPosition: "center",  height: '77vh'}} >
                          <h3> No entries found! {currentPage !== 'mybooks' && currentPage !== 'myrequests' && <>Search web, instead.</>}</h3>
                        </Typography>
                      </Container>
                    </React.Fragment> 
                  </div> 
                :  

                // If there are entries that match the search parameter, display the table.
                // Tables will have some additional columns depending on the page it is at.
                  <Row>
                    <Col sm={12}>
                      <Paper className={classes.root}>
                        <TableContainer className = {classes.container}>
                          <Table stickyHeader aria-label="sticky table">
                            
                            {/* Table columns. */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align ="left">Book Name and Edition</StyledTableCell>
                                <StyledTableCell align = "right">Author's Name</StyledTableCell>                  
                                {!myrequests && <StyledTableCell align = "right">Condition</StyledTableCell>}
                                <StyledTableCell align="right">Subject</StyledTableCell>
                                <StyledTableCell align="right">Professor</StyledTableCell>
                                {!mybooks && !myrequests && <StyledTableCell align="right">College Name</StyledTableCell>}
                                {!myrequests && <StyledTableCell align="right">Notes</StyledTableCell>}
                                {!myrequests && <StyledTableCell align="right">Exam Materials</StyledTableCell>}
                                {!mybooks &&
                                <StyledTableCell align="right">Provider's Name</StyledTableCell>}
                                { !mybooks &&
                                <StyledTableCell align="right">Send Email</StyledTableCell>}
                                {mybooks && <StyledTableCell align="right">Modify/Delete</StyledTableCell>}
                              </TableRow>
                            </TableHead>     
                            
                            {/* Table contents. */}
                            <TableBody>

                              {/* Iterate over the books object and show only the 7 entries at once. */}
                              {books.slice(page * 7, page * 7 + 7).map((book) => (
                                <StyledTableRow key={book.name}>  
                                <StyledTableCell component="th" scope="row">
                                  {book.name}
                                </StyledTableCell>
                                <StyledTableCell align = "right">
                                  {book.author}
                                </StyledTableCell>
                                {!myrequests &&< StyledTableCell align="right">{book.condition}</StyledTableCell>}
                                <StyledTableCell align="right">{book.subject}</StyledTableCell>
                                <StyledTableCell align="right">{book.professor}</StyledTableCell>
                                {!myrequests && !mybooks && <StyledTableCell align="right">{book.college}</StyledTableCell>}
                                
                                {!myrequests && <StyledTableCell align="right">{book.notes}</StyledTableCell>}
                                {!myrequests && < StyledTableCell align="right">{book.exam}</StyledTableCell>}
                                {!myrequests && !mybooks && < StyledTableCell align="right">{book.provider}</StyledTableCell>}
                                {!mybooks && <StyledTableCell align="right">
                                
                                {/* If an email has already been sent to a particular user, disable the button. */}
                                {listIds.includes(book._id) ? 
                                  <OverlayTrigger
                                    key={book._id}
                                    placement={'right'}
                                    overlay={
                                      <Tooltip id={`tooltip-${'right'}`}>
                                        You can only send one email for any book.
                                      </Tooltip>
                                    }
                                  >
                                  <span>
                                    <Button disabled onClick = {() => {
                                      setSelectedBook(book)
                                      setModalShow(true)}} 
                                      variant="outline-primary"
                                    >
                                      <IoIosSend />
                                    </Button>
                                  </span>
                                  </OverlayTrigger> 
                                :

                                // Keep the send-button active if no email has been sent.
                                  <Button onClick = {() => {
                                    setSelectedBook(book)
                                    setModalShow(true)}} 
                                    variant="outline-primary"
                                    >
                                      <IoIosSend />
                                  </Button>
                                }
                                </StyledTableCell>}
                                {mybooks && <StyledTableCell align="right"><Button onClick = {()=> setCurrentId(book._id)} variant="outline-primary"><FiEdit /> </Button> {}
                                <Button onClick = {() => {
                                  setOpen2(true)
                                  currentPage === "mybooks" ? dispatch(DeleteBook(book._id)): dispatch(DeleteRequest(book._id)) 
                                  }} variant="outline-danger"><RiDeleteBin7Line /> </Button></StyledTableCell>}
                              </StyledTableRow>
                            ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        {/* Pages for the table */}
                        <TablePagination
                        rowsPerPageOptions={[7]}
                        component="div"
                        count={books.length}
                        rowsPerPage={7}
                        page={page}
                        onChangePage={HandleChangePage}
                        onRowsPerPageChange={HandleChangeRowsPerPage}
                        />  
                     </Paper>
                    </Col>
                  </Row>
                }
              </Container>
            </> 
          : 
            <>
            {/* If the map-button was turned on, display google maps component instead. */}
<             SearchMaps books = {books} latitude = {latitude} longitude = {longitude} /> </>
          }
      </div>
    )
};
// Contents({mybooks, myrequests, checkedStatus, setCurrentId});



export default Contents;
