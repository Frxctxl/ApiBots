const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transformers_db');

module.exports = mongoose.connection;
