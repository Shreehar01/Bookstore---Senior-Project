import React from 'react'
import Contents from '../common/contents';
import Manualform from '../common/manualform';
import {Row, Col, Container} from 'react-bootstrap';
import {useState} from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';



/**/
/*
MyRequest()
NAME
    MyRequest - Generates and returns the Javascript XML for list of book requests of the users.
SYNOPSIS
    MyRequest(); 
        No props passed.
DESCRIPTION
    It utilizes the two functional components - Contents and Manual Form - to display the list of 
    requested books by a user. The content component will display the table with entries and the manual form
    component will display the form for updating the book request.    
RETURNS
    Returns the Javascript XML for the book-request feature of the application.
*/
/**/
const MyRequest = () => {
    
    // State and state handler.
    const [currentId, setCurrentId] = useState(0);
   
    // Book requests page.
    return (
        <div>

          {/* Navigation bar */}
          <Navbar />
          
          {/* Request Details and Forms.*/}
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <br />
                <br />
                <Contents mybooks = {true} myrequests = {true} setCurrentId = {setCurrentId} />
              </Col>
              <Col xs={6} md={4}>
                <br />
                <br />
                <Manualform myrequests = {true} currentId = {currentId}  setCurrentId = {setCurrentId}/>
              </Col>
            </Row>
          </Container> 
          <Footer />
        </div>
    )
};
// MyRequest();



export default MyRequest;
