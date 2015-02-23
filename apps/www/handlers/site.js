var Joi = require('joi');

exports.admin = {
  path: '/admin',
  method: 'get',
  config: {
    auth: 'simple'
  },
  handler: function(request, reply) {
    request.server.methods.getRedirect('test', function() {});
    reply.view('admin/index');
  }
};

exports.add = {
  path: '/admin',
  method: 'post',
  config: {
    auth: 'simple',
    validate: {
      payload: {
        slug: Joi.string().required(),
        url: Joi.string().required()
      }
    }
  },
  handler: function(request, reply) {
    request.server.methods.addRedirect(request.payload.slug, request.payload.url, function(err) {
      if (err) {
        return reply(err);
      }

      reply.redirect('/admin');
    });
  }
};

exports.home = {
  path: '/',
  method: 'get',
  handler: function(request, reply) {

    if (process.env.ROOT_REDIRECT) {
      reply.redirect(process.env.ROOT_REDIRECT).permanent(true);
    } else {
      reply('Oh, hi there');
    }
  }
};

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