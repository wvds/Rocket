var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rocket');
module.exports = mongoose.connection;