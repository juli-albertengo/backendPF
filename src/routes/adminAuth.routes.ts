const express = require('express');
const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../repositories/user')

const adminAuthRoutes = express.Router();

// GET => Get the from to signup
adminAuthRoutes.get('/signup/', (req, res) => {
    res.render('adminSignup.ejs')
})

// POST => Post info from form to start sign up process
adminAuthRoutes.post('/signup', passport.authenticate('signup', {failureRedirect: '/admin/failedSignup'}), (req, res) => {
    let user = req.user;
    console.log(user);
    res.render('adminIndex.js', user);
});

//GET => Failed signup
adminAuthRoutes.get('/failedSignup', (req, res) => {
    res.render('errorPage.ejs')
})

//Passport Signup
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
function(req, username, password, done){
    const findOrCreateUser = () => {
        User.findOne({'username': username}, function(err, user){
            if(err){
                console.log('Error in signing up');
                return done(err);
            }
            if(user){
                console.log('Username already taken, please choose another');
                return done(null, false, console.log('Username already exists'))
            } else {
                let newUser = new User();
                newUser.username = username;
                newUser. password = createHash(password);
                newUser.email = req.body.email;
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;

                newUser.save(function(err){
                    if(err){
                        console.log('Error saving user');
                        throw err;
                    }
                    console.log('User registration successful');
                    return done(null, user);
                })
            }
        })
    }
    process.nextTick(findOrCreateUser);
}
))

//Hash password helper function
const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


export default adminAuthRoutes;