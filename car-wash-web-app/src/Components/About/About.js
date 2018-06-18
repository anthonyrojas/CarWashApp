import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {Grid, Paper, withStyles, Typography, TextField, Button} from '@material-ui/core';
import {
    contactFormEmailChanged,
    contactFormFirstNameChanged,
    contactFormLastNameChanged,
    contactFormMessageChanged,
    contactFormSubjectChanged
} from '../../Actions';
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
class About extends PureComponent{
    onEmailChanged(e){
        this.props.contactFormEmailChanged(e.target.value);
    }
    onFirstNameChanged(e){
        this.props.contactFormFirstNameChanged(e.target.value);
    }
    onLastNameChanged(e){
        this.props.contactFormLastNameChanged(e.target.value);
    }
    onEmailSubjectChanged(e){
        this.props.contactFormSubjectChanged(e.target.value);
    }
    onEmailMessageChanged(e){
        this.props.contactFormMessageChanged(e.target.value);
    }
    onContactFormSubmit(e){
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <Grid container
                direction='row'
                wrap='wrap'
                justify='center'
                alignContent='center'
                alignItems='stretch'
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
                <Grid container
                wrap='wrap'
                direction='row'
                justify='center'
                alignContent='center'
                alignItems='center'
                spacing={24}
                >
                    <Grid item xs={12} lg={10}>
                        <Paper className='Padded-Paper'>
                            <Grid container direction='row' justify='center' alignContent='center' alignItems='center' component='form' method='POST' spacing={32}>
                                <Grid item xs={12}><Typography variant='title' align='center'>Contact Us</Typography></Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id='email-input' 
                                    label='Email'
                                    type='email'
                                    margin='normal'
                                    required={true}
                                    fullWidth
                                    align='center'
                                    value={this.props.email}
                                    onChange={this.onEmailChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id="subject-input"
                                    label='Email Subject'
                                    margin='dense'
                                    required={true}
                                    fullWidth
                                    align='center'
                                    value={this.props.subject}
                                    onChange={this.onEmailSubjectChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id='firstName-input'
                                    label='First Name'
                                    margin='dense'
                                    required={true}
                                    fullWidth
                                    align='center'
                                    value={this.props.firstName}
                                    onChange={this.onFirstNameChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id='lastName-input'
                                    label='Last Name'
                                    margin='dense'
                                    required={true}
                                    fullWidth
                                    align='center'
                                    value={this.props.lastName}
                                    onChange={this.onLastNameChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <TextField id='email-message-input'
                                    label='Email Message'
                                    margin='dense'
                                    required={true}
                                    fullWidth
                                    align='center'
                                    multiline={true}
                                    value={this.props.emailMessage}
                                    onChange={this.onEmailMessageChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid container direction='column' alignContent='center' alignItems='center' justify='center'>
                                    <Grid item xs={12}>
                                    <span onClick={this.onContactFormSubmit.bind(this)}><Button variant='contained' color='primary' type='submit' value='Submit'>Submit</Button></span>
                                    <br/><br/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state =>({
    email: state.contact.email,
    firstName: state.contact.firstName,
    lastName: state.contact.lastName,
    subject: state.contact.subject,
    emailMessage: state.contact.emailMessage
});
export default connect(mapStateToProps, {
    contactFormEmailChanged,
    contactFormFirstNameChanged,
    contactFormLastNameChanged,
    contactFormSubjectChanged,
    contactFormMessageChanged
})(About);