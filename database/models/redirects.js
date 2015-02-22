var mongoose = require('mongoose');

var redirectSchema = mongoose.Schema({
  slug: { type: String, unique: true },
  url: String,
  visits: { type: Number, default: 0 }
});

module.exports = mongoose.model('Redirects', redirectSchema);