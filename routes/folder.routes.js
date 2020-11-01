const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')
const folderController = require('../controllers/folder.controller')

/* starts with /user. */
router.post('/', [
  authController.authMiddleware,
  folderController.createFolderValidator,
  folderController.createFolder
]);

router.get('/:id/files', [
  authController.authMiddleware,
  folderController.getFilesInFolder
])

module.exports = router;
