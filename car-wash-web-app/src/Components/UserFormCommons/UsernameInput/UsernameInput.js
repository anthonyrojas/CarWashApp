import React, {PureComponent} from 'react';
import {TextField, Grid} from '@material-ui/core';
class UsernameInput extends PureComponent{
    render(){
        return(
            <div>
                <TextField 
                name="usernameUserInput"
                label="Username"
                />                
            </div>
        );
    }
}
export default UsernameInput;