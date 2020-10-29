const AuthService = require('../services/AuthService');
const APIResponse = require('../handlers/APIResponse');
const config = require('../config');
//const debug = require('debug')('document-management-system:auth.controller');

exports.login = (req, res) => {
  try {
    const accessToken = AuthService.generateToken({username: req.body.username});
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
    res.user = verifiedJwt.body.user;
    next();
  } catch (error) {
    error.statusCode = 401;
    const aPIResponseObj = new APIResponse(error, 'Invalid Token | Token Expired', null);
    const response = aPIResponseObj.getResponse();
    return res.status(response.statusCode).send(response);
  }
}