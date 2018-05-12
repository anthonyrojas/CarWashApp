"use strict";
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.getChallenge = (req, res, next)=>{
    res.json({salt_factor: config.SALT_FACTOR, secret_phrase: config.TOKEN_SECRET});
}
exports.loginRequired = (req, res, next)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, config.TOKEN_SECRET, (err,decoded)=>{
        if(err){
            res.status(403).json({message: 'Login required!'});
        }else{
            if(decoded){
                res.locals.username = decoded.username;
                next();
            }else{
                res.status(403).json({message: 'Login required!'});
            }
        }
    });
}