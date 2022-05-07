// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './styles.css';

// Reducer imports
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';

// Component import
import App from './app';

// Setting up the store
const store = createStore(reducers, compose(applyMiddleware(thunk)));
// console.log = console.warn = console.error = () => {};
// Rending the app component
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


