const loginRoutes = require('./login.routes');
const usersRouter = require('./users');
module.exports = (app) => {

  /* GET home page. */
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.use('/login', loginRoutes);
  app.use('/users', usersRouter);


};
