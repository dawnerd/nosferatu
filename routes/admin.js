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