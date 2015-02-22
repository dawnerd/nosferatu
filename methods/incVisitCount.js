var Boom = require('boom');

module.exports = {
  method: function(slug, next) {
    this.server.plugins.db.redirects.update({slug: slug}, {$inc: {visits: 1}}, function(err, updated) {
      if (err) {
        return next(Boom.badImplementation(err));
      }

      if (!updated) {
        return next(Boom.notFound());
      }

      next(null);
    });
  }
};