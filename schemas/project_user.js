var mongoose = require('mongoose'),
    User = require('./user'),
    Project = require('./project'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('ProjectUser', {
	user_id: {type: Schema.ObjectId, ref: 'User'},
	project_id: {type: Schema.ObjectId, ref: 'Project'}
}, 'project_user');