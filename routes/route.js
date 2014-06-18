module.exports = function() { // function(connection)

	var passport = require('../auth'),
        Project = require('../schemas/project'),
        ProjectUser = require('../schemas/project_user');
	var route = {};
	
	route.rd_project = function(req, res) {
        
        var user = req.session.passport.user;
        
        // Verify user
        if(user === undefined) {
            res.redirect('/login');
            return;
        }
        
        // List all projects assigned to the user
        ProjectUser
            .find('project_id')
            .where('user_id').equals(user._id)
            .populate('project_id')
            .exec(function(err, results) {
                
            if(err) {
				res.status(500).json({status: 'failure'});
			} else {
                
                console.log("Results: " + results);
                
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