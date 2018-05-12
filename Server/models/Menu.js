const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    employeeDiscountRate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Menu', MenuSchema);