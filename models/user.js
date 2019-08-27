var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;

var UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    posts : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.virtual('name').get(function () {
  return this.first_name +' '+this.last_name;
});

var User = Model('User', UserSchema);
module.exports = User;