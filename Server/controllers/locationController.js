"use strict";
const axios = require('axios');
const Location = require('../models/Location');
const User = require('../models/User');
exports.getLocationInfo = (req, res)=>{
    Location.findOne({_id: req.params.locationID}).then(locationFound =>{
        if(locationFound){
            locationFound.owners = undefined;
            locationFound.employees = undefined;
            res.status(200).json({message: 'Location information obtained.', location: locationFound});
        }
        res.status(404).json({message: 'Unable to obtain location information'});
    }).catch();
}
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
                if(!req.body.zipcode){
                    res.status(400).json({message: 'You must enter a zip code.'});
                }else{
                    var zipStr = req.body.zipcode.toString();
                    if(zipStr.length !== 5){
                        res.status(400).json({messag: 'Invalid zipcode.'});
                    }
                }
                if(!req.body.phone){
                    res.status(400).json({message: 'You must provide a primary phone number for this location.'});
                }
                let owners = [];
                owners.push(userFound);
                let newLocation = new Location({
                    title: req.body.title,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zipcode: req.body.zipcode,
                    phone: req.body.phone,
                    owners: owners
                });
                newLocation.save((err, savedLocation)=>{
                    if(err){
                        res.status(500).json({message: err.message});
                    }
                    if(savedLocation){
                        res.status(200).json({message: 'Congratulations! New location created.', location: savedLocation});
                    }else{
                        res.status(500).json({message: 'Unable to create this location.'});
                    }
                });
            }else{
                userFound.userStatus = 'Owner';
                userFound.save((err, updatedUser)=>{
                    if(err){
                        res.status(500).json('Unable to create a new location. Could not upgrade your status.');
                    }else{
                        //the user has been upgraded to an owner
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
                        if(!req.body.zipcode){
                            res.status(400).json({message: 'You must enter a zip code.'});
                        }else{
                            var zipStr = req.body.zipcode.toString();
                            if(zipStr.length !== 5){
                                res.status(400).json({messag: 'Invalid zipcode.'});
                            }
                        }
                        if(!req.body.phone){
                            res.status(400).json({message: 'You must provide a primary phone number for this location.'});
                        }
                        let owners = [];
                        owners.push(updatedUser);
                        let newLocation = new Location({
                            title: req.body.title,
                            address: req.body.address,
                            city: req.body.city,
                            state: req.body.state,
                            zipcode: req.body.zipcode,
                            phone: req.body.phone,
                            owners: owners
                        });
                        newLocation.save((err, savedLocation)=>{
                            if(err){
                                res.status(500).json({message: err.message});
                            }
                            if(savedLocation){
                                res.status(200).json({message: 'Congratulations! New location created.', location: savedLocation});
                            }else{
                                res.status(500).json({message: 'Unable to create this location.'});
                            }
                        });
                    }
                });
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
//the user is an owner of a particular location
exports.isLocationOwner = (req, res, next)=>{
    Location.findOne({_id: req.params.location}).populate('owners').exec((err, locationFound)=>{
        if(err){
            res.status(500).json({message: err.message});
        }else if(!locationFound){
            res.status(404).json({message: 'Unable to find location information, and as such unable to verify you are an owner here.'});
        }else{
            const owners = [...locationFound.owners];
            for(var i=0; i < owners.length; i++){
                if(owners[i].username === res.locals.username){
                    next();
                }
            }
            res.status(400).json({message: 'You are not an owner of this location.'});
        }
    });
}