var mongoose = require('mongoose');

mongoose.connect('mongodb://rocket_n_lenaers:Testtest1@ds050077.mongolab.com:50077/rocket');

// In the shell:

// 1. Go to: 
// D:\Applications\MongoDB 2.6.2\bin

// 2. Run this command: 
// mongo ds050077.mongolab.com:50077/rocket -u rocket_n_lenaers -p Testtest1

// 3. If authorization error, run this: db.auth("rocket_n_lenaers", "Testtest1")

// 4. Insert using:
// db.<collection>.insert({<json>})

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error'));
connection.once('open', function() {
	console.log("Connected to remote MongoDB:MongoLab"); 
});

module.exports = connection;
