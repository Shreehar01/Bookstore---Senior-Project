import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';



/**/
/*
Footer()
NAME
    Footer - Generates and returns the Javascript XML for the footer.
SYNOPSIS
    Footer(); 
        No props passed.
DESCRIPTION
    It generates the footer that is fixed on the bottom for the application.    
RETURNS
    Returns the Javascript XML for the footer for the application.
*/
/**/
const Footer = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link disabled> Copyright © 2021 BookStore | Supported by VMiller </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link disabled>Terms</Nav.Link>
              <Nav.Link disabled>Privacy Policy</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
  )
};
// Footer();



export default Footer;
