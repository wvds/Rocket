// Get sample data
var projects = require('../data');

exports.project = function(req, res){
	
	// Get project name/number
	var id = req.param('id');
	
	// Render proejct
	res.json(projects[id]);
};