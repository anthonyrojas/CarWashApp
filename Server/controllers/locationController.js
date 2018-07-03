"use strict";
const axios = require('axios');
const Location = require('../models/Location');
const User = require('../models/User');
const State = require('../models/USState');
exports.getLocationInfo = (req, res)=>{
    Location.findOne({_id: req.params.locationID}).then(locationFound =>{
        if(locationFound){
            locationFound.owners = undefined;
            locationFound.employees = undefined;
            res.status(200).json({message: 'Location information obtained.', location: locationFound});
        }
        res.status(404).json({message: 'Unable to obtain location information or location does not exist.'});
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
}
//create a new car wash location
exports.createLocation = (req, res)=>{
    //user owner info stored in res.locals.user
    if(!req.body.title){
        return res.status(400).json({message: 'You must give your location a name.'});
    }
    if(!req.body.address){
        return res.status(400).json({message: 'You must enter a street address.'});
    }
    if(!req.body.city){
        return res.status(400).json({message: 'You must provide a city for your location.'});
    }
    if(!req.body.zipcode){
        return res.status(400).json({message: 'You must enter a zip code.'});
    }else if(req.body.zipcode.toString().length !== 5){
        return res.status(400).json({messag: 'Invalid zipcode. Your zip code must contain 5 digits.'});
    }
    if(!req.body.state){
        return res.status(400).json({message: 'You must provide a state for your location.'});
    }
    if(!req.body.phone){
        return res.status(400).json({message: 'You must provide a primary phone number for this location.'});
    }
    State.findOne({name: req.body.state}).then(stateFound=>{
        if(stateFound){
            let owners = [];
            owners.push(res.locals.user);
            let newLocation = new Location({
                title: req.body.title,
                address: req.body.address,
                city: req.body.city,
                state: stateFound,
                zipcode: req.body.zipcode,
                phone: req.body.phone,
                owners: owners
            });
            newLocation.save((err, savedLocation)=>{
                if(err){
                    return res.status(500).json({message: err.message});
                }
                if(savedLocation){
                    return res.status(200).json({message: 'Congratulations! New location created.', location: savedLocation});
                }else{
                    return res.status(500).json({message: 'Unable to create this location.'});
                }
            });
        }else{
            return res.status(404).json({message: 'Invalid state provided.'});
        }
    }).catch(err=>{
        return res.status(500).json({message: 'Unable to create location at this time.'});
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
                    res.locals.location = locationFound;
                    next();
                }
            }
            res.status(400).json({message: 'You are not an owner of this location.'});
        }
    });
}
exports.addLocationOwner = (req, res)=>{
    if(!req.body.username){
        res.status(400).json({message: 'You must specify the username of the person you wish to add as an owner.'});
    }
    let username = req.body.username.trim();
    User.findOneAndUpdate({username: username}, {$set:{userStatus: 'Owner'}}, {new: true}, (err,updatedUser)=>{
        if(err){
            res.status(500).json({message: 'Error. Unable to add user as an owner at this time.'});
        }
        if(updatedUser){
            let currLocation = res.locals.location;
            let locationOwners = currLocation.owners;
            locationOwners.push(updatedUser);
            Location.updateOne({_id: currLocation._id}, {owners: locationOwners}, (err, updatedLocation)=>{
                if(err){
                    res.status(500).json({message: 'Unable to update the location owners at this time. Please try again later.'});
                }
                if(updatedLocation){
                    res.status(200).json({message: 'Succesfully updated location owners!'});
                }
                res.status(500).json({message: 'Unable to update location at this time. Please try again later.'});
            });
        }
        res.status(404).json({message: 'Could not find user with that username.'});
    })
}
exports.leaveAsOwner = (req, res)=>{
    let location = res.locals.location;
    User.findOneAndUpdate({username: res.locals.username}, {$set:{userStatus: 'User'}}, {new: true}, (err, updatedUser)=>{
        if(err){
            res.status(500).json({message: 'Unable to remove you as an owner. Please try again.'});
        }
        if(updatedUser){
            let locationOwners = location.owners;
            if(locationOwners.length <= 1){
                res.status(400).json({message: 'Cannot leave as owner when you are the only owner of this location.'});
            }
            let updatedOwners = locationOwners.filter((owner)=>{
                return owner._id != updatedUser._id;
            });
            Location.updateOne({_id: location._id}, {owners: updatedOwners}, (err, updatedLocation)=>{
                if(err){
                    res.status(500).json({message: 'Cannot leave and update this locations\'s owners at this tine. Please try again later.'});
                }
                res.status(200).json({message: 'Location successfully updated and you are no longer an owner of this location.'});
            });
        }
    });
}
exports.addLocationEmployee = (req, res)=>{
    if(!req.body.username){
        res.status(400).json({message: 'You must specify the username of the user you want to add as your employee here.'});
    }else{
        User.findOneAndUpdate({username: req.body.username}, {$set:{userStatus: 'Employee'}}, {new: true}, (err, updatedUser)=>{
            if(err){
                res.status(500).json({message: 'Unable to an this employee at this time.'});
            }
            if(updatedUser){
                //found the user and updated it
                let currentLocation = res.locals.location;
                let ownerArr = [...currentLocation.owners];
                ownerArr.push(updatedUser);
                Location.findOneAndUpdate({_id: res.locals.location._id}, {$set:{owners: ownerArr}}, {new: true}, (err, updatedLocation)=>{
                    if(err){
                        res.status(500).json({message: 'Unable to add this employee at this time.'});
                    }
                    if(updatedLocation){
                        res.status(200).json({message: 'Successfully added this location and updated this location!', location: updatedLocation});
                    }else{
                        res.status(404).json({message: 'Unable to find and update this location.'});
                    }
                });
            }else{
                res.status(404).json({message: 'Unable to find a user with this username. If your employee does not have an account, ask them to make one.'});
            }
        });
    }
}
exports.searchLocation = (req, res)=>{
    if(!req.params.type){
        res.status(400).json({message: 'You must specify the field with which you are searching against.'});
    }
    if(!req.params.searchVal){
        res.status(400).json({message: 'You must specify the search value for your search query.'});
    }
    let searchVal = req.params.searchVal;
    switch(req.params.type){
        case 'title': 
            Location.find({title: {$regex: searchVal, $options: 'i'}}).then(locationsFound=>{
                if(locationsFound && locationsFound.length > 0){
                    return res.status(200).json({location: locationsFound, message: 'Found what you were looking for.'});
                }else{
                    return res.status(404).json({message: 'Could not find a location matching those specifications. Sorry.'});
                }
            }).catch(err=>{
                return res.status(500).json({message: 'Unable to search for location at this time'});
            });
            break;
        case 'address':
            Location.find({address: {$regex: searchVal, $options: 'i'}}).then(locationsFound=>{
                if(locationsFound && locationsFound.length > 0){
                    return res.status(200).json({location: locationsFound, message: 'Found what you were looking for.'});
                }else{
                    return res.status(404).json({message: 'Could not find a location matching those specifications. Sorry.'});
                }
            }).catch(err=>{
                return res.status(500).json({message: 'Unable to search for location at this time'});
            });
            break;
        case 'phone':
            Location.find({phone: {$regex: searchVal, $options: 'i'}}).then(locationsFound=>{
                if(locationsFound && locationsFound.length > 0){
                    return res.status(200).json({location: locationsFound, message: 'Found what you were looking for.'});
                }else{
                    return res.status(404).json({message: 'Could not find a location matching those specifications. Sorry.'});
                }
            }).catch(err=>{
                return res.status(500).json({message: 'Unable to search for location at this time'});
            });
            break;
        case 'zipcode':
            Location.find({zipcode: parseInt(searchVal)}).then(locationsFound=>{
                if(locationsFound && locationsFound.length > 0){
                    return res.status(200).json({location: locationsFound, message: 'Found what you were looking for.'});
                }else{
                    return res.status(404).json({message: 'Could not find a location matching those specifications. Sorry.'});
                }
            }).catch(err=>{
                return res.status(500).json({message: 'Unable to search for location at this time'});
            });
            break;
        default: return res.status(400).json({message: 'Invalid type specified for this search.'});
    }
}