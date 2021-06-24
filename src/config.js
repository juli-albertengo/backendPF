require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    PASSPORT_SECRET: process.env.PASSPORT_SECRET,
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASS: process.env.ETHEREAL_PASS 
}