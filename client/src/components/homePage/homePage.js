import React, {useState} from 'react'
import { Row, Container, Form } from 'react-bootstrap';
import Contents from '../common/contents.js'
import {GetAllBooks} from '../../actions/book';
import { useDispatch } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Navbar from '../common/navbar';
import Footer from '../common/footer';



/**/
/*
HomePage()
NAME
    HomePage - Generates and returns the Javascript XML for the card consisting of list of selected books.
SYNOPSIS
    HomePage(); 
        No props passed.
DESCRIPTION
    It generates the XML for the first page (homepage) that the user enters after loggin in.
    The homepage consists of search bar where user can enter the subject of the books they require, 
    toggle button to switch into search-by-map feature. The main content of the page is the list of
    search entries that consist of books posted by other users and their detailed information.   
RETURNS
    Returns the Javascript XML for the homepage of the application.
*/
/**/
const HomePage = () => {
  
  // State and redux objects.
  const dispatch = useDispatch();
  const [state, setState] = React.useState({checkedB: false});
  const [search, setSearch] = useState('');
  
  // Event handler for updating search input box.
  const HandleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  // Event handler for changing mode of search.
  const SearchChange = (e) =>{
    setSearch(e.target.value)
  }
  
  // Event handler for sending requests for books.
  const HandleSubmit = (event) =>{
    event.preventDefault();
    dispatch(GetAllBooks(search));
  }

  return (
      <div>
          <Navbar />
          <br />
          <Container fluid="md">
            <Row>
              <form onSubmit = {HandleSubmit}>
                <Form.Group>
                  <Form.Control onChange = {SearchChange} value = {search} size="lg" type="text" placeholder="Search for the books by their subject's name. (Eg. Computer Science)" />
                </Form.Group>
              </form>
            </Row>
            <Row>
              <FormControlLabel
                    control={
                      <Switch
                        checked={state.checkedB}
                        onChange={HandleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Show in Maps"
                />
            </Row>
          </Container>          
          < br/>
          <Contents mybooks = {false} checkedStatus = {state.checkedB} />
          <Footer />
      </div>
  )
};
// HomePage();



export default HomePage
