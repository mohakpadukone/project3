const controllers = require('./controllers');
const mid = require('./middleware');
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Workout.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Workout.make);
  app.get('/stats', mid.requiresLogin, controllers.Stats.statsPage);
  app.post('/stats', mid.requiresLogin, controllers.Stats.store);
  app.get('/user', mid.requiresLogin, controllers.Stats.userPage);
  app.post('/user', mid.requiresLogin, controllers.Stats.store);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
