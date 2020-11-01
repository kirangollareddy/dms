const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/* starts with /login. */
router.post('/', [
  authController.validator,
  authController.login
]);

router.get('/check', [
  authController.authMiddleware,
  (req, res) => {res.send('Yeah..!')}
]);

module.exports = router;
