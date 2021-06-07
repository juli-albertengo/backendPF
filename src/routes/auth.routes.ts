require('dotenv').config();
const express = require('express');
const {createHash, issueJWT, isValidPassword} = require('../middleware/passportUtils');
const {userModel} = require('../repositories');

const authRouter = express.Router();

//GET => SIGNUP FORM
authRouter.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

//GET => LOGIN FORM
authRouter.get('/login', (req,res)=> {
    res.render('login.ejs')
})

//POST SIGNUP FORM 
authRouter.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userModel.findOne({'username': username}, function(err, user){
    if(err){
      console.log('Error in signup: ' + err);
      res.render('error.ejs', {message: `There has been an error in signup => ${err}`})
    }
    if(user){
      console.log('User already exists');
      res.render('error.ejs', {message: 'User already exists.'})
    } else {
      var newUser = new userModel();
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;
      newUser.email = req.body.email;
      newUser.username = username;
      newUser.password = createHash(password);
      newUser.save(function(err, user){
        if(err){
          console.log('Error saving user: ' + err)
          res.render('error.ejs', {message: `There has been an error in signup => ${err}`})
        }
          console.log('User registration completed successfully');
          const jwToken = issueJWT(user);
          res.render('protectedRoute.ejs', {user, token: jwToken.token, expiresIn: jwToken.expiresIn})
        }
      )
    }
  })
});

//POST LOGIN FORM 
authRouter.post('/login', function(req, res, next){
  const username = req.body.username;
  const password = req.body.password;
  userModel.findOne({'username': username}, function(err, user){
    if(err){
      console.log(`Error login: ${err}`)
      res.render('error.ejs', {message: `There has been an error in login ${err}`})
    }
    if(!user){
      res.render('error.ejs', {message: `User not found`})
    } else {
      const isValid = isValidPassword(user, password);
      if(isValid){
        const tokenObject = issueJWT(user);
        res.render('protectedRoute.ejs', {user, token: tokenObject.token, expiresIn: tokenObject.expiresIn});
      } else {
        res.render('error.ejs', {message: `Wrong password!`})
      }
    }
  })
});

//GET => LOGOUT
authRouter.get("/logout", (req, res)=> {
    req.logout();
    res.redirect('/');
})

export default authRouter