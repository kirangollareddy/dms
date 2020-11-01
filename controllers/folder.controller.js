const Folder = require('../models/Folder');
const File = require('../models/File');
const commonUtils = require('../utils/common.utils');
const APIResponse = require('../handlers/APIResponse');

exports.createFolderValidator = (req, res, next) => {
    if(!req.body.folder_name || !commonUtils.fileOrFolderNameValidator(req.body.folder_name)){
        const error = new Error('Please provide valid folder_name');
        error.statusCode = 400;
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        return res.status(response.statusCode).send(response);
    }
    next();
}
exports.createFolder = async (req, res) => {
    try {
        const folder = new Folder();
        folder.folder_name = req.body.folder_name;
        folder.user_id = req.user._id;
        const result = await folder.create(folder);
        if(!result){
            commonUtils.throwLocalError(new Error('Internal Server Error'));
        }
        const aPIResponseObj = new APIResponse(null, `Folder created successfully.`, result);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error(error);
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    }
}

exports.getFilesInFolder = async (req, res) => {
    try {
        const folderObj = new Folder();
        const folder_id = req.params.id;
        const folder = await folderObj.getByIdAndUserId(folder_id, req.user._id);

        if(!folder){
            commonUtils.throwLocalError(new Error(`Folder with id ${folder_id} doesn't exists`));
        }

        const fileObj = new File();
        const files = await fileObj.getAllByUserIdAndFolderId(req.user._id, folder_id);

        const aPIResponseObj = new APIResponse(null, `Folder created successfully.`, {files:files});
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error(error);
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    }
}