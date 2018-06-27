import React,{PureComponent} from 'react';
import {Grid, Typography, Paper, Button, TextField, Modal, FormControlLabel, Checkbox} from '@material-ui/core';
import {connect} from 'react-redux';
import {
    userFormUsernameChanged,
    userFormPasswordChanged,
    userLoginAttempt,
    userLoginFailure,
    userLoginSuccess,
    togglePasswordVisibility
} from '../../Actions';
import {EMPTY_STR} from '../../constants';

class Login extends PureComponent{
    onUsernameChanged(e){
        this.props.userFormUsernameChanged(e.target.value);
    }
    onPasswordChanged(e){
        this.props.userFormPasswordChanged(e.target.value);
    }
    onTogglePasswordVisibility(e){
        this.props.togglePasswordVisibility(!this.props.showPassword);
    }
    onLoginFormSubmit(e){
        e.preventDefault();
        let data={}
    }
    render(){
        return(
            <div>
                <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
                wrap='wrap'
                spacing={24}
                >
                <Grid item xs={12} sm={10}>
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
                            <Grid item xs={12} className='black-text'>
                                <Typography variant='display1' align='center' gutterBottom>Login</Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Typography variant='subheading' align='left' gutterBottom>
                                    Welcome! If you already have an account, then sign in below with the username and password you selected. If you have not registered yet, then feel free to do so: <a href='/register'>Register</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField id='username-input'
                                label='Username'
                                required={true}
                                value={this.props.username}
                                onChange={this.onUsernameChanged.bind(this)}
                                disabled={this.props.attemptingLogin}
                                fullWidth
                                helperText={this.props.usernameErr}
                                error={this.props.usernameErr !== EMPTY_STR && this.props.usernameErr !== null && this.props.usernameErr !== undefined}
                                />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField id='password-input'
                                label='Password'
                                type={this.props.showPassword ? 'text' : 'password'}
                                required
                                value={this.props.password}
                                onChange={this.onPasswordChanged.bind(this)}
                                disabled={this.props.attemptingLogin}
                                fullWidth
                                helperText={this.props.passwordErr}
                                error={this.props.passwordErr !== EMPTY_STR && this.props.passwordErr !== null && this.props.passwordErr !== undefined}
                                />
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
                            <Grid container direction='column' alignContent='center' justify='center' alignItems='center'>
                                <Grid item xs={12}>
                                    <span>
                                        <Button variant='contained'
                                        color='primary'
                                        type='submit'
                                        value='Submit'
                                        disabled={this.props.attemptingLogin || this.props.username === EMPTY_STR || this.props.password === EMPTY_STR}>
                                            Login
                                        </Button>
                                    </span>
                                    <br/>
                                    {this.props.username === EMPTY_STR || this.props.password === EMPTY_STR ?
                                            <Typography variant='caption' color='secondary'>
                                                You must fill out all required fields.
                                            </Typography>
                                            : null
                                    }
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
    username: state.user.username,
    password: state.user.password,
    usernameErr: state.user.usernameErr,
    passwordErr: state.user.passwordErr,
    attemptingLogin: state.user.attemptingLogin,
    statusMessage: state.user.statusMessage,
    errorExists: state.user.errorExists,
    showPassword: state.user.showPassword
});
export default connect(mapStateToProps,{
    userFormUsernameChanged,
    userFormPasswordChanged,
    userLoginAttempt,
    userLoginFailure,
    userLoginSuccess,
    togglePasswordVisibility
})(Login);