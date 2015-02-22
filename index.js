var Rapptor = require('rapptor');
var rapptor = new Rapptor();

var users = {
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password'
  }
};

var validate = function (username, password, callback) {
  var user = users[username];
  if (!user) {
    return callback(null, false);
  }

  if (user.password === password) {
    callback(null, true, {username: user.username});
  } else {
    callback(null, false);
  }
};

rapptor.server.register([
  { register: require('hapi-auth-basic') },
  { register: require('./database'), options: { url: rapptor.config.mongo.url } }
  ], function (err) {
  rapptor.server.auth.strategy('simple', 'basic', { validateFunc: validate });
  rapptor.start();
});