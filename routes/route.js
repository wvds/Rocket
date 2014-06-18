module.exports = function() { // function(connection)

	var passport = require('../auth'),
        Project = require('../schemas/project'),
        ProjectUser = require('../schemas/project_user');
	var route = {};
	
	route.rd_project = function(req, res) {
        
        // Verify user
        if(req.session.passport.user === undefined) {
            res.redirect('/');
            return;
        }
        
        console.log(req.session.passport.user.first_name);
        
        Project
            .find({})
            .select('name date_start')
            .exec(function(err, results) {
                
            if(err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('project', {
					projects: results
				});
			}
        });
	}

	route.rd_login = function(req, res) {
		res.render('login', {
			title: 'Rocket Login'
		});
	}
    
    route.rd_authenticate = passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/project'
    });
	
	route.rd_user = function(req, res) {
        //console.log(req.session.passport.user);
		if(req.session.passport.user === undefined) {
			res.redirect('/login');
            return;
		}
        res.render('user', {
            title: 'Welcome',
            user: req.user
        });
	}
	
	return route;
};