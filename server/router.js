const controllers = require('./controllers');
const mid = require('./middleware');
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getWorkouts', mid.requiresLogin, controllers.Workout.getWorkouts);
  app.get('/getStats', mid.requiresLogin, controllers.Stats.getStats);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Workout.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Workout.make);
  app.get('/stats', mid.requiresLogin, controllers.Stats.statsPage);
  app.post('/stats', mid.requiresLogin, controllers.Stats.store);
  app.get('/user', mid.requiresLogin, controllers.Workout.userPage);
  //app.post('/user', mid.requiresLogin, controllers.Workout.store);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
