import React, {PureComponent} from 'react';
import {Input, TextField, InputLabel, Button, Grid} from '@material-ui/core'; 
import {connect} from 'react-redux';
class Registration extends PureComponent{
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