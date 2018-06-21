import {combineReducers} from 'redux';
import SideNav from './Nav';
import Contact from './Contact';
import User from './User';
export default combineReducers({
    sidenav: SideNav,
    contact: Contact,
    user: User
});