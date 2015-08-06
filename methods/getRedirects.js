var Boom = require('boom');

module.exports = {
  method: function(next) {
    this.plugins.db.redirects.find({}, function(err, redirects) {
      if (err) {
        return next(Boom.badImplementation(err));
      }

      next(null, redirects);
    });
  }
};
