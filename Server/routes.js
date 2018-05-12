const express = require('express');
const webController = require('./controllers/webController');
module.exports = (app)=>{
    const apiRoutes = express.Router();
    app.use('/api', apiRoutes);
}