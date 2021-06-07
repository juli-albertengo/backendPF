const bCrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

const issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {expiresIn});

    return {
        token: `Bearer ${signedToken}`,
        expiresIn
    }
}

module.exports = {createHash, issueJWT, isValidPassword}