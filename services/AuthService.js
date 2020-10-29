const nJwt = require('njwt');
const config = require('../config')

class AuthService {
  static generateToken(data) {
    const jwt = nJwt.create(data,config.secret);
    jwt.setExpiration(new Date().getTime() + (24*60*60*1000)) //24 hours from now.
    const token = jwt.compact();
    return token;
  }

  static validateToke(token) {
    const verifiedJwt = nJwt.verify(token,config.secret);
    return verifiedJwt;
  }
}

exports = AuthService