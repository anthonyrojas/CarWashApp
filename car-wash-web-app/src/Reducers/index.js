import {combineReducers} from 'redux';
import SideNav from './Nav';
import Contact from './Contact';
export default combineReducers({
    sidenav: SideNav,
    contact: Contact
});