var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.model('Element', {
	name: String,
    project_id: ObjectId
}, 'element');