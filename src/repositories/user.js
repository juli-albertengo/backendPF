var mongoose = require('mongoose');
 
module.exports = mongoose.model('Users',{
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});


/*const mongoose = require('mongoose');

const user = 'user';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 50},
    email: {type: String, required: true, max: 50},
    firstName: {type: String, required: true, max: 50},
    lastName: {type: String, required: true, max: 50},
})

const userModel = mongoose.model(user, userSchema);
 
module.exports = userModel;
*/