const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller')

/* starts with /user. */
router.post('/register', [
  userController.registerValidator,
  userController.register
]);

module.exports = router;
