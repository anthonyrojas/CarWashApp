const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsState = new Schema({
    name:{
        type: String,
        required: true
    },
    abbreviation:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('USState', UsState);