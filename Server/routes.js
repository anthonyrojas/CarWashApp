const express = require('express');
const webController = require('./controllers/webController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const locationController = require('./controllers/locationController');
const menuController = require('./controllers/menuController');
module.exports = (app)=>{
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
    apiRoutes.put('/:location/menu');
    //add an item to the menu of a location
    apiRoutes.post('/:location/menu/item', authController.loginRequired, locationController.isLocationOwner, menuController.addMenuItem);
    //remove an item from a menu of a location
    apiRoutes.delete('/:location/menu/:item');
    //update a menu item from a location
    apiRoutes.put('/:location/menu/:item');
    app.use('/api', apiRoutes);
}