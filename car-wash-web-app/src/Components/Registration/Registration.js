import React, {PureComponent} from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControlLabel, Checkbox, Modal, CircularProgress, Snackbar} from '@material-ui/core'; 
import {connect} from 'react-redux';
import {
    userFormConfirmPasswordChanged,
    userFormEmailChanged,
    userFormFirstNameChanged,
    userFormLastNameChanged,
    userFormPasswordChanged,
    userFormPhoneChanged,
    userFormUsernameChanged,
    userRegisterAttempt,
    userRegisterFailure,
    userRegisterSuccess,
    togglePasswordVisibility
} from '../../Actions';
import { EMPTY_STR } from '../../constants';
class Registration extends PureComponent{
    onUsernameChanged(e){
        this.props.userFormUsernameChanged(e.target.value);
    }
    onPhoneChanged(e){
        this.props.userFormPhoneChanged(e.target.value);
    }
    onEmailChanged(e){
        this.props.userFormEmailChanged(e.target.value);
    }
    onFirstNameChanged(e){
        this.props.userFormFirstNameChanged(e.target.value);
    }
    onLastNameChanged(e){
        this.props.userFormLastNameChanged(e.target.value);
    }
    onPasswordChanged(e){
        this.props.userFormPasswordChanged(e.target.value);
    }
    onConfirmPasswordChanged(e){
        this.props.userFormConfirmPasswordChanged(e.target.value);
    }
    onTogglePasswordVisibility(e){
        this.props.togglePasswordVisibility(!this.props.showPassword);
    }
    onFormSubmit(e){
        e.preventDefault();
        let data = {
            email: this.props.email,
            username: this.props.username,
            phone: this.props.phone,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            password: this.props.password,
            confirmPassword: this.props.confirmPassword
        }
        this.props.userRegisterAttempt(data);
    }
    render(){
        return(
            <div>
                <Grid container 
                wrap='wrap'
                alignContent='center'
                alignItems='center'
                justify='center'
                direction='row'
                spacing={24}
                >
                    <Grid item xs={12} md={10}>
                        <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={this.props.errorExists}
                        ContentProps={{
                            'aria-describedby': 'status-message'
                        }}
                        message={<span id='status-message'>{this.props.statusMessage}</span>}
                        />
                        <Paper className='Padded-Paper Stylized-Form-Paper'>
                            <Grid container 
                            direction='row' 
                            alignContent='center' 
                            alignItems='center' 
                            justify='center' 
                            spacing={32} 
                            wrap='wrap'
                            component='form'
                            method='POST'>
                            <Modal open={this.props.attemptingRegistration} className='Stylized-Modal'>
                                <div>
                                    <Typography variant='title' align='center'>
                                        Registration In Progress
                                    </Typography>
                                    <Typography variant='subheading' align='center'>
                                        Please standby while we finish signing you up.
                                    </Typography>
                                    <CircularProgress size={100} align='center' />
                                </div>
                            </Modal>
                                <Grid item xs={12}>
                                    <Typography variant='display1' align='center' gutterBottom>
                                        Register
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant='title' align='center' paragraph={true}>
                                        Basic Info
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField type='email'
                                    id='email-input'
                                    required={true}
                                    label='Email'
                                    fullWidth
                                    align='center'
                                    value={this.props.email}
                                    error={this.props.emailErr !== EMPTY_STR && this.props.emailErr !== null && this.props.emailErr !== undefined}
                                    helperText={this.props.emailErr}
                                    onChange={this.onEmailChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id='phone-input'
                                    required={true}
                                    label='Phone Number'
                                    fullWidth
                                    align='center'
                                    value={this.props.phone}
                                    error={this.props.phoneErr !== EMPTY_STR && this.props.phoneErr !== null && this.props.phoneErr !== undefined}
                                    helperText={this.props.phoneErr}
                                    onChange={this.onPhoneChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id='first-name-input'
                                    required={true}
                                    label='First Name'
                                    fullWidth
                                    align='center'
                                    value={this.props.firstName}
                                    error={this.props.firstNameErr !== EMPTY_STR && this.props.firstNameErr !== null && this.props.firstNameErr !== undefined}
                                    helperText={this.props.firstNameErr}
                                    onChange={this.onFirstNameChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} md={5}>
                                    <TextField id='last-name-input'
                                    required={true}
                                    label='Last Name'
                                    fullWidth
                                    align='center'
                                    value={this.props.lastName}
                                    error={this.props.lastNameErr !== EMPTY_STR && this.props.lastNameErr !== null && this.props.lastNameErr !== undefined}
                                    helperText={this.props.lastNameErr}
                                    onChange={this.onLastNameChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant='title' align='center'>
                                        User Info
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <Typography gutterBottom variant='body1'>
                                        Thanks for your interest in joining this service! Whether your are an owner, employee, or just a normal user taking the leap towards registration will help you stay connected to car wash locations and people or services affiliated with them. Please adhere to the rules below when choosing your username and password. Enjoy!
                                    </Typography>
                                    <Typography gutterBottom variant='body1'>
                                        This will be used for your login. Please be sure to write down and save your password. Your username must not contain any spaces and must be a maximum of 64 characters and a minimum of 5 characters. Any whitespace you leave at the end of your entered username will be cut out. Your password must be between 8 and 160 characters in length.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <TextField id='username-input'
                                    required={true}
                                    label='Username'
                                    fullWidth
                                    align='center'
                                    value={this.props.username}
                                    error={this.props.usernameErr !== EMPTY_STR && this.props.usernameErr !== null && this.props.usernameErr !== undefined}
                                    helperText={this.props.usernameErr}
                                    onChange={this.onUsernameChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <TextField id='password-input'
                                    type={this.props.showPassword ? 'text' : 'password'}
                                    required={true}
                                    label='Password'
                                    fullWidth
                                    align='center'
                                    value={this.props.password}
                                    error={this.props.passwordErr !== EMPTY_STR && this.props.passwordErr !== null && this.props.passwordErr !== undefined}
                                    helperText={this.props.passwordErr}
                                    onChange={this.onPasswordChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <TextField id='confirm-password-input'
                                    type={this.props.showPassword ? 'text' : 'password'}
                                    required={true}
                                    label='Confirm Password'
                                    fullWidth
                                    align='center'
                                    value={this.props.confirmPassword}
                                    error={this.props.confirmPasswordErr !== EMPTY_STR && this.props.confirmPasswordErr && this.props.confirmPasswordErr !==undefined}
                                    helperText={this.props.confirmPasswordErr}
                                    onChange={this.onConfirmPasswordChanged.bind(this)}
                                    />
                                    {this.props.password !== this.props.confirmPassword && this.props.password !== EMPTY_STR && this.props.confirmPassword !== EMPTY_STR ? <Typography variant='caption' color='secondary'>Your passwords do not match.</Typography> : null}
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={this.props.showPassword}
                                                value='passwordVisibility'
                                                color='primary'
                                                onChange={this.onTogglePasswordVisibility.bind(this)}
                                            />
                                        }
                                        label='Show Password'
                                    />
                                </Grid>
                                <Grid container direction='column' alignContent='center' alignItems='center' justify='center'>
                                    <Grid item xs={12}>
                                    <span onClick={this.onFormSubmit.bind(this)}>
                                        <Button variant='contained' 
                                        color='primary' 
                                        type='submit'
                                        value='Submit' 
                                        disabled={this.props.password===EMPTY_STR || this.props.username === EMPTY_STR || this.props.email === EMPTY_STR || this.props.firstName === EMPTY_STR || this.props.lastName === EMPTY_STR || this.props.confirmPassword === EMPTY_STR || this.props.phone === EMPTY_STR || this.props.attemptingRegistration}>
                                            Submit
                                        </Button>
                                        {this.props.password===EMPTY_STR || this.props.username === EMPTY_STR || this.props.email === EMPTY_STR || this.props.firstName === EMPTY_STR || this.props.lastName === EMPTY_STR || this.props.confirmPassword === EMPTY_STR || this.props.phone === EMPTY_STR ? <Typography variant='caption' color='secondary'>You must fill out all required fields.</Typography> : null}
                                    </span>
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
const mapStateToProps = state=>({
    username: state.user.username,
    email: state.user.email,
    phone: state.user.phone,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    password: state.user.password,
    confirmPassword: state.user.confirmPassword,
    errorExists: state.user.errorExists,
    usernameErr: state.user.usernameErr,
    phoneErr: state.user.phoneErr,
    emailErr: state.user.emailErr,
    firstNameErr: state.user.firstNameErr,
    lastNameErr: state.user.lastNameErr,
    passwordErr: state.user.passwordErr,
    confirmPasswordErr: state.user.confirmPasswordErr,
    statusMessage: state.user.statusMessage,
    attemptingRegistration: state.user.attemptingRegistration,
    showPassword: state.user.showPassword
});
export default connect(mapStateToProps, {
    userFormConfirmPasswordChanged,
    userFormEmailChanged,
    userFormFirstNameChanged,
    userFormLastNameChanged,
    userFormPasswordChanged,
    userFormPhoneChanged,
    userFormUsernameChanged,
    userRegisterAttempt,
    userRegisterFailure,
    userRegisterSuccess,
    togglePasswordVisibility
})(Registration);