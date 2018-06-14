import React, {Component} from 'react';
import {Input, TextField, InputLabel, Button} from '@material-ui/core'; 
import {connect} from 'react-redux';
class Registration extends Component{
    render(){
        return(
            <div>
                <form method="POST" autoComplete="off">
                    <TextField
                        label="Username"
                    />
                </form>
            </div>
        );
    }
} 
export default Registration;