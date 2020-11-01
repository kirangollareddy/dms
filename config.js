module.exports = {
  secret: 'document-management-system-secret',
  tokenExpiryHours: (24*60*60*1000),
  mongoUrl: 'mongodb://localhost:27017/',
  databaseName: 'dms',
  collections: {
    'USER': 'user',
    'FOLDER': 'folder',
    'FILE': 'file'
  }
}