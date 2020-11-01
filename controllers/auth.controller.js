const AuthService = require('../services/AuthService');
const APIResponse = require('../handlers/APIResponse');
const User = require('../models/User');
const config = require('../config');

exports.validator = (req, res, next) => {
  if(!req.body.username || !req.body.password){
    const error = new Error('Please provide username and password');
    error.statusCode = 400;
    const aPIResponseObj = new APIResponse(error, error.message, null);
    const response = aPIResponseObj.getResponse();
    return res.status(response.statusCode).send(response);
  }
  next();
}
exports.login = async (req, res) => {
  try {
    const userObj = new User();
    const user = await userObj.getUserByUsernameAndPassword(req.body.username, req.body.password);
    if(!user){
      const error = new Error('Invalid Credentials');
      error.statusCode = 401;
      const aPIResponseObj = new APIResponse(error, error.message, null);
      const response = aPIResponseObj.getResponse();
      return res.status(response.statusCode).send(response);
    }
    delete user.password;
    const accessToken = AuthService.generateToken(user);
    const aPIResponseObj = new APIResponse(null, `This accessToken is valid for ${config.tokenExpiryHours} hours`, {accessToken: accessToken});
    const response = aPIResponseObj.getResponse();
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error(error);
    const aPIResponseObj = new APIResponse(error, error.message, null);
    const response = aPIResponseObj.getResponse();
    res.status(response.statusCode).send(response);
  }
}

exports.authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    // Forbidden
    const error = new Error('Forbidden');
    error.statusCode = 403;
    const aPIResponseObj = new APIResponse(error, 'Specify Bearer Token', null);
    const response = aPIResponseObj.getResponse();
    return res.status(response.statusCode).send(response);
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    const verifiedJwt = AuthService.validateToke(bearerToken);
    req.user = verifiedJwt.body.user;
    next();
  } catch (error) {
    error.statusCode = 401;
    const aPIResponseObj = new APIResponse(error, 'Invalid Token | Token Expired', null);
    const response = aPIResponseObj.getResponse();
    return res.status(response.statusCode).send(response);
  }
}