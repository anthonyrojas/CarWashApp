"use strict";
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const User = require('../models/User');
exports.login = (req, res)=>{
    if(!req.body.username){
        res.status(400).json({message: 'You must provide a username.'});
    }
    if(!req.body.password){
        res.status(400).json({message: 'You must provide your password.'});
    }
    const username = req.body.username.toLowerCase();
    User.findOne({username: username}).then(userFound =>{
        if(!userFound){
            res.status(404).json({message: 'Could not find a user with that username. Try again.'});
        }else{
            bcrypt.compare(req.body.password, userFound.password, (err, compareRes)=>{
                if(err){
                    res.status(500).json({message: 'Unable to sign in. Try again.'});
                }else if(!compareRes){
                    res.status(400).json({message: 'Wrong password.'});
                }else{
                    const token = jwt.sign({username: userFound.username, firstName: userFound.firstName, lastName: userFound.lastName}, config.TOKEN_SECRET, (err, token)=>{
                        if(err){
                            res.status(500).json({message: 'Unable to login. Try again later.'});
                        }
                        res.status(200).json({message: `Signed in! Welcome, ${userFound.username}`, token: token});
                    });
                }
            });
        }
    }).then(err=>{
        res.status(500).json({message: err.message});
    });
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