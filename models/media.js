var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;

var MediaSchema = new Schema({
    title: {
        type: String,
        required: false,
        trim: true
    },
    file: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    alt_description:{
        type: String,
        required: false
    },
    author : { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

MediaSchema.set('toJSON', {
    virtuals: true
});

var Media = Model('Media', MediaSchema);
module.exports = Media;