import { useState } from 'react';
import {useSelector} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './locationMarker';
import LocationInfoBox from './locationInfoBox';
import EmailInfoBox from './emailInfoBox';
// import env from "react-dotenv";



/**/
/*
SearchMaps()
NAME
    SearchMaps - Generates and returns the Javascript XML for the google maps consisting
                 of the list of books based on search query as markers. 
SYNOPSIS
    SearchMaps({books, latitude, longitude}); 
        books      -> object containing detailed information of the book received from the response
                      from the server
        latitude   -> latitude of the user 
        longitude  -> longitude of the uder
DESCRIPTION
    It generates a page that consists of google maps, book details card and selected emails card.
    GoogleMapReact component is utlized for the google maps and LocationInfoBox and EmailInfoBox
    are utilized for book details and selected emails section respectively.
RETURNS
    Returns the Javascript XML for the page that displays the google maps and the location of the 
    books in the map.
*/
/**/
const SearchMaps = ({books, latitude, longitude}) => {
    // State and state handlers.
    const [locationInfo, setLocationInfo] = useState(null)
    const [selectedBook, setSelectedBook] = useState([])
    const [emails, setEmails] = useState([]);
    const sentId = useSelector((state)=> state.Mailsent);
    
    // Setting the list of markers.
    const markers = books.map((book, index) => {
        return <LocationMarker key={index} lat={book.latitude} lng={book.longitude} onClick={() => setLocationInfo(book)} />
    })
    
    // Retrieving the list of userIds.
    let listIds = []
    sentId.map((sent)=>{
        listIds = listIds.concat(sent)
    })
    
    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <div className="map">
                        
                        {/* Google map */}
                        <GoogleMapReact bootstrapURLKeys={{ key: process.env.GOOGLEAPIKEY}}
                        defaultCenter={ {lat:latitude, lng:longitude,} }
                        defaultZoom={13}
                        >
                            {markers}
                        </GoogleMapReact>
                    </div>
                </Col>
                <Col sm={4}>

                    {/* Book details and email list box. */}
                    {<LocationInfoBox listIds = {listIds} books = {books} locationInfo={locationInfo} emails = {emails} setEmails = {setEmails} setSelectedBook = {setSelectedBook} selectedBook = {selectedBook}/>}
                    {<EmailInfoBox setSelectedBook = {setSelectedBook} selectedBook = {selectedBook}/>}
                </Col>
            </Row>
        </Container>       
    )
};
// SearchMaps({books, latitude, longitude});



export default SearchMaps;
