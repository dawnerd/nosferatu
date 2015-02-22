exports.redirect = {
  path: '/{shortName}',
  method: 'get',
  handler: function(request, reply) {
    request.server.methods.getRedirect(request.params.shortName, function(err, redirect) {
      if (err) {
        return reply.view('error/404');
      }

      request.server.methods.incVisitCount(request.params.shortName, function(err) {
        if (err) {
          request.server.log(['redirect', 'metrics', 'error'], err);
        }
      });

      reply.redirect(redirect.url).permanent(true);

      request.server.log(['redirect', 'metrics'], redirect.toJSON());
    });
  }
};