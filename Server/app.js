const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');
const csrf = require('csurf');
const logger = require('morgan');
const express = require('express');
const serverConfig = {
    key: fs.readFileSync(__dirname + '/keys/key.pem'),
    cert: fs.readFileSync(__dirname + '/keys/cert.pem'),
    requestCert: true,
    rejectUnauthorized: false
}
const config = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHOST);
const app = express();
//var io = require('socket.io').listen(server);
//const server = require('https').createServer(serverConfig,app);
const server = require('http').createServer(app);
//const server = require('http2').createSecureServer(http2Config, app);
app.set('trust proxy', '127.0.0.1');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.disable('x-powered-by');
app.use(logger('dev'));
routes(app);
app.get('*', function(req, res, next) {
    var err = new Error('Invalid path. Page not found.');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    if(err.message){
        res.status(err.status);
        res.json({message: err.message});
    }else{
        res.status(500).json({message: 'Oops! Something went wrong'});
    }
});
const initializeStates = require('./controllers/initStatesController').setStates();
server.listen(3000, ()=>{
    console.log('Listening on port' + server.address().port);
});