const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    userStatus:{
        type: String,
        enum: ['Owner', 'Employee', 'User'],
        default: 'User'
    },
    phone: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', UserSchema);