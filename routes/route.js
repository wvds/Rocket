/* Javascript Abbreviation Rules

    req     Request
    res     Result
    rd      Read
    wr      Write
    rdn     Render
    
*/

module.exports = function() {

    // Requirements
	var passport = require('../auth'),
        query = require('../queries/query')(),
        async = require('async'),
        scm_project = require('../schemas/project'),
        route = {};
    
    route.res_err = function(res) {
        return res.status(500).json({status: 'Connection Error'});
    }
    
	route.rd_project = function(req, res) {
        
        // Verify user        
        if(req.user === undefined) { return res.redirect('/login'); }
        
        var usertype = req.user.type;
    
        // Get projects
        query.get_projects(req, res, function(projects) {  
            res.render('project', {
                projects: projects,
                usertype: usertype
            });
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
        
        // Define out here, so all following tasks can access editor data
        var project_code = req.param('code'),
            usertype = req.user.type,
            editor = {};
        
        // Check usertype for rendering
        usertype === 'des' ? rdn_des() : rdn_dev();
        
        // Designer
        function rdn_des() {
            
            async.series([
                function(callback) {
                    // Get current project
                    query.get_project(res, project_code, function(project) { 
                        editor.project = project;
                        callback(); 
                    });
                },
                function(callback) {
                    async.parallel([
                        function(callback) {
                            // Get pages
                            query.get_pages(editor.project, res, function(pages) {
                                editor.pages = pages;
                                callback();
                            });
                        },
                        function(callback) {
                            // Get groups
                            query.get_project_groups(editor.project, res, function(groups) {
                                editor.groups = groups;
                                callback();
                            });
                        },
                        function(callback) {
                            // Get elements
                            query.get_project_elements(editor.project, res, function(elements) {
                                editor.elements = elements;
                                callback();
                            });
                        }
                    ], callback);
                }

            ], function(err) {
                if(err) return route.res_err(res);

                // Render editor page for designers
                res.render('editor_des', {
                    name: editor.project.name,
                    code: project_code,
                    pages: editor.pages,
                    groups: editor.groups,
                    elements: editor.elements
                });
            });
        }
        
        // Developer
        function rdn_dev() {
            res.render('editor_dev');
        }
    }
	
    route.rd_authenticate = passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/project'
    });
    
	return route;
};