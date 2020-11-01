const mongoDb = require('../handlers/MongoDb');
const config = require('../config');
const crypto = require('crypto');

/*collection - user*/
class User {
  /*
  #_id
  #username
  #password
  */

  getUserByUsernameAndPassword = async (username, password) => {
    const db = await mongoDb.getDb();
    const userCollection = db.collection(config.collections.USER);
    return await userCollection.findOne({username: username, password: crypto.createHash('md5').update(password).digest("hex")});
  }

  create = async (username, password) => {
    const db = await mongoDb.getDb();
    const userCollection = db.collection(config.collections.USER);
    return await userCollection.insertOne({username: username, password: crypto.createHash('md5').update(password).digest("hex")});
  }
}

module.exports = User;