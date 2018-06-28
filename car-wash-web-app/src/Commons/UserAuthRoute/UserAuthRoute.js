import React,{Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
class UserAuthRoute extends Component{
    componentDidUpdate(){
        if(this.props.isAuthenticated){
            this.forceUpdate();
        }
    }
    render(){
        const {component: Component, ...props} = this.props;
        return(
            <Route 
                {...props}
                render={props =>(
                    this.props.isAuthenticated ? 
                    <Redirect to='/dashboard'/> :
                    <Component {...props} />
                )}
            />
        );
    }
}
const mapStateToProps = state=>({
    isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps, {
})(UserAuthRoute);
//export default UserAuthRoute;