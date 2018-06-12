const USState = require('../models/USState');
exports.passOnStates = (req, res, next)=>{
    USState.find({}).then(states=>{
        if(!states){
            res.status(404).json({message: 'Unable to retreive US States.'});
        }
        res.locals.states = states;
        next();
    }).catch(err=>{
        res.status(500).json({message: 'Database error. Please make this request again later.'});
    });
}