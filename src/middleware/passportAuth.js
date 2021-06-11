require('dotenv').config();
const {userModel} = require('../repositories');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {parseUnixTimestamp} = require('./passportUtils')

const StrategyOptionsObject = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

const jwtStrategy = new JWTstrategy(StrategyOptionsObject, function(payload, done){
    userModel.findOne({_id: payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

module.exports = jwtStrategy;