import { Card, Button, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';



/**/
/*
LocationInfoBox()
NAME
    LocationInfoBox - Generates and returns the Javascript XML for the card consisting of 
                      the detail of the recently selected book.
SYNOPSIS
    LocationInfoBox({listIds, locationInfo, selectedBook, setSelectedBook}); 
        listIds         -> list of book ids that are already selected.
        locationInfo    -> detailed information of the currently selected book through map.
        selectedBook    -> id of currently selected book.
        setSelectedBook -> state handler to change currently selected book.
DESCRIPTION
    It generates a card component that is displayed on the search-by-map page to display the
    detailed information of the book that is recently selected by clicking on the marker on the
    map.
RETURNS
    Returns the Javascript XML for the card consisting of the detailed information of the book
    selected from the map.
*/
/**/
const LocationInfoBox = ({listIds, locationInfo, selectedBook, setSelectedBook}) => {  
  return (
      <div>
        <Card bg={'light'} text={'dark'} style={{ width: '18rem' }} className="mb-2">
          
          {/* Card to display the details of a selected boko */}
          <Card.Header>Book Information</Card.Header>
          {!locationInfo ?
            <Card.Body>
                Please select the book from the map to view its information.
            </Card.Body> :
            <Card.Body>
              Book Name: {locationInfo.name} <br /> 
              Author: {locationInfo.author} <br />
              Condition: {locationInfo.condition} <br />
              Notes: {locationInfo.notes} <br />
              Exam Materials: {locationInfo.exam} <br />
              <Dropdown.Divider/>
              Provider:{locationInfo.provider}  <br />
              College: {locationInfo.college} <br /> 
              <br />
              {selectedBook?.indexOf(locationInfo) == -1 && !listIds.includes(locationInfo._id)  ? 
              <Button onClick = {() => {setSelectedBook([...selectedBook, locationInfo])}} variant="outline-primary">
                Add Email
            </Button>
          : 

            // For preventing users from sending multiple emails to the same person.     
              <span>
                <Button onClick = {() => {setSelectedBook([...selectedBook, locationInfo])}} variant="outline-primary" disabled>
                  Add Email
                </Button>
              </span>
          }
          </Card.Body>  
          }
        </Card>
      </div>
    )
};
// LocationInfoBox({listIds, locationInfo, selectedBook, setSelectedBook});

export default LocationInfoBox;
