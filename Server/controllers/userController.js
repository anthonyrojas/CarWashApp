const User = require('../models/User');
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
    const username = req.body.username;
    User.findOne({username: username}).then(userFound =>{
        if(userFound){
            res.status(400).json({message: 'User with that username already exists.'});
        }
    }).catch(dbErr =>{
        res.status(500).json({message: 'Unable to create user at this time.'});
    });
    const email = req.body.email;
    const phone = req.body.phone;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    if(req.body.userStatus){
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
    }
}