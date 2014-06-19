var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
	name: String,
	date_start: Date,
	date_end: Date,
    code: String
}, 'project');