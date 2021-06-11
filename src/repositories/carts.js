const mongoose = require('mongoose');

const carts = 'carts';

const cartSchema = new mongoose.Schema({
    email: {type: String, required: true, max: 50},
    timestamp: {type: Date, required: true},
    deliveryAddres: {type: String, required: true},
    products: {type: Array, required: true}
})

const cartModel = mongoose.model(carts, cartSchema);

module.exports = cartModel 