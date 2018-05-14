const express = require('express');
const webController = require('./controllers/webController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const locationController = require('./controllers/locationController');
module.exports = (app)=>{
    const apiRoutes = express.Router();
    apiRoutes.get('/owner/locations', authController.loginRequired, locationController.getOwnerLocations);
    app.use('/api', apiRoutes);
}