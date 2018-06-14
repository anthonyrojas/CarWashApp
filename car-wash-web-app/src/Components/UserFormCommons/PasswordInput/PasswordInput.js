import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {TextField} from '@material-ui/core';
class PasswordInput extends PureComponent{
    render(){
        return(
            <div>
                <TextField
                name="passwordUserInput"
                type="password"
                label="Password" 
                />
            </div>
        );
    }
}
export default PasswordInput;