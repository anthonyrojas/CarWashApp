"use strict";
exports.home = (req, res, next)=>{
    res.json({home: 'welcome!'});
}