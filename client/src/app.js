import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Auth from './components/auth/auth';
import Homepage from './components/homePage/homePage';
import MyRequest from './components/myRequests/myRequest';
import MyBooks from './components/myBooks/myBooks';
import MyInformation from './components/myInformation/myInformation';
import Web from './components/web/web';



/**/
/*
App()   
NAME
    App - Generates and returns the Javascript XML for the different routes in the application.
SYNOPSIS
    App(); 
        No props passed.
DESCRIPTION
    It serves as the entry point to the application by showing different features of the application
    based on the route user is at.   
RETURNS
    Returns the Javascript XML for different routes in the application.
*/
/**/
const App = () => (
    <>
        <BrowserRouter>

        {/* List of possible routes */}
            <Switch>
            <Route path = "/" exact component = {Auth} />
            <Route path = "/homepage" exact component = {Homepage} />
            <Route path = "/myrequests" exact component = {MyRequest} />
            <Route path = "/mybooks" exact component = {MyBooks} />
            <Route path = "/web" exact component = {Web} />
            <Route path = "/myinformation" exact component = {MyInformation} />
            </Switch>

            
        </BrowserRouter>
    </>
);
// App();



export default App;