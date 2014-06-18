var mongoose = require('mongoose');

module.exports = mongoose.model('ProjectUser', {
	user_id: String,
	project_id: Date
}, 'project_user');