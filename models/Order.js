const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {},
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('users', orderSchema);