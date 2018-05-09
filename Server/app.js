const express = require('express');
const app = express();
const server = require('http').createServer(app);
//var io = require('socket.io').listen(server);
server.listen(3000 || process.env.PORT);
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