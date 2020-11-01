const mongoDb = require('../handlers/MongoDb');
const config = require('../config');

/*collection - folder*/
class Folder {
  /*
  #_id
  #user_id
  #folder_id
  #file_name
  #content
  #created_date
  #updated_date
  */

  getAllByUserId = async (user_id) => {
    const db = await mongoDb.getDb();
    const folderCollection = db.collection(config.collections.FOLDER);
    const cursor = folderCollection.find({user_id: mongoDb.ObjectID(user_id)});
    const folders = [];
    await cursor.forEach(folder => {
      folders.push(folder);
    });
    return folders;
  }

  getByIdAndUserId = async (id, user_id) => {
    const db = await mongoDb.getDb();
    const folderCollection = db.collection(config.collections.FOLDER);
    return await folderCollection.findOne({_id: mongoDb.ObjectID(id), user_id: mongoDb.ObjectID(user_id)})
  }

  create = async (folder) => {
    const db = await mongoDb.getDb();
    const folderCollection = db.collection(config.collections.FOLDER);
    return await folderCollection.insertOne({
      user_id: mongoDb.ObjectID(folder.user_id),
      folder_name: folder.folder_name,
      created_date: new Date(),
      updated_date: new Date()
    });
  }
}

module.exports = Folder;