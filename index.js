var fs = require('fs');
var path = require('path');
var Hapi = require('hapi');
var conf = require('confi')();
var port = process.env.PORT || 8080;
var server = new Hapi.Server();
var _ = require('lodash');
server.connection({
  port: port,
  labels: 'web'
});

server.app.env = (process.env.NODE_ENV == 'production') ? 'prod' : 'dev';

server.app.config = conf;

var mongoUrl = 'mongodb://localhost:27017/'+conf.mongo.db;
if (process.env.MONGODB_URL) {
  mongoUrl = process.env.MONGODB_URL;
}

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

server.register([
  { register: require('hapi-auth-basic') }
], function(err) {
  if (err) {
    throw err;
  }

  server.auth.strategy('simple', 'basic', { validateFunc: validate });
});

server.register([
  { register: require('./apps/db'), options: { url: mongoUrl }},
  { register: require('./apps/www') }
], function(err) {
  if (err) {
    throw err;
  }

  var methodPath = path.join(__dirname, 'methods');

  if (fs.existsSync(methodPath)) {

    var methods = require('require-all')(methodPath);

    _.forIn(methods, function(value, key) {
      server.method(key, value.method.bind(server), value.options || {});
    });
  }

  server.start(function() {
    server.log(['server', 'info'], 'Hapi server started '+ server.info.uri);
  });

  server.on('log', function (event, tags) {
    console.log('Server: ' + (event.data || 'unspecified'));
  });
});