var Boom = require('boom');

module.exports = {
  method: function(slug, url, next) {
    this.plugins.db.redirects.update({slug: slug}, {slug: slug, url: url}, {upsert: true}, function(err, redirect) {
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
