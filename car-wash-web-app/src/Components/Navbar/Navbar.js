import React, {PureComponent} from 'react';
import {AppBar, Toolbar, IconButton, Typography, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {connect} from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import {toggleSidenav} from '../../Actions/Nav';

class Navbar extends PureComponent{
    render(){
        const theme = createMuiTheme({
            palette:{
                type: 'dark',
                primary: {
                    main: '#3F3F3F'
                }
            }
        });
        return(
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar position='fixed' color='primary'>
                        <Toolbar>
                            <span onClick={this.props.toggleSidenav}>
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                            </span>
                            <Typography variant='title'>
                                Car Wash App
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}
const mapStateToProps = state =>({
    showSidenav: state.sidenav.showSidenav
});
export default connect(mapStateToProps, {
    toggleSidenav
})(Navbar)