const mongoose = require('mongoose');
console.log(process.env.DB_URL);

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/transformers_db');

module.exports = mongoose.connection;
