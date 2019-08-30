var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;

var CategorySchema = new Schema({
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
    parentCategory : {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    }  
});

CategorySchema.virtual('children', {
    ref: 'Category',   // the model to use
    localField: '_id',  // find children where 'localField' 
    foreignField: 'parentCategory' // is equal to foreignField
});

CategorySchema.set('toJSON', {
    virtuals: true
});

// CategorySchema.virtual('child').get(function() {
//     return Category.find({parentCategory: this._id},function(error, child){
//         return child;
//     });
// });
var Category = Model('Category', CategorySchema);
module.exports = Category;