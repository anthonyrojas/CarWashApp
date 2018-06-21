import React, {PureComponent} from 'react';
import {Input, TextField, InputLabel, Button, Grid, Typography, Paper} from '@material-ui/core'; 
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
        userFormUsernameChanged(e.target.value);
    }
    onPhoneChanged(e){
        userFormPhoneChanged(e.target.value);
    }
    onEmailChanged(e){
        userFormEmailChanged(e.target.value);
    }
    onFirstNameChanged(e){
        userFormFirstNameChanged(e.target.value);
    }
    onLastNameChanged(e){
        userFormLastNameChanged(e.target.value);
    }
    onPasswordChanged(e){
        userFormPasswordChanged(e.target.value);
    }
    onConfirmPasswordChanged(e){
        userFormConfirmPasswordChanged(e.target.value);
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
                                    type='password'
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
                                    type='password'
                                    required={true}
                                    label='Confirm Password'
                                    fullWidth
                                    align='center'
                                    value={this.props.confirmPassword}
                                    error={this.props.confirmPasswordErr !== EMPTY_STR && this.props.confirmPasswordErr && this.props.confirmPasswordErr !==undefined}
                                    helperText={this.props.confirmPasswordErr}
                                    onChange={this.onConfirmPasswordChanged.bind(this)}
                                    />
                                </Grid>
                                <Grid container direction='column' alignContent='center' alignItems='center' justify='center'>
                                    <Grid item xs={12}>
                                    <span><Button variant='contained' color='primary' type='submit' value='Submit'>Submit</Button></span>
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
export default connect(mapStateToProps,{
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