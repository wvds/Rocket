var mongoose = require('mongoose');

module.exports = mongoose.model('Rocket', {
	firstname: String,
	lastname: String
});