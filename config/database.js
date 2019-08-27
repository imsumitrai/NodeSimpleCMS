require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {useCreateIndex: true, useNewUrlParser: true})
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!!
});
var database = {
    db:db,
    mongose:mongoose
};
module.exports = database;