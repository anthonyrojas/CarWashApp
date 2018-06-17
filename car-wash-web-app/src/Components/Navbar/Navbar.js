import React, {PureComponent} from 'react';
import {AppBar, Toolbar, IconButton, Typography, MuiThemeProvider, createMuiTheme, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {connect} from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';

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
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
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
export default Navbar;