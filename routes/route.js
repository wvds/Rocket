module.exports = function() {

	var passport = require('../auth'),
        query = require('../queries/query')(),
        route = {};
    
	route.rd_project = function(req, res) {
        
        // Verify user        
        if(req.user === undefined) { return res.redirect('/login'); }
        
        // Get all projects for current user
        query.get_projects(req, res, function(projects) {
                    
            res.render('project', {
                projects: projects
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
        
        // Get project code
        var project_code = req.param('code'),
            editor = {
                project: null,
                pages:  null,
                groups: null,
                elements: null
            };
        
        // Get current project
        query.get_project(res, project_code, function(project) {
            editor.project = project;
            render_editor();
            
            // Get all pages for current project
            query.get_pages(project, res, function(pages) {
                editor.pages = pages;
                render_editor();
            });
            
            // Get all groups for current project
            query.get_project_groups(project, res, function(groups) {
                editor.groups = groups;
                render_editor();
            });
            
            // Get all elements for current project
            query.get_project_elements(project, res, function(elements) {
                editor.elements = elements;
                render_editor();
            });
        });
        
        function render_editor() {
            
            for(var data in editor) {
                if(!editor[data]) return;
            }
            
            res.render('editor', {
                name: editor.project.name,
                code: project_code,
                pages: editor.pages,
                groups: editor.groups,
                elements: editor.elements
            });
        }
    }
	
    route.rd_authenticate = passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/project'
    });
    
	return route;
};