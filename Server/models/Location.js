const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'USState'
    },
    zipcode:{
        type: Number,
        required: true
    },
    owners: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    employees: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    stripeKey:{
        type: String
    }
});
module.exports = mongoose.model('Location', LocationSchema);