import React, {useState} from 'react';
import {Navbar, Nav, Button, Container} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import BrandImage from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.css';



// Modification on the styling of bootstrap-icon.
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));



/**/
/*
NavBar()
NAME
    NavBar - Generates and returns the Javascript XML for the authentication page.
SYNOPSIS
    NavBar({homepage}); 
        homepage -> a boolean that is true if the user is the authentication home page and false
                    otherwise.
DESCRIPTION
    It generates a navigation bar that is fixed on top and consists of links to visit different
    other pages in the application along with the logout button.    
RETURNS
    Returns the Javascript XML for the navigation bar for the application.
*/
/**/
const NavBar = ({homepage}) => {
  
  // Style and redux objects.
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // States and state handlers.
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [show, setShow] = useState(false);
  
  // Event handlers for logout modal.
  const HandleClose = () => setShow(false);
  const HandleShow = () => setShow(true);
  
  // Function for logging out.
  const Logout = () =>{
    dispatch({type: 'LOGOUT'});
    history.push('/');
  };
  
  const ownerInformation = JSON.parse(localStorage.getItem('profile'));
  
  return (
      <Navbar sticky = "top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={ownerInformation ? "/homepage" : "/"}> <img
            alt=""
            src={BrandImage}  
            width="30"
            height="30"
            className="d-inline-block align-top"
          /> {' '} Bookstore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
            {/* If we are not in the entry page, then display links to other pages. */}
            <Nav className="me-auto">
              {!homepage && 
                <>
                  <Nav.Link href="mybooks">My Books</Nav.Link>
                  <Nav.Link href="myrequests">My Requests</Nav.Link>
                  <Nav.Link href="web">Search Web</Nav.Link>
                  <Nav.Link href="myinformation">My Information</Nav.Link>
                </>
              }
            </Nav>
          
          {/* Modal for logging out. */}
          <Modal centered show={show} onHide={HandleClose}>
            <Modal.Header>
              <Modal.Title>Logging Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to log out? </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={HandleClose}>
                Cancel
              </Button>
              <Button variant="outline-danger" onClick={Logout}>
                Log Out
              </Button>
            </Modal.Footer>
          </Modal>
          
          {/* Footer will have additional components if we are in the entry page. */}
          {homepage ? (
            <>
              <Nav>
                <Nav.Link disabled>About</Nav.Link>
                <Nav.Link disabled>Contact Us</Nav.Link>
              </Nav>
            </>
            ):(
            <>
              <div className={classes.root}>
                <Avatar className = {classes.orange} alt={user?.result?.name} src={user?.result?.image} />
              </div> &nbsp; &nbsp; &nbsp;
              <Button onClick = {HandleShow} variant="outline-light"> Log Out </Button>
            </>)
          }
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};
// NavBar({homepage});



export default NavBar;
