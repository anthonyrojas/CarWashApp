import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {Grid, Paper, withStyles, Typography, TextField, Button, Snackbar} from '@material-ui/core';
import {
    contactFormEmailChanged,
    contactFormFirstNameChanged,
    contactFormLastNameChanged,
    contactFormMessageChanged,
    contactFormSubjectChanged,
    sendEmailAttempt,
    sendEmailSuccess,
    sendEmailFailure,
    resetEmailStatuses
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
        let data = {
            email: this.props.email,
            subject: this.props.subject,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            emailMessage: this.props.emailMessage
        }
        this.props.sendEmailAttempt(data);
    }
    closeNotification(e){
        this.props.resetEmailStatuses(false);
    }
    render(){
        return(
            <div>
                <Grid container
                wrap='wrap'
                direction='row'
                justify='center'
                alignContent='center'
                alignItems='center'
                spacing={24}
                >
                    <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={this.props.sendingEmailErr}
                    autoHideDuration={3000}
                    onClose={this.closeNotification.bind(this)}
                    ContentProps={{
                      'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Unable to send email!</span>}
                    />
                    <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={this.props.sendingEmailSuccess}
                    autoHideDuration={3000}
                    onClose={this.closeNotification.bind(this)}
                    ContentProps={{
                      'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Email successfully sent!</span>}
                    />
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
                                    helperText={this.props.emailErr}
                                    error={this.props.emailErr !== '' && this.props.emailErr !== undefined && this.props.emailErr !== null}
                                    disabled={this.props.sendingEmail}
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
                                    helperText={this.props.subjectErr}
                                    error={this.props.subjectErr !== '' && this.props.subjectErr !== undefined && this.props.subjectErr !== null}
                                    disabled={this.props.sendingEmail}
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
                                    helperText={this.props.firstNameErr}
                                    error={this.props.firstNameErr !== '' && this.props.firstNameErr !== undefined && this.props.firstNameErr !== null}
                                    disabled={this.props.sendingEmail}
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
                                    helperText={this.props.lastNameErr}
                                    error={this.props.lastNameErr !== '' && this.props.lastNameErr !== undefined && this.props.lastNameErr !== null}
                                    disabled={this.props.sendingEmail}
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
                                    helperText={this.props.emailMessageErr}
                                    error={this.props.emailMessageErr !== '' && this.props.emailMessageErr !== undefined && this.props.emailMessageErr !== null}
                                    disabled={this.props.sendingEmail}
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
    emailMessage: state.contact.emailMessage,
    sendingEmail: state.contact.sendingEmail,
    sendingEmailErr: state.contact.sendingEmailErr,
    sendingEmailSuccess: state.contact.sendingEmailSuccess,
    emailErr: state.contact.emailErr,
    firstNameErr: state.contact.firstNameErr,
    lastNameErr: state.contact.lastNameErr,
    subjectErr: state.contact.subjectErr,
    emailMessageErr: state.contact.emailMessageErr
});
export default connect(mapStateToProps, {
    contactFormEmailChanged,
    contactFormFirstNameChanged,
    contactFormLastNameChanged,
    contactFormSubjectChanged,
    contactFormMessageChanged,
    sendEmailAttempt,
    sendEmailSuccess,
    sendEmailFailure,
    resetEmailStatuses
})(About);