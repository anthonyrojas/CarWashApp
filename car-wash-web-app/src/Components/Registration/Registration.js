import React, {PureComponent} from 'react';
import {Input, TextField, InputLabel, Button, Grid, Typography, Paper} from '@material-ui/core'; 
import {connect} from 'react-redux';
class Registration extends PureComponent{
    render(){
        return(
            <div>
                <Grid container 
                wrap='wrap'
                alignContent='center'
                alignItems='center'
                justify='center'
                direction='row'
                component='form'
                method='POST'
                spacing={24}
                >
                    <Grid item xs={12}>
                        <Typography variant='headline' align='center'>
                            Register
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={10} xl={8}>
                        <Paper className='padded-paper'>
                            hello world
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
} 
export default Registration;