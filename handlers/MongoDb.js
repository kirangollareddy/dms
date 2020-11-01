const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const config = require('../config');

let db;
async function getDb() {
  if(!db){
    const mongoClient = await MongoClient.connect(config.mongoUrl, {
      poolSize: 10
    });
    db = mongoClient.db(config.databaseName);
  }
  return db;
}

module.exports = {
  getDb: getDb,
  ObjectID: mongodb.ObjectID
}