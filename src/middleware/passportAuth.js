require('dotenv').config();
const {userModel} = require('../repositories');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const StrategyOptionsObject = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
    jsonWebTokenOptions: {
        complete: false,
        maxAge: '2d',
        clockTimestamp: '100'
    }
}

const jwtStrategy = new JWTstrategy(StrategyOptionsObject, function(payload, done){
    userModel.findOne({id: payload.sub}, function(err, user) {
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