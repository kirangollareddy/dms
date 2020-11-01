const File = require('../models/File');
const Folder = require('../models/Folder');
const commonUtils = require('../utils/common.utils');
const APIResponse = require('../handlers/APIResponse');

exports.createFileValidator = (req, res, next) => {
    let isValid = true;
    const errors = [];
    if(!req.body.file_name || !commonUtils.fileOrFolderNameValidator(req.body.file_name)){
        errors.push(`Please provide valid file_name`);
        isValid = false;
    }

    if(!req.body.content){
        errors.push(`Please provide 'content' of file`);
        isValid = false;
    }

    if(!isValid){
        const error = new Error(errors.join('\n'));
        error.statusCode = 400;
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        return res.status(response.statusCode).send(response);
    }

    next();
}

exports.createFile = async (req, res) => {
    try {
        const file = new File();
        file.file_name = req.body.file_name;
        file.folder_id = req.body.folder_id?req.body.folder_id:null;
        file.user_id = req.user._id;
        file.content = req.body.content;
        const result = await file.create(file);
        if(!result){
            commonUtils.throwLocalError(new Error('Internal Server Error'));
        }
        const aPIResponseObj = new APIResponse(null, `File created successfully.`, result);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error(error);
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    }
}

exports.move = async (req, res) => {
    try {
        const file_id = req.params.id;
        const folder_id = req.params.folder_id?req.params.folder_id:null;

        const fileObj = new File();
        const folderObj = new Folder();

        const file = await fileObj.getByIdAndUserId(file_id, req.user._id);
        if(!file){
            commonUtils.throwLocalError(new Error(`File with id ${file_id} doesn't exists`));
        }

        if(folder_id){
            const folder = await folderObj.getByIdAndUserId(folder_id, req.user._id);
            if(!folder){
                commonUtils.throwLocalError(new Error(`Folder with id ${folder_id} doesn't exists`));
            }
        }

        const result = await fileObj.updateFolderIdByFileIdAndUserId(file_id, req.user._id, folder_id);
        if(!result){
            commonUtils.throwLocalError(new Error('Internal Server Error'));
        }
        const aPIResponseObj = new APIResponse(null, `File created successfully.`, result);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);

    } catch (error) {
        console.error(error);
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    }
}