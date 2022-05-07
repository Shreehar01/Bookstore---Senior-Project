  import React, {useState} from 'react'
  import {Row, Col, Container} from 'react-bootstrap';
  import Contents from '../common/contents';
  import Manualform from '../common/manualform';
  import Navbar from '../common/navbar';
  import Footer from '../common/footer';



  /**/
  /*
  MyBooks()
  NAME
      MyBooks - Generates and returns the Javascript XML for list of books posted by the user.
  SYNOPSIS
      MyBooks(); 
          No props passed.
  DESCRIPTION
      It utilizes the two functional components - Contents and Manual Form - to display the list of 
      books posted by a user. The content component will display the table with entries and the manual form
      component will display the form for updating the books posted.    
  RETURNS
      Returns the Javascript XML for the my-books feature of the application.
  */
  /**/
  const MyBooks = () => {
      const [currentId, setCurrentId] = useState(0);
      return (
          <div>
            <Navbar />
            <Container>
                <Row>
                  <Col xs={12} md={8}>
                    <br />
                    <br />
                    <Contents mybooks = {true} setCurrentId = {setCurrentId} />  
                  </Col>
                  <Col xs={6} md={4}>
                    <br />
                    <br />
                    <Manualform currentId = {currentId}  setCurrentId = {setCurrentId}/>
                  </Col>
                </Row>
              </Container> 
              <Footer />
          </div>
      )
  };
  // MyBooks();


  export default MyBooks;
