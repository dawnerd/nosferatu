var Boom = require('boom');

module.exports = {
  method: function(slug, next) {
    this.plugins.db.redirects.findOne({slug: slug}, function(err, redirect) {
      if (err) {
        return next(Boom.badImplementation(err));
      }

      if (!redirect) {
        return next(Boom.notFound());
      }

      next(null, redirect);
    });
  }
};