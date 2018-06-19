import React from 'react';
import {Grid, Typography} from '@material-ui/core';
const styles = ({
    colorPrimary: {
        color: 'black',
    },
    bannerRow:{
        minHeight: '100vh',
        backgroundImage: `url(${require('../../Assets/carwash-main-banner.jpg')})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    primaryColor: {
        color: 'black'
    },
});
const mainBanner = (props)=>(
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
);
export default mainBanner;