import React,{Component} from 'react';
import "./Home.css";
import {Grid, Paper, withStyles, Typography} from '@material-ui/core';
import Parallax from '../../Commons/Parallax/Parallax';
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
        <div className="home-content">
            <Grid container 
            spacing={24} 
            direction='row'
            justify='center'
            alignContent='center'
            alignItems='center'
            >
                <Grid item xs={12} lg={6}>
                    <Paper elevation={4} className='stylized-paper'>
                        <h2 className='centered-text'>What is This?</h2>
                        <Typography variant='subheading' gutterBottom align='left'>
                            This car wash application and network is designed to help to simplify the operations at any car wash that wishes to use the services provided. These services include: transactions, setting up menus, registering locations, and registering employees. The main aim of this site and app is to provide an easy to use system for anyone, even those that are not very tech savy as there is minimal set up required.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper elevation={4} className='stylized-paper'>
                        <h2 className='centered-text'>How is it Useful?</h2>
                        <Typography variant='subheading' gutterBottom algin='left'>
                            This is useful because just about every business, organization, and even individuals have an online presence in order to push their brand and business further. Creating an online presence allows you to reach new customers and connect with the ever expanding network of people that are connected online. The services provided here will helo you launch your business into the modern age in a very easy manner.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container
            spacing={24}
            direction='row'
            justify='center'
            alignContent='center'
            alignItems='center'
            wrap='wrap'
            >
                <Grid item xs={12}>
                    <Grid container wrap='wrap'
                    direction='column'
                    spacing={24}
                    justify='center'
                    alignContent='stretch'
                    alignItems='stretch'
                    >
                        <Parallax image={require('./Assets/carwash2.jpg')} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </div>
);
export default withStyles(styles)(home);