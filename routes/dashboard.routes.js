const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')
const dashboardController = require('../controllers/dashboard.controller')

/* starts with /home. */
router.get('/', [
  authController.authMiddleware,
  dashboardController.getFoldersAndFiles
]);

module.exports = router;
