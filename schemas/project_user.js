var mongoose = require('mongoose'),
    User = require('./user'),
    Project = require('./project'),
    ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.model('ProjectUser', {
	user_id: {type: ObjectId, ref: 'User'},
	project_id: {type: ObjectId, ref: 'Project'}
}, 'project_user');