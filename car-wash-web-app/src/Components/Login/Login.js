import React,{PureComponent} from 'react';
import {Grid, Typography, Paper, Input, TextField} from '@material-ui/core';
import {connect} from 'react-redux';

class Login extends PureComponent{
    render(){
        return(
            <div>
                <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
                wrap='wrap'
                spacing={24}
                ></Grid>
            </div>
        );
    }
}