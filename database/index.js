var mongoose = require('mongoose');
var _ = require('lodash');
var models = require('require-all')(__dirname + '/models');

exports.register = function(plugin, options, next) {

  mongoose.connect(options.url, function() {
    next();
  });

  var db = mongoose.connection;

  plugin.expose('connection', db);
  _.forIn(models, function(value, key) {
    plugin.expose(key, value);
  });

};

exports.register.attributes = {
  name: 'db'
};