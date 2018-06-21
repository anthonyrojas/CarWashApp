import React from 'react';
import "./Home.css";
import {Grid, Paper, withStyles, Typography, SvgIcon} from '@material-ui/core';
import {Build, TrendingUp, SupervisorAccount} from '@material-ui/icons';
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
            <Grid container
            spacing={24}
            direction='row'
            justify='center'
            alignContent='center'
            alignItems='center'
            wrap='wrap'
            >
                <Grid item xs={12} md={10} lg={4}>
                    <Paper elevation={8} className='stylized-paper'>
                    <Typography align='center' gutterBottom><SvgIcon color='primary' className='circle-icon-md' style={{fontSize: '4em'}}><Build /></SvgIcon></Typography>
                    <Typography align='center' variant='title' gutterBottom>Services</Typography>
                    <Typography align='left' variant='subheading'>
                    The services provided by this network and app are transactions, order management, and helping your clients be more connected. The transactions are powered by Stripe, which is a service that allows any business to take payments online.
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={10} lg={4}>
                    <Paper elevation={8} className='stylized-paper'>
                    <Typography align='center' gutterBottom><SvgIcon color='primary' className='circle-icon-md' style={{fontSize: '4em'}}><SupervisorAccount /></SvgIcon></Typography>
                    <Typography align='center' variant='title' gutterBottom>Join Today</Typography>
                    <Typography align='left' variant='subheading' gutterBottom>
                    Joining is very easy! All you have to do is sign up for a Stripe account on the official website <a href="https://dashboard.stripe.com/register">here</a>. They will ask you to enter your payment/account info that you will like to use for your car wash. Then just complete the sign up on this site and you're all set to go!
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={10} lg={4}>
                    <Paper elevation={8} className='stylized-paper'>
                    <Typography align='center' gutterBottom><SvgIcon color='primary' className='circle-icon-md' style={{fontSize: '4em'}}><TrendingUp /></SvgIcon></Typography>
                    <Typography align='center' variant='title' gutterBottom>Improve Your Business</Typography>
                    <Typography align='left' variant='subheading' gutterBottom>
                    An online presence today is absolutely necessary to become prominent in all markets. The car was business is no different. Signing up here will allow you to expand your business without the need to hire a software developer, thus bringing in more profits than losses.
                    </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </div>
);
export default withStyles(styles)(home);