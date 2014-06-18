var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy; // Extracting the 'Strategy' property from this module.

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log("getting password");
		// TODO: Call database to check user
		if(username === 'admin' && password === 'lynda') {
			console.log("Access granted");
			return done(null, {username: 'admin'});
		}
		console.log("Access denied");
		return done(null, false);
	}
));

// These functions must be defined in order to store the user information in the session.
passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;