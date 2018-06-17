import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {toggleSidenav} from '../../Actions';

class Sidenav extends PureComponent{
    render(){
        return(
            <div>
                <Drawer open={this.props.showSidenav}>
                    <List>
                        <ListItem button>
                            <ListItemText primary='Home' />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Login' />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='About' />
                        </ListItem>
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