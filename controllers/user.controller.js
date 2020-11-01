const APIResponse = require('../handlers/APIResponse');
const User = require('../models/User');
const commonUtils = require('../utils/common.utils');

exports.registerValidator = (req, res, next) => {
  if(!req.body.username || !req.body.password){
    const error = new Error('Please provide username and password');
    error.statusCode = 400;
    const aPIResponseObj = new APIResponse(error, error.message, null);
    const response = aPIResponseObj.getResponse();
    return res.status(response.statusCode).send(response);
  }
  next();
}

exports.register = async (req, res) => {
  try {
    const userObj = new User();
    const result = await userObj.create(req.body.username, req.body.password);
    if(!result){
      commonUtils.throwLocalError(new Error('Internal Server Error'));
    }
    const aPIResponseObj = new APIResponse(null, `Registered Successfully`, result);
    const response = aPIResponseObj.getResponse();
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error(error);
    const aPIResponseObj = new APIResponse(error, error.message, null);
    const response = aPIResponseObj.getResponse();
    res.status(response.statusCode).send(response);
  }
}