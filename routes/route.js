module.exports = function() { // function(connection)

	var passport = require('../auth'),
        Project = require('../schemas/project');
	var route = {};
	
	route.rd_project = function(req, res) {
        
        if(req.session.passport.user === undefined) {
            console.log("Access denied");
            res.redirect('/');
            return;
        }
        
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
        successRedirect: '/user'
    });
	
	route.rd_user = function(req, res) {
        //console.log(passport.user);
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