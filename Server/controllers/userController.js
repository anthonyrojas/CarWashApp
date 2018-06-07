"use strict";
const User = require('../models/User');
const brcypt = require('bcrypt');
const config = require('../config');
exports.register = (req, res)=>{
    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(!req.body.email){
        res.status(400).json({message: 'You must enter a valid email.'});
    }else if(!tester.test(req.body.email)){
        res.status(400).json({message: 'You must enter a valid email.'});
    }
    if(!req.body.phone){
        res.status(400).json({message: 'You must enter a valid phone number.'});
    }
    if(!req.body.firstName){
        res.status(400).json({message: 'You must enter a first name.'});
    }
    if(!req.body.lastName){
        res.status(400).json({message: 'You must enter a last name.'});
    }
    if(!req.body.password){
        res.status(400).json({message: 'You must enter a password.'});
    }
    if(!req.body.username){
        res.status(400).json({message: 'You must enter a username.'});
    }
    if(req.body.username.contains(' ')){
        res.status(400).json({message: 'A username cannot contain whitespaces.'})
    }
    if(username.length > config.USERNAME_MAX_LENGTH || username.length < config.USERNAME_MIN_LENGTH || /\s/.test(username)){
        res.status(400).json({message: `Invalid username. Username must be between ${config.PASSWORD_MIN_LENGTH} and ${config.PASSWORD_MAX_LENGTH} characters and cannot contain whitespace.`});
    }
    const password = req.body.password;
    if(password < config.PASSWORD_MIN_LENGTH || password > config.PASSWORD_MAX_LENGTH){
        res.status(400).json({message: `Password must be between ${config.PASSWORD_MIN_LENGTH} and ${config.PASSWORD_MAX_LENGTH} characters long.`});
    }
    User.findOne({username: username}).then(userFound =>{
        if(userFound){
            res.status(400).json({message: 'User with that username already exists.'});
        }
    }).catch(dbErr =>{
        res.status(500).json({message: 'Unable to create user at this time.'});
    });
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    brcypt.genSalt(config.SALT_FACTOR, (err, salt)=>{
        brcypt.hash(password, salt, (err, hashedPassword)=>{
            if(err){
                res.status(500).json({message: 'Unable to safely register your account. Please try again.'});
            }else{
                var newUser = new User({
                    email: email,
                    phone: phone,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    username: username
                });
                newUser.save((err, saved)=>{
                    if(err){
                        res.status(500).json({message: 'Unable to save user.'});
                    }else if(!saved){
                        res.status(500).json({message: 'Unable to save user.'});
                    }else{
                        saved.password = undefined;
                        res.status(200).json({user: saved, message: 'Successfully signed up!'});
                    }
                });
            }
        });
    });
    /*if(req.body.userStatus){
        var newUser = new User({
            email: email,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username,
            userStatus: req.body.userStatus
        });
        newUser.save((err, saved)=>{
            if(err){
                res.status(500).json({message: 'Unable to save user.'});
            }else if(!saved){
                res.status(500).json({message: 'Unable to save user.'});
            }else{
                saved.password = undefined;
                res.status(200).json({user: saved});
            }
        });
    }else{
        var newUser = new User({
            email: email,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username
        });
        newUser.save((err, saved)=>{
            if(err){
                res.status(500).json({message: 'Unable to save user.'});
            }else if(!saved){
                res.status(500).json({message: 'Unable to save user.'});
            }else{
                saved.password = undefined;
                res.status(200).json({user: saved});
            }
        });
    }*/
}
exports.getUserInfo = (req, res, next)=>{
    User.findOne({username: res.locals.username}).then(userFound => {
        if(userFound){
            userFound.password = undefined;
            res.status(200).json({message: 'User found', userInfo: userFound});
        }else{
            res.status(404).json({message: 'Unable to find user information.'});
        }
    }).catch(userDBErr=>{
        res.status(500).json({message: userDBErr.message});
    });
}