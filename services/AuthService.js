const nJwt = require('njwt');
const config = require('../config')

class AuthService {
  static generateToken(user) {
    const signingKey = new Buffer(config.secret, 'utf8');
    const jwt = nJwt.create({user:user}, signingKey);
    jwt.setExpiration(new Date().getTime() + config.tokenExpiryHours);
    return jwt.compact();//token
  }

  static validateToke(token) {
    const signingKey = new Buffer(config.secret, 'utf8');
    return nJwt.verify(token, signingKey);//verifiedJwt
  }
}

module.exports = AuthService;