var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;

var TagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    posts : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]    
});

var Tag = Model('Tag', TagSchema);
module.exports = Tag;