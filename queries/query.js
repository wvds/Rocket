module.exports = function() {
    
    var scm_project_user = require('../schemas/project_user'),
        scm_page_project = require('../schemas/page_project'),
        scm_project = require('../schemas/project'),
        scm_element = require('../schemas/element'),
        scm_group = require('../schemas/group'),
        query = {};
    
    // Query error
    query.res_err = function(res) {
        return res.status(500).json({status: 'Connection Error'});
    }
    
    // Get all projects
    query.get_projects = function(req, res, callback) {
        
        scm_project_user
            .find({})
            .where('user_id').equals(req.user._id)
            .populate('project_id')
            .exec(function done(err, projects) {
                if(err) return query.res_err(res);
                callback(projects);
            });
    }
    
    // Editor Queries
    query.get_project = function(res, project_code, callback) {
        
        // Get current project
        scm_project
            .findOne({ code: project_code })
            .exec(function(err, project) {
                if(err) return query.res_err(res);
                callback(project);
        });
    }
    
    query.get_project_pages = function(project, res, callback) {
    
        scm_page_project
            .find()
            .populate('page_id')
            .where('project_id').equals(project._id)
            .exec(function(err, pages) {
                if(err) return query.res_err(res);
                callback(pages);
            });
    }
    
    query.get_project_groups = function(project, res, callback) {
        
        scm_group
            .find()
            .where('project_id').equals(project._id)
            .exec(function(err, groups) {
                if(err) return query.res_err(res);
                callback(groups);
            });
    }
    
    query.get_project_elements = function(project, res, callback) {
        
        scm_element
            .find()
            .where('project_id').equals(project._id)
            .exec(function(err, elements) {
                if(err) return query.res_err(res);
                callback(elements);
            });
    }
    
    return query;
    
};