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
	}
	
	route.rd_login = function(req, res) {
		res.render('login.ejs', {
			title: 'Rocket Login'
		});
	}
	
	route.rd_user = function(req, res) {
		if(req.session.passport.user === undefined) {
			res.redirect('/login');
		} else {
			res.render('user.ejs', {
				title: 'Welcome',
				user: req.user
			});
		}
	}
	
	return route;
};