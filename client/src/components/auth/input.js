import React from 'react';
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



/**/
/*
Input()
NAME
    Input - Generates and returns the Javascript XML for the customized input box.
SYNOPSIS
    Input({name, label, half, autoFocus, type, handleShowPassword, handleChange}); 
        name -> name of the input box.
        label -> label for the input box.
        half -> parameter that marks if an input box must be displayed in full or half of its size.
        autoFocus -> parameter that selects the input box to be auto-focused.
        type -> type of the input box
        handleShowPassword -> event handler for toggling between hiding and showing password.
        handleChange -> event handler for recording changed in the input box.
DESCRIPTION
    It utilizes react-bootstrap input box and returns the customized inputbox that fits to
    different types of input including username, password, and email.     
RETURNS
    Returns the Javascript XML for a generic input box to fit for different types of inputs used.
*/
/**/
const Input = ({name, label, half, autoFocus, type, handleShowPassword, handleChange}) => {
    return (
        // Custom responsive input box for forms.
        <Grid item xs = {12} sm = {half ? 6 : 12}>
            <TextField 
                name = {name}
                onChange = {handleChange}
                variant = "outlined"
                required
                fullWidth 
                label = {label}
                autoFocus = {autoFocus}
                type = {type}
                InputProps = {name === "password" ? {
                    // Show/Hide feature for the password input box.
                    endAdornment : (
                        <InputAdornment position = "end">
                            <IconButton onClick = {handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
};
// Input({name, label, half, autoFocus, type, handleShowPassword, handleChange});



export default Input
