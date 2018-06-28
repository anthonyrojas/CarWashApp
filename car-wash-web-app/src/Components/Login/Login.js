import React,{PureComponent} from 'react';
import {Grid, Typography, Paper, Button, TextField, Modal, FormControlLabel, Checkbox, CircularProgress, Snackbar} from '@material-ui/core';
import {connect} from 'react-redux';
import {
    userFormUsernameChanged,
    userFormPasswordChanged,
    userLoginAttempt,
    userLoginFailure,
    userLoginSuccess,
    togglePasswordVisibility,
    resetStatusMessage,
    setUserAuthStatusMessage
} from '../../Actions';
import {EMPTY_STR} from '../../constants';

class Login extends PureComponent{
    componentWillMount(){
        let queryStr = this.props.location.search;
        if(queryStr.includes('login=required')){
            this.props.setUserAuthStatusMessage('Login required!');
        }
    }
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
        let data={
            username: this.props.username,
            password: this.props.password
        }
        this.props.userLoginAttempt(data);
    }
    onCloseSnackbar(e){
        this.props.resetStatusMessage(EMPTY_STR);
    }
    render(){
        return(
            <div>
                <Modal open={this.props.attemptingLogin}>
                    <div className='Stylized-Modal'>
                        <Typography variant='title' align='center'>
                            Signing In
                        </Typography>
                        <Typography variant='subheading' align='center'>
                            Please standby while we log you in.
                        </Typography>
                        <CircularProgress size={80} align='center' />
                    </div>
                </Modal>
                <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
                wrap='wrap'
                spacing={24}
                >
                <Grid item xs={12} sm={10}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={this.props.statusMessage !== '' && this.props.statusMessage !== null}
                        autoHideDuration={5000}
                        onClose={this.onCloseSnackbar.bind(this)}
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
                            <Grid item xs={12} className='black-text'>
                                <Typography variant='display1' align='center' gutterBottom>Login</Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Typography variant='subheading' align='left' gutterBottom>
                                    Welcome! If you already have an account, then sign in below with the username and password you selected. If you have not registered yet, then feel free to do so here: <a href='/register'>Register</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField id='username-input'
                                label='Username'
                                required={true}
                                value={this.props.username}
                                onChange={this.onUsernameChanged.bind(this)}
                                disabled={this.props.attemptingLogin === true}
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
                                disabled={this.props.attemptingLogin === true}
                                fullWidth
                                helperText={this.props.passwordErr}
                                error={this.props.passwordErr !== EMPTY_STR && this.props.passwordErr !== null && this.props.passwordErr !== undefined}
                                />
                            </Grid>
                            <Grid item xs={12} sm={10} md={8}>
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
                                    <span onClick={this.onLoginFormSubmit.bind(this)}>
                                        <Button variant='contained'
                                        color='primary'
                                        disabled={this.props.attemptingLogin === true || this.props.username === EMPTY_STR || this.props.password === EMPTY_STR}>
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
    showPassword: state.user.showPassword,
    isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps,{
    userFormUsernameChanged,
    userFormPasswordChanged,
    userLoginAttempt,
    userLoginFailure,
    userLoginSuccess,
    togglePasswordVisibility,
    resetStatusMessage,
    setUserAuthStatusMessage
})(Login);