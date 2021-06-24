const config = require('../config');
const mongoose = require('mongoose');
const productModel = require('./products');
const cartModel = require('./carts');
const orderModel = require('./orders');
const userModel = require('./user');

const connectToDB = async() => {
    try {
        await mongoose.connect(config.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return 'DB Connection established'
    } catch (error) {
        return error;
    }
}

module.exports = {productModel, cartModel, userModel, connectToDB, orderModel}