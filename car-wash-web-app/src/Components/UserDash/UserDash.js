import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Paper, Typography} from '@material-ui/core';
import {
    fetchMyUserInfoAttempt,
    fetchMyUserInfoFailure,
    fetchMyUserInfoSuccess
} from '../../Actions';

//this class will be the page that draws user account information
class UserDash extends Component{
    constructor(props){
        super(props);
        this.props.fetchMyUserInfoAttempt(true);
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
                    <Grid item xs={12} sm={10}>
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
                                    <hr />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='subheading' align='center' gutterBottom>
                                        {this.props.username}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body1' align='center' gutterBottom>
                                        {this.props.firstName} {this.props.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body1' align='center' gutterBottom>
                                        {this.props.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body1' align='center' gutterBottom>
                                        {this.props.phone}
                                    </Typography>
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
    email: state.userInfo.userDataEmail,
    username: state.userInfo.userDataUsername,
    firstName: state.userInfo.userDataFirstName,
    lastName: state.userInfo.userDataLastName,
    phone: state.userInfo.userDataPhone
});
export default connect(mapStateToProps, {
    fetchMyUserInfoAttempt,
    fetchMyUserInfoFailure,
    fetchMyUserInfoSuccess
})(UserDash);