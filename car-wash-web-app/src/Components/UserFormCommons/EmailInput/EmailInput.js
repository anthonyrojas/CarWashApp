import React,{PureComponent} from 'react';
import {TextField} from '@material-ui/core';
import {connect} from 'react-redux';
class EmailInput extends PureComponent{
    render(){
        return(
            <div>
                <TextField 
                name="EmailUserInput"
                placeholder="Email"
                />
            </div>
        );
    }
}
export default EmailInput;