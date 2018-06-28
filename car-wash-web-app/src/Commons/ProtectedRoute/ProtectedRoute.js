import React,{Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUserAuthStatusMessage} from '../../Actions';

class ProtectedRoute extends Component{
    componentDidUpdate(){
        if(!this.props.isAuthenticated){
            this.forceUpdate();
        }
    }
    render(){
        const {component: Component, ...props} = this.props;
        return(
            <Route
            {...props}
            render={ props =>(
                    this.props.isAuthenticated ? 
                    <Component {...props} /> : 
                    <Redirect to='/login?login=required'/>
                )
            }
            />
        );
    }
}
const mapStateToProps = state =>({
    isAuthenticated: state.user.isAuthenticated
})
export default connect(mapStateToProps,{
    setUserAuthStatusMessage
})(ProtectedRoute);
//export default ProtectedRoute;