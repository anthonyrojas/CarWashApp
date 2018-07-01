import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Grid, 
    Paper, 
    Typography, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    DialogContentText, 
    Button, 
    createMuiTheme, 
    MuiThemeProvider, 
    colors, 
    TextField,
    Snackbar
}from '@material-ui/core';
import {
    fetchMyUserInfoAttempt,
    fetchMyUserInfoFailure,
    fetchMyUserInfoSuccess,
    toggleEditAccountInfo,
    accountEmailChanged,
    accountFirstNameChanged,
    accountLastNameChanged,
    accountPhoneChanged,
    updateAccountInfoAttempt,
    updateAccountInfoFailure,
    updateAccountInfoSuccess,
    resetAccountStatusMessage
} from '../../Actions';
import { EMPTY_STR } from '../../constants';

const btnTheme = createMuiTheme({
    palette:{
        primary: colors.green,
        type: 'dark'
    }
});

//this class will be the page that draws user account information
class UserDash extends Component{
    constructor(props){
        super(props);
        this.props.fetchMyUserInfoAttempt(true);
    }
    onEditableFirstNameChanged(e){
        this.props.accountFirstNameChanged(e.target.value);
    }
    onEditableLastNameChanged(e){
        this.props.accountLastNameChanged(e.target.value);
    }
    onEditableEmailChanged(e){
        this.props.accountEmailChanged(e.target.value);
    }
    onEditablePhoneChanged(e){
        this.props.accountPhoneChanged(e.target.value);
    }
    onToggleUserForm(e){
        this.props.toggleEditAccountInfo(!this.props.userDataEditable);
    }
    onUserFormSubmit(e){
        e.preventDefault();
        let data = {
            firstName: this.props.editableFirstName,
            lastName: this.props.editableLastName,
            email: this.props.editableEmail,
            phone: this.props.editablePhone
        }
        this.props.updateAccountInfoAttempt(data);
    }
    onCloseSnackbar(e){
        this.props.resetAccountStatusMessage(EMPTY_STR);
    }
    render(){
        return(
            <div>
                <Grid container
                direction='row'
                wrap='wrap'
                justify='center'
                alignItems='center'
                alignContent='center'
                >
                    <Dialog open={this.props.userDataEditable}
                    onClose={this.onToggleUserForm.bind(this)}>
                        <DialogTitle id='user-form-dialog-title'>Edit Your Account Info</DialogTitle>
                        <form method='POST'>
                        <DialogContent>
                            <DialogContentText>Update your account information below and save it.</DialogContentText>
                            <br/>
                            <TextField label='Email' required 
                            value={this.props.editableEmail} 
                            disabled={this.props.attemptingAccountInfoUpdate}
                            type='email' fullWidth 
                            onChange={this.onEditableEmailChanged.bind(this)}
                            helperText={this.props.editableEmailErr}
                            error={this.props.editableEmailErr !== EMPTY_STR && this.props.editableEmailErr !== null && this.props.editableEmailErr !== undefined}
                            />
                            <br/><br/>
                            <TextField label='First Name' required 
                            value={this.props.editableFirstName} 
                            fullWidth
                            onChange={this.onEditableFirstNameChanged.bind(this)}
                            helperText={this.props.editableFirstNameErr}
                            error={this.props.editableFirstNameErr !== EMPTY_STR && this.props.editableFirstNameErr !== null && this.props.editableFirstNameErr !== undefined}
                            disabled={this.props.attemptingAccountInfoUpdate}
                            />
                            <br/><br/>
                            <TextField label='Last Name' required 
                            value={this.props.editableLastName} 
                            disabled={this.props.attemptingAccountInfoUpdate}
                            fullWidth 
                            onChange={this.onEditableLastNameChanged.bind(this)}
                            helperText={this.props.editableLastNameErr}
                            error={this.props.editableLastNameErr !== EMPTY_STR && this.props.editableLastNameErr !== null && this.props.editableLastNameErr !== undefined}
                            />
                            <br/><br/>
                            <TextField label='Phone' required 
                            value={this.props.editablePhone} 
                            disabled={this.props.attemptingAccountInfoUpdate}
                            fullWidth 
                            onChange={this.onEditablePhoneChanged.bind(this)}
                            helperText={this.props.editablePhoneErr}
                            error={this.props.editablePhoneErr !== EMPTY_STR && this.props.editablePhoneErr !== null && this.props.editablePhoneErr !== undefined}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.onToggleUserForm.bind(this)}>Cancel</Button>
                            <Button color='primary' type='submit' onClick={this.onUserFormSubmit.bind(this)}>Update</Button>
                        </DialogActions>
                        </form>
                    </Dialog>
                    <Grid item xs={12} sm={10}>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={this.props.statusMessage !== '' && this.props.statusMessage !== null}
                            autoHideDuration={4000}
                            onClose={this.onCloseSnackbar.bind(this)}
                            ContentProps={{
                                'aria-describedby': 'status-message'
                            }}
                            message={<span id='status-message'>{this.props.statusMessage}</span>}
                        />
                        <Paper className='Padded-Paper Stylized-User-Paper'>
                            <Grid container 
                            direction='row'
                            alignContent='center' 
                            alignItems='center' 
                            justify='center' 
                            spacing={32} 
                            wrap='wrap'>
                                <Grid item xs={12}>
                                    <Typography variant='display1' align='center' gutterBottom>
                                        User Account Information
                                    </Typography>
                                    <hr className='hr-white-b' />
                                </Grid>
                                <Grid item xs={12} sm={10} md={8}>
                                    <Typography variant='subheading' className='white-text'>
                                        Welcome back valued user! From here you can view your account information and update or change it (with the exception of your username). Any changes you make here will be reflected across every page, transaction, location, etc. that you are associated with or have done business with.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className='Padded-Paper' elevation={8}>
                                        <Typography variant='title' align='center' gutterBottom>
                                            Username: {this.props.username}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className='Padded-Paper' elevation={8}>
                                    <Typography variant='subheading' align='center' gutterBottom>
                                        First Name: {this.props.firstName}
                                    </Typography>
                                    <Typography variant='subheading' align='center' gutterBottom>
                                        Last Name: {this.props.lastName}
                                    </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className='Padded-Paper' elevation={8}>
                                    <Typography variant='subheading' align='center' gutterBottom>
                                        Email: {this.props.email}
                                    </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className='Padded-Paper' elevation={8}>
                                    <Typography variant='subheading' align='center' gutterBottom>
                                        Phone Number: {this.props.phone}
                                    </Typography>
                                    </Paper>
                                </Grid>
                                <MuiThemeProvider theme={btnTheme}>
                                    <Grid container direction='row' justify='center' alignContent='center' alignItems='center' className='white-text Padded-Vertical-1'>
                                        <span onClick={this.onToggleUserForm.bind(this)}>
                                            <Button variant='contained' color='primary'>Edit Info</Button>
                                        </span>
                                    </Grid>
                                </MuiThemeProvider>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state=>({
    email: state.userInfo.userDataEmail,
    username: state.userInfo.userDataUsername,
    firstName: state.userInfo.userDataFirstName,
    lastName: state.userInfo.userDataLastName,
    phone: state.userInfo.userDataPhone,
    statusMessage: state.userInfo.statusMessage,
    fetchMyUserErrMsg: state.userInfo.fetchMyUserErrMsg,
    userDataEditable: state.userInfo.userDataEditable,
    editableEmail: state.userInfo.editableEmail,
    editablePhone: state.userInfo.editablePhone,
    editableFirstName: state.userInfo.editableFirstName,
    editableLastName: state.userInfo.editableLastName,
    editableEmailErr: state.userInfo.editableEmailErr,
    editablePhoneErr: state.userInfo.editablePhoneErr,
    editableFirstNameErr: state.userInfo.editableFirstNameErr,
    editableLastNameErr: state.userInfo.editableLastNameErr,
    attemptingAccountInfoUpdate: state.userInfo.attemptingAccountInfoUpdate
});
export default connect(mapStateToProps, {
    fetchMyUserInfoAttempt,
    fetchMyUserInfoFailure,
    fetchMyUserInfoSuccess,
    toggleEditAccountInfo,
    accountEmailChanged,
    accountFirstNameChanged,
    accountLastNameChanged,
    accountPhoneChanged,
    updateAccountInfoAttempt,
    updateAccountInfoSuccess,
    updateAccountInfoFailure,
    resetAccountStatusMessage
})(UserDash);