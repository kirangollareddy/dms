# Document Management System - dms

Steps to start application: 
1. Update mongoUrl and databaseName in config.js
2. Run following commands in mongodb console.
      
      `use dms`
      
      `db.user.createIndex({username: 1}, {unique:true})`
      
      `db.folder.createIndex({folder_name: 1, user_id: 1}, {unique:true})`
      
      `db.file.createIndex({file_name: 1, user_id: 1, folder_id: 1}, {unique:true})`
  
3. `npm start`


## Schema ##
Added DB Schema PNG and draw.io file in "./schema" folder

## Postman Collection with all APIs ##
import "DMS.postman_collection.json" in your postman to start using/testing this application
