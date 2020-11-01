const loginRoutes = require('./login.routes');
const userRouter = require('./user.routes');
const folderRouter = require('./folder.routes');
const fileRouter = require('./file.routes');
const dashboardRouter = require('./dashboard.routes');

module.exports = (app) => {

  /* GET home page. */
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.use('/login', loginRoutes);
  app.use('/user', userRouter);
  app.use('/folder', folderRouter);
  app.use('/file', fileRouter);
  app.use('/home', dashboardRouter);

};
