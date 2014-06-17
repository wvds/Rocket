var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rocket');

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function() {
	console.log("Connected to MongoDB"); 
});

module.exports = connection;