import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
const errorPage = (props)=>(
    <div>
        <Grid container
        wrap='wrap'
        direction='row'
        justify='center'
        alignContent='center'
        alignItems='center'
        spacing={24}
        >
            <Grid item xs={12} md={10}>
                <Paper className='Padded-Paper'>
                    <Typography variant='display4' align='center'>Error</Typography>
                    <Typography variant='subheading' align='center'>Page you were looking for was not found.</Typography>
                </Paper>
            </Grid>
        </Grid>
    </div>
);
export default errorPage