var Boom = require('boom');

module.exports = {
  method: function(slug, next) {
    this.plugins.db.redirects.remove({slug: slug}, function(err, redirect) {
      if (err) {
        return next(Boom.badImplementation(err));
      }

      next(null);
    });
  }
};
