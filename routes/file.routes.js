const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')
const fileController = require('../controllers/file.controller')

/* starts with /user. */
router.post('/', [
  authController.authMiddleware,
  fileController.createFileValidator,
  fileController.createFile
]);

//folder_id can be empty
router.put('/:id/move/to/:folder_id?', [
  authController.authMiddleware,
  fileController.move
])

module.exports = router;
