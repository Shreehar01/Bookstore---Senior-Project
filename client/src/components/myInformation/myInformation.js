import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import InfoForm from './infoForm';
import Navbar from '../common/navbar';
import Footer from '../common/footer';



/**/
/*
MyInformation()
NAME
    MyInformation - Generates and returns the Javascript XML for personal information page.
SYNOPSIS
    MyInformation(); 
        No props passed.
DESCRIPTION
    It allows users to update their personal information such as email, password, etc. If the user has 
    not signed in but manually reached this location, the page will be redirected to the authentication
    page.    
RETURNS
    Returns the Javascript XML for the personal information page in the application.
*/
/**/
const MyInformation = () => {
    
    // State and redux objects.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    
    // Function for going back to homepage.
    const goToHomepage = () =>{
        history.push('/')
    }

    // Personal Information Page.
    return (
        <div>
            <Navbar />
            {!user && goToHomepage()}
            <InfoForm user = {user} />
            <Footer />
        </div>
    )
};
// MyInformation();



export default MyInformation;
