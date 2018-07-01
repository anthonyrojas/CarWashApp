"use strict";
const stripe = require('stripe');
const MenuItem = require('../models/MenuItem');
exports.payMenuItem = (req, res)=>{
    //the user has paid for a menu item
    if(!req.body.menuItem){
        res.status(400).json({message: 'Menu item not specified.'});
    }
}