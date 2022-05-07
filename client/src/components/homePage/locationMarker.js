import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";



/**/
/*
LocationMarker()
NAME
    LocationMarker - Generate and returns the marker for google maps.
SYNOPSIS
    LocationMarker({onClick}); 
        onClick -> event handler that selects the book upon clicking on the marker.
DESCRIPTION
    It generates a customized marker for each of the locations of the book found in the google
    maps.
RETURNS
    Returns the red location marker to be placed in the google maps.
*/
/**/
const LocationMarker = ({onClick}) => {
    let iconStyles = { color: "red", fontSize: "2.5em" };
    return (
        <div onClick={onClick}>
            <FaMapMarkerAlt style={iconStyles}/>
        </div>
    )
};
// LocationMarker({onClick});



export default LocationMarker;