import React,{Component} from 'react';
import {Grid, Paper, withStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
const styles = ({
    colorPrimary: {
        color: 'black',
    },
    bannerRow:{
        minHeight: '100vh',
        backgroundImage: `url(${require('./Assets/carwash-main-banner.jpg')})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    primaryColor: {
        color: 'black'
    },
});
const home = (props)=>(
    <div>
        <Grid 
        container 
        direction='row'
        wrap='wrap'
        justify='center'
        alignItems='stretch'
        alignContent='center'
        style={styles.bannerRow}
        >
            <Grid
            container
            direction='column'
            justify='center'
            alignContent='stretch'
            alignItems='stretch'
            style={{background: 'linear-gradient(45deg, rgba(255,171,0,0.5), rgba(230,0,255,0.5))'}}
            >
                <Typography
                variant='display4'
                gutterBottom
                align='center'
                style={{
                    color: 'white',

                }}
                >
                    Car Wash App
                </Typography>
            </Grid>
        </Grid>
        <div>
            <Grid container 
            spacing={24} 
            direction='row'
            justify='center'
            alignContent='center'
            alignItems='center'
            >
                <Grid item xs={12}>
                    <Paper>Paper object</Paper>
                </Grid>
            </Grid>
        </div>
    </div>
);
export default withStyles(styles)(home);