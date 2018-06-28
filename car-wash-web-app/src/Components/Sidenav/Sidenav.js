import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {toggleSidenav} from '../../Actions';
import {Route, Link, Switch, Redirect, withRouter} from 'react-router-dom';
import Aux from '../../HOC/AuxHOC';
import {checkUserAuth} from '../../Actions';
import Cookies from 'universal-cookie';
import { EMPTY_STR } from '../../constants';

class Sidenav extends Component{
    componentDidUpdate(){
        var cookies = new Cookies();
        this.props.checkUserAuth(cookies.get('authentication') !== EMPTY_STR && cookies.get('authentication') !== undefined && cookies.get('authentication') !== null ? true : false);
    }
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
                        {
                            this.props.isAuthenticated ?
                            <Link to='/dashboard' className='route-link' onClick={this.props.toggleSidenav}>
                                <ListItem button>
                                    <ListItemText primary='Dashboard'/>
                                </ListItem>
                            </Link>
                            : 
                            <Aux>
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
                            </Aux>
                        }
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
    showSidenav: state.sidenav.showSidenav,
    isAuthenticated: state.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps, {
    toggleSidenav,
    checkUserAuth
})(Sidenav));