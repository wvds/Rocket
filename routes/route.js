// Get sample data
var RocketSchema = require('../schemas/schema');

module.exports = function(projects) {

	var functions = {};

	functions.stamp = function(req, res) {
		
		console.log("stamping...");
		
		var name = req.param('name');
		
		// Use a defined schema for data storage
		var record = new RocketSchema({
			name: name,
			date_created: '2012-04-23'
		});
		
		// Actually save the data in MongoDB
		record.save(function(err) {
			if(err) {
				console.log(err);
				res.status(500).json({status: 'failure'});
			} else {
				res.json({status: 'success'});
			}
		});
		
	};
	
	functions.projects = function(req, res) {
		RocketSchema.find()
			.setOptions({ sort: 'name' })
			.exec(function(err, projects) {
				if(err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					res.render('project.ejs', {
						projects: projects
					});
				}
			});
			
		/*res.render('project.ejs', {
			kaas: projects
		});*/
	};
	
	return functions;
};