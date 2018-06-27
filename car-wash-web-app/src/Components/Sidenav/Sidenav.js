import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {toggleSidenav} from '../../Actions';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from '../Home/Home'; 
import About from '../About/About';

class Sidenav extends PureComponent{
    render(){
        return(
            <div>
                <Drawer open={this.props.showSidenav} onClose={this.props.toggleSidenav}>
                    <List>
                        <Link to='/' className='route-link' onClick={this.props.toggleSidenav}>
                            <ListItem button>
                                <ListItemText primary='Home' />
                            </ListItem>
                        </Link>
                        <Link to='/register' className='route-link' onClick={this.props.toggleSidenav}>
                            <ListItem button>
                                <ListItemText primary='Register' />
                            </ListItem>
                        </Link>
                        <Link to='/login' className='route-link' onClick={this.props.toggleSidenav}>
                            <ListItem button>
                                <ListItemText primary='Login' />
                            </ListItem>
                        </Link>
                        <Link to='/about' className='route-link' onClick={this.props.toggleSidenav}>
                            <ListItem button>
                                <ListItemText primary='About' />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    showSidenav: state.sidenav.showSidenav
});

export default connect(mapStateToProps, {
    toggleSidenav
})(Sidenav);