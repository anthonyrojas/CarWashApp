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
                newMenu.save((err, savedMenu)=>{
                    if(err){
                        res.status(500).json({message: 'Unable to create a menu for this location at this time. Please try again later.'});
                    }
                    if(savedMenu){
                        res.status(200).json({message: 'Successfully created a menu for this location!'});
                    }
                    res.status(500).json({message: 'Unable to create a menu for this location at this time. Please try again later.'});
                })
            }
        }).catch(err => {
            res.status(500).json({message: err.message});
        });
    }else{
        res.status(400).json({message: 'Location not specified. Could not create a menu.'});
    }
}
exports.addMenuItem = (req, res)=>{
    if(!req.body.title){
        res.status(400).json({message: 'You must provide a title for this menu item.'});
    }
    if(!req.body.description){
        res.status(400).json({message: 'You must provide a description for this menu item.'});
    }
    if(!req.body.price){
        res.status(400).json({message: 'You must enter a price for this menu item.'});
    }
    let price = Number(req.body.price.trim());
    if(isNaN(price)){
        res.status(400).json({message: 'You must enter a valid number value for the price.'});
    }
    const title = req.body.title;
    const description = req.body.description;
    Menu.findOne({location: req.params.location}).then(menuFound =>{
        if(menuFound){
            let menuItem = new MenuItem({
                title: title,
                description: description,
                price: price,
                menu: menuFound._id
            });
            menuItem.save((err, savedMenuItem)=>{
                if(err){
                    res.status(500).json({message: 'Unable to create a new menu item.'});
                }
                if(!savedMenuItem){
                    res.status(500).json({message: 'Unable to create a new menu item.'});
                }
                res.status(200).json({message: 'Successfully added new item!', menuItem: savedMenuItem});
            });
        }
    }).catch(err=>{
        res.status(500).json({message: 'Unable to add a new menu item at this time. Please try again later.'});
    });
}
exports.updateMenuItem = (req, res)=>{
    if(!req.body.title){
        res.status(400).json({message: 'You must enter a title for thie menu item.'});
    }
    if(!req.body.description){
        res.status(400).json({message: 'You must enter a description for this menu item.'});
    }
    if(!req.body.price){
        res.status(400).json({message: 'You must enter a price for this menu item.'});
    }
    let price = Number(req.body.price.trim());
    if(isNaN(price)){
        res.status(400).json({message: 'You must enter a valid price for this menu item that is a number.'});
    }
    const title = req.body.title;
    const description = req.body.description;
    MenuItem.findOneAndUpdate({_id: req.params.menu}, {$set:{title: title, description: description, price: price}}, {new: true}, (err, updatedMenuItem)=>{
        if(err){
            res.status(500).json({message: 'Unable to update menu item at this time. Try again later.'});
        }
        if(updatedMenuItem){
            res.status(200).json({message: 'Successfully updated menu item!', menuItem: updatedMenuItem});
        }
        res.status(500).json({message: 'Unable to find menu item or unable to update it at this time. Please try again later.'});
    });
}
exports.updateMenu = (req, res)=>{
    if(!req.body.employeeDiscountRate){
        res.status(400).json({message: 'You must provide a valid employee discount rate.'});
    }
    let discountRate = Number(req.body.employeeDiscountRate);
    if(isNaN(discountRate)){
        res.status(400).json({message: 'You must provide a valid employee discount rate. It must be a number.'});
    }
    if(discountRate < 0 || discountRate > 100){
        res.status(400).json({message: 'You must provide a valid employee discount rate that is between 0 and 100.'});
    }
    Menu.findOneAndUpdate({location: req.params.location}, {$set: {employeeDiscountRate: discountRate}}, {new: true}, (err, updatedMenu)=>{
        if(err){
            res.status(500).json({message: 'Database error. Server unable to update this menu at this time.'});
        }
        if(updatedMenu){
            res.status(200).json({message: 'Successfully updated menu!', menu: updatedMenu});
        }
        res.status(500).json({message: 'Unable to find the menu for this location and update the menu. Please try again.'});
    });
}
exports.removeMenuItem = (req, res)=>{
    if(!req.body.item){
        res.status(400).json({message: 'No menu item specified.'});
    }
    MenuItem.findOneAndRemove({_id: req.body.item}).then(itemRemoved=>{
        if(itemRemoved){
            res.status(500).json({message: 'Menu item removed.'});
        }else{
            res.status(404).json({message: 'Menu item not found and could not be removed at this time. Please try again later.'});
        }
    }).catch(err=>{
        res.status(500).json({message: 'Database error. Unable to delete this item at this time.'});
    });
}