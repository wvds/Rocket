var mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.ObjectId;;

module.exports = mongoose.model('Page', {
	name: String,
	project_id: {type: ObjectId, ref: 'Project'}
}, 'page');