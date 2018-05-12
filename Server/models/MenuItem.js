const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuItemSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    menu:{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);