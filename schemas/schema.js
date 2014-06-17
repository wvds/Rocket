var mongoose = require('mongoose');

module.exports = mongoose.model('Rocket', {
	admin: String
});