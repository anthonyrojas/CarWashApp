const express = require('express');
const webController = require('./controllers/webController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const locationController = require('./controllers/locationController');
const menuController = require('./controllers/menuController');
const contactController = require('./controllers/contactController');
const transactionController = require('./controllers/transactionController');
module.exports = (app)=>{
    //routes for public web browser, mainly the home page
    const webRoutes = express.Router();
    webRoutes.get('', webController.home);
    app.use('/', webRoutes)
    const publicRoutes = express.Router();
    //public contact form that sends an email to the service
    publicRoutes.post('/mail', contactController.sendMail);
    app.use('/public', publicRoutes);
    const authRoutes = express.Router();
    //create a new user
    authRoutes.post('/register', userController.register);
    //login
    authRoutes.post('/login', authController.login);
    app.use('/auth', authRoutes);
    const apiRoutes = express.Router();
    //get the public information of a location
    apiRoutes.get('/location/:locationID', locationController.getLocationInfo);
    //get the locations that a person is the owner of
    apiRoutes.get('/owner/locations', authController.loginRequired, locationController.getOwnerLocations);
    //create a new location
    apiRoutes.post('/location', authController.loginRequired, locationController.createLocation);
    //create a menu for a location
    apiRoutes.post('/:location/menu', authController.loginRequired, locationController.isLocationOwner, menuController.createMenu);
    //update a location's menu, namely its employee discount
    apiRoutes.put('/:location/menu', authController.loginRequired, locationController.isLocationOwner, menuController.updateMenu);
    //add an item to the menu of a location
    apiRoutes.post('/:location/menu/item', authController.loginRequired, locationController.isLocationOwner, menuController.addMenuItem);
    //remove an item from a menu of a location
    apiRoutes.delete('/:location/menu/:item', authController.loginRequired, locationController.isLocationOwner, menuController.removeMenuItem);
    //update a menu item from a location
    apiRoutes.put('/:location/menu/:item', authController.loginRequired, locationController.isLocationOwner, menuController.updateMenuItem);
    //leave as the owner of a location
    apiRoutes.post('/:location/owner', authController.loginRequired, locationController.isLocationOwner, locationController.leaveAsOwner);
    //add an employee to a location
    apiRoutes.put('/:location/employee', authController.loginRequired, locationController.isLocationOwner, locationController.addLocationEmployee);
    app.use('/api', apiRoutes);
    //routes for transactions
    const transactionRoutes = express.Router();
    app.use('/trans', transactionRoutes);
}