"use strict";
const axios = require('axios');
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const Location = require('../models/Location');
exports.createMenu = (req, res)=>{
    if(req.params.location){
        Menu.findOne({location: req.params.location}).then(menuFound => {
            if(menuFound){
                res.status(400).json({message: 'This location already has a menu.'});
            }else{
                if(!req.body.employeeDiscountRate){
                    res.status(400).json({message: 'You must enter an employee discount for your menu at this location. It can be from 0-100.'});
                }
                else if(req.body.employeeDiscountRate < 0 || req.body.employeeDiscountRate > 100){
                    res.status(400).json({message: 'You must enter a valid employee discount rate. It can range from 0 to 100.'});
                }
                var newMenu = new Menu({
                    location: req.params.location,
                    employeeDiscountRate: req.body.employeeDiscountRate
                });
            }
        }).catch(err => {
            res.status(500).json({message: err.message});
        });
    }else{
        res.status(400).json({message: 'Location not specified. Could not create a menu.'});
    }
}
exports.addMenuItem = (req, res)=>{
}
exports.updateMenuItem = (req, res)=>{
}