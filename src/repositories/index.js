const mongoose = require('mongoose');
const productModel = require('./products');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return 'Established connection'
    } catch (error) {
        return error;
    }
}

module.exports = {productModel, connectToDB}