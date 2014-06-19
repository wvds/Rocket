var mongoose = require('mongoose'),
    Page = require('./page'),
    Project = require('./project'),
    ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.model('PageProject', {
	page_id: {type: ObjectId, ref: 'Page'},
	project_id: {type: ObjectId, ref: 'Project'}
}, 'page_project');