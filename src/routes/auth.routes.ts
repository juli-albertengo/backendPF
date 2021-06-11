require('dotenv').config();
const express = require('express');
const {createHash, issueJWT, isValidPassword} = require('../middleware/passportUtils');
const {userModel} = require('../repositories');

const authRouter = express.Router();

//POST SIGNUP FORM 
authRouter.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password; 
  try {
    userModel.findOne({'username': username}, function(err, user){
      if(err){
        console.log('Error in signup: ' + err);
        res.json({error: `There has been an error in signup => ${err}`})
      }
      if(user){
        console.log('User already exists');
        res.json({error: 'User already exists.'})
      } else {
        var newUser = new userModel();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        newUser.username = username;
        if( password) {
          newUser.password = createHash(password);
          try {
            newUser.save(function(err, user){
              if(err){
                console.log('Error saving user: ' + err)
                res.render('error.ejs', {message: `There has been an error saving new user in DB => ${err}`})
              }
                console.log('User registration completed successfully');
                const jwToken = issueJWT(user);
                res.json({user, token: jwToken})
              })
            } catch (error) {
              res.json({error: `There has been an error saving new user in DB => ${error}`});
            }
        } else {
          res.json({error: `You need to privide a password`});
        }
      }
    })
  } catch (error){
    console.log(error);
    res.json({error: `There has been an error in signup => ${error}`});
  }
});

//POST LOGIN FORM 
authRouter.post('/login', function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  try {
    userModel.findOne({'username': username}, function(err, user){
      if(err){
        console.log(`Error login: ${err}`)
        res.json({error: `There has been an error during login ${err}`})
      }
      if(!user){
        res.json({error: `User not found`})
      } else {
        const isValid = isValidPassword(user, password);
        if(isValid){
          const tokenObject = issueJWT(user);
          res.json({user, token: tokenObject})
        } else {
          res.json({error: `Wrong password!`})
        }
      }
    })
  } catch (error) {
    console.log(error);
    res.json(`There has been an error during login => ${error}`)
  }
});

//GET => LOGOUT
authRouter.get("/logout", (req, res)=> {
    req.logout();
    res.json({message: `Logout Successful`});
})

export default authRouter