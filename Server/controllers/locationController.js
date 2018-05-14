const axios = require('axios');
const Location = require('../models/Location');
const User = require('../models/User');
//create a new car wash location
exports.createLocation = (req, res)=>{
    User.findOne({username: res.locals.username}).then(userFound => {
        if(!userFound){
            res.status(403).json({message: 'Unauthorized! Please sign in.'});
        }else{
            if(userFound.userStatus === 'Owner'){
                if(!req.body.title){
                    res.status(400).json({message: 'You must give your location a name.'});
                }
                if(!req.body.address){
                    res.status(400).json({message: 'You must enter a street address.'});
                }
                if(!req.body.city){
                    res.status(400).json({message: 'You must provide a city for your location.'});
                }
                if(!req.body.state){
                    res.status(400).json({message: 'You must provide a state for your location.'});
                }
            }else{
                res.status(403).json({message: 'Unauthorized! You are not an owner!'});
            }
        }
    }).catch(dbErr => {
        res.status(500).json({message: 'Could not verify user at this time.'});
    });
}
//get locations owned by a specific user
exports.getOwnerLocations = (req, res)=>{
    User.findOne({username: res.locals.username}).then(userFound => {
        if(!userFound){
            res.status(401).json({message: 'Unauthorized! Please sign in.'});
        }else if(userFound.userStatus !== 'Owner'){
            res.status(401).json({message: 'You are not an owner.'});
        }else{
            Location.
            find({}).
            populate({
                path: 'owners',
                match: {username: userFound.username}
            }).exec((err, locationsFound)=>{
                if(err){
                    res.status(500).json({message: 'You are not the owner of any existing locations.'});
                }else if(!userFound){
                    res.status(404).json({message: 'You are not the owner of any existing locations.'});
                }
                res.status(200).json({message: 'Found locations!', locations: locationsFound});
            });
        }
    }).catch(dbErr=>{
        res.status(500).json({message: 'Could not connect to database.'});
    });
}