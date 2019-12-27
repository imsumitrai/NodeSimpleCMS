var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;

var PostSchema = new Schema({
    author : { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: false,
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    categories : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    tags : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],    
});

var Post = Model('Post', PostSchema);
module.exports = Post;