const Folder = require('../models/Folder');
const File = require('../models/File');
const APIResponse = require('../handlers/APIResponse');


exports.getFoldersAndFiles = async (req, res) => {
    try {
        const folderObj = new Folder();
        const fileObj = new File();
        const folders = await folderObj.getAllByUserId(req.user._id);
        const files = await fileObj.getAllByUserIdAndFolderId(req.user._id, null);

        const aPIResponseObj = new APIResponse(null, `Folder created successfully.`, {folders: folders, files:files});
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error(error);
        const aPIResponseObj = new APIResponse(error, error.message, null);
        const response = aPIResponseObj.getResponse();
        res.status(response.statusCode).send(response);
    }
}