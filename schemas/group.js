var mongoose = require('mongoose');

module.exports = mongoose.model('Group', {
	name: String,
}, 'group');