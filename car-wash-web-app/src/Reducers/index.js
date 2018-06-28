import {combineReducers} from 'redux';
import SideNav from './Nav';
import Contact from './Contact';
import User from './User';
import UserInfo from './UserInfo';
export default combineReducers({
    sidenav: SideNav,
    contact: Contact,
    user: User,
    userInfo: UserInfo
});