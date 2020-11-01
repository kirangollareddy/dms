const mongoDb = require('../handlers/MongoDb');
const config = require('../config');

/*collection - file*/
class File {
  /*
  #_id
  #user_id
  #folder_id
  #file_name
  #content
  #created_date
  #updated_date
  */

  getAllByUserIdAndFolderId = async (user_id, folder_id) => {
    const db = await mongoDb.getDb();
    const fileCollection = db.collection(config.collections.FILE);
    const cursor = fileCollection.find({user_id: mongoDb.ObjectID(user_id), folder_id: folder_id?mongoDb.ObjectID(folder_id):null});
    const files = [];
    await cursor.forEach(file => {
      files.push(file);
    });
    return files;
  }

  getByIdAndUserId = async (id, user_id) => {
    const db = await mongoDb.getDb();
    const fileCollection = db.collection(config.collections.FILE);
    return await fileCollection.findOne({_id: mongoDb.ObjectID(id), user_id: mongoDb.ObjectID(user_id)})
  }

  create = async (file) => {
    const db = await mongoDb.getDb();
    const fileCollection = db.collection(config.collections.FILE);
    return await fileCollection.insertOne({
      user_id: mongoDb.ObjectID(file.user_id),
      folder_id: file.folder_id?mongoDb.ObjectID(file.folder_id):null,
      file_name: file.file_name,
      content: file.content,
      created_date: new Date(),
      updated_date: new Date()
    });
  }

  updateFolderIdByFileIdAndUserId = async (file_id, user_id, folder_id) => {
    const db = await mongoDb.getDb();
    const fileCollection = db.collection(config.collections.FILE);
    return fileCollection.updateOne({_id: mongoDb.ObjectID(file_id), user_id: mongoDb.ObjectID(user_id)},
      {
        $set: {
          folder_id: folder_id? mongoDb.ObjectID(folder_id):null
        }
      })
  }
}

module.exports = File;