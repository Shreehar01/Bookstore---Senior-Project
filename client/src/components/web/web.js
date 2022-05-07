import React, {useState, useEffect} from 'react'
import { Row, Container, Form } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {GetAmazonBooks} from '../../actions/book';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Background from './web.png';
import {Link} from 'react-router-dom';
import {GrAmazon} from 'react-icons/gr';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Col} from 'react-bootstrap';
import Navbar from '../common/navbar';
import Footer from '../common/footer';



// Customizing react-bootstrap tables.
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 600,
},
}));



// Customizing table columns.
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#203354',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



// Customizing table rows.
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#a5c9f2',
    },
  },
}))(TableRow);




/**/
/*
Web()
NAME
    Web - Generates and returns the Javascript XML for the search-web feature.
SYNOPSIS
    Web(); 
        No props passed.
DESCRIPTION
    It generates the search-web page that consists of an input box which can be used to search for 
    a specific book from the web. Users can select to search from multiple book vendors. Currently,
    only amazon is available. After a search parameter is passed, it will dispatch an HTTP request
    to the server. Upon receiving the response, the entries will be displayed in a table form.   
RETURNS
    Returns the Javascript XML for the search-web page of the application.
*/
/**/
const Web = () => {

    // Style and reducer objects.
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    
    // State and state handlers.
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [state, setState] = React.useState({
      checkedA: true,
      checkedB: false
    });
    
    // Retrieving user information from redux and local storage.
    let results = useSelector((state) => state.Webbooks);
    const ownerInfo = localStorage.getItem('profile')
  
    // Event handler for changing table entries.
    const HandleChangePage = (event, newPage) => {
     setPage(newPage);
    };
    
    // Function for returning to homepage.
    const GoToHomepage = () => {
      history.push('/')
    }
    
    // Event handler for changing rows per page.
    const HandleChangeRowsPerPage = (event) => {
      event.preventDefault();
    };
    
    // Function for setting the search parameter.
    const SearchChange = (e) =>{
      setSearch(e.target.value)  
    }
    
    // Event handler for submitting the search request.
    const HandleSubmit = (event) =>{
      event.preventDefault();
      dispatch(GetAmazonBooks(search));
      history.push('/web')
      setMessage('Fetching data from the web!')
    }

    // Event handler for updating the search parameter.
    const HandleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    
    return (
        <div>

          {/* If no authentication token present, then go to entry page. */}
          {!ownerInfo && GoToHomepage()}
          
          {/* Navigation bar fixed on top. */}
          <Navbar />
          < br />
          
          {/* Container for the page. */}
          <Container fluid="md">
            
            {/* Search box for the books. */}
            <Row>
              <form onSubmit = {HandleSubmit}>
                <Form.Group>
                  <Form.Control onChange = {SearchChange} value = {search} size="lg" 
                    type="text" placeholder="Search for the books by their title and author name (Eg. Linear Algebra)" />
                </Form.Group>
              </form>
            </Row>
            
            {/* List of book vendors. */}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedA}
                    onChange={HandleChange}
                    name="checkedA" 
                    color="primary"
                  />
                }
                label="Amazon"
              />   
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    disabled
                    label="Chegg"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    disabled
                    label="AbeBooks"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    disabled
                    label="CampusBooks"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    disabled
                    label="ThriftBooks"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    disabled
                    label="Bookfinder"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    disabled
                    label="TextBookRush"
                  />
                </div>  
            </FormGroup>
          </Container>
          
          {/* If none of the book vendors are selected, then display a message. */}
          {!state.checkedA || !results.length ? 
            <div>
              <React.Fragment>
                <CssBaseline />
                <Container>
                  <Typography component="div" style={{backgroundImage: `url(${Background})`, backgroundPosition: "center",  height: '75vh'}} >
                    <br />
                    {state.checkedA ? 
                      <h3> {message} <h2> {'    '} {message && <CircularProgress />}  </h2></h3>:  <> <h3>Please select one of the websites!</h3> </> 
                    }
                  </Typography>
                </Container>
              </React.Fragment>
            </div>
          : 

          // If book vendors are selected, display the search results.
            <>
              <br />
              <Container>
                <Row>
                  <Col sm={12}>
                    <Paper className={classes.root}>
                      <TableContainer className = {classes.container}>
                        <Table stickyHeader aria-label="sticky table">

                          {/* Table Headings */}
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Image</StyledTableCell>
                              <StyledTableCell align = "left">Book Name</StyledTableCell>
                              <StyledTableCell align = "right">Rating</StyledTableCell>
                              <StyledTableCell align = "right">Quantity</StyledTableCell>
                              <StyledTableCell align = "right">Price(s)</StyledTableCell>
                              <StyledTableCell >Visit</StyledTableCell>
                            </TableRow>
                          </TableHead>

                          {/* Table Contents */}
                          <TableBody>
                            {results.slice(page * 7, page * 7 + 7).map((result) => (
                              <StyledTableRow >  
                                <StyledTableCell component="th" scope="row">
                                  <OverlayTrigger
                                    key={"bottom"}
                                    placement={"right"}
                                    overlay={
                                      <Tooltip>
                                        <img src={result.image} width="180" height="320" />
                                      </Tooltip>
                                    }
                                  >
                                    <img src={result.image} width="40" height="60" />
                                  </OverlayTrigger>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  {result.name}                       
                                </StyledTableCell>
                                < StyledTableCell align="right">
                                  {result.stars ? result.stars : <> N/A </>}
                                </StyledTableCell>
                                < StyledTableCell align="right">
                                  {result.availability_quantity ? result.availability_quantity : <> N/A </>}
                                </StyledTableCell>
                                < StyledTableCell align="right">
                                  {result.price_string ?(result.price_string.split('$').slice(1,)).map((price) => <> ${price}&nbsp; </>) : <> N/A </>}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Link to={{ pathname: `${result.url}` }} target="_blank">
                                    <Button variant="outline-primary">
                                      <GrAmazon /> 
                                    </Button>
                                  </Link>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Page information */}
                      <TablePagination
                        rowsPerPageOptions={[7]}
                        component="div"
                        count={results.length}
                        rowsPerPage={7}
                        page={page}
                        onChangePage={HandleChangePage}
                        onRowsPerPageChange={HandleChangeRowsPerPage}
                      />
                    </Paper>
                  </Col>
                </Row>
              </Container>
            </>
          }
          <Footer />
        </div>
    )
};
// Web();



export default Web;
