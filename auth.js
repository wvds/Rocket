var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
    User = require('./schemas/user');

passport.use(new LocalStrategy(
    
	function(username, password, done) {
		
        User.findOne({'username': username}, function(err, user) {
            
            if(err) return done(err);
            if(!user) return done(null, false);
            if(user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
	} 
));

// These functions must be defined in order to store the user information in the session.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

module.exports = passport;