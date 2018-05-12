const axios = require('axios');
const Location = require('../models/Location');
const User = require('../models/User');
exports.createLocation = (req, res)=>{
    //create a new car wash location
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
                    res.status(400)
                }
            }else{
                res.status(403).json({message: 'Unauthorized! You are not an owner!'});
            }
        }
    }).catch(dbErr => {
        res.status(500).json({message: 'Could not verify user at this time.'});
    });
}