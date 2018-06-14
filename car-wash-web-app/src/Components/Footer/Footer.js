import React from 'react';
import {Grid} from '@material-ui/core';
import './Footer.css';

const footer = (props)=>(
    <div>
        <Grid container wrap='wrap' className='Footer' spacing={24} justify='center' alignContent='center' alignItems='center'>
            <Grid item xs={12} md={4}>
                This is completely expiremental at this time. If it is released into production, this is where the breif about information will go.
            </Grid>
            <Grid item xs={12} md={4}>
                &copy; Car Wash App
            </Grid>
            <Grid item xs={12} md={4}>
                This is where the SiteMap will go.
            </Grid>
        </Grid>
    </div>
);
export default footer;