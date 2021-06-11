const mongoose = require('mongoose');
const productModel = require('./products');
const cartModel = require('./carts');
const userModel = require('./user');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return 'DB Connection established'
    } catch (error) {
        return error;
    }
}

module.exports = {productModel, cartModel, userModel, connectToDB}