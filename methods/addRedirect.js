var Boom = require('boom');

module.exports = {
  method: function(slug, url, next) {
    this.server.plugins.db.redirects.create({slug: slug, url: url}, function(err, redirect) {
      if (err) {
        return next(Boom.badImplementation(err));
      }

      if (!redirect) {
        return next(Boom.conflict());
      }

      next(null);
    });
  }
};