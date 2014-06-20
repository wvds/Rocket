var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.model('Group', {
	name: String,
    project_id: ObjectId
}, 'group');