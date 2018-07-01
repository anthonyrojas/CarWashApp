const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    menuItem: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'MenuItem'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    completed: {
        type: Date
    }
});
module.exports = mongoose.model('Order', OrderSchema);