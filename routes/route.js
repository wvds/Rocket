module.exports = function() { // function(connection)

	var Project = require('../schemas/project');
	var route = {};
	
	route.rd_project = function(req, res) {
			
		Project.find(function (err, results) {
			if(err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('project.ejs', {
					projects: results
				});
			}
		});
	};
	
	return route;
};