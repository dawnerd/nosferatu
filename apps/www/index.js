var _ = require('lodash');

//handlers
var siteHandlers = require('./handlers/site.js');

exports.register = function(plugin, options, next) {

  plugin.dependency(['db']);
  
  plugin.path(__dirname + '/public');

  //view engine
  plugin.views({
    engines: {
        html: require('handlebars')
    },
    path: './pages',
    isCached: (plugin.app.env == 'prod')
  });

  plugin.route(_.values(siteHandlers));

  next();

};

exports.register.attributes = {
  name: 'www'
};