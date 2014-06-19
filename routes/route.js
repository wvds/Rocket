module.exports = function() { // function(connection)

	var passport = require('../auth'),
        scm_project_user = require('../schemas/project_user'),
        scm_project = require('../schemas/project'),
        scm_page_project = require('../schemas/page_project'),
        scm_pages = require('../schemas/page');
	var route = {};
	
	route.rd_project = function(req, res) {
        
        // Verify user        
        if(req.user === undefined) { return res.redirect('/login'); }
        
        // List all projects assigned to the user
        scm_project_user
            .find({})
            .where('user_id').equals(req.user._id)
            .populate('project_id')
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
        
        // Render page
		res.render('login', {
			title: 'Rocket Login'
		});
	}
	
	route.rd_user = function(req, res) {
        
        // Verify user
		if(req.session.passport.user === undefined) {
			return res.redirect('/login');
		}
        
        // Render page
        res.render('user', {
            title: 'Welcome',
            user: req.user
        });
	}
    
    route.rd_editor = function(req, res) {
        
        // Verify user
        if(req.user === undefined) { return res.redirect('/login'); }
        
        // Get project code
        var project_code = req.param('code');
        
        // Look for the right project based on code
        scm_project
            .findOne({ code: project_code })
            .exec(function(err, results) {
                
                // Use project reference to look for pages
                scm_page_project
                    .find()
                    .populate('page_id')
                    .where('project_id').equals(results._id)
                    .exec(function(err, pages) {
                        // Render page
                        res.render('editor', {
                            code: project_code,
                            pages: pages
                        });
                    });
            });
    }
	
    route.rd_authenticate = passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/project'
    });
    
	return route;
};