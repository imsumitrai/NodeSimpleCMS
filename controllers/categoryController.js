var Category = require('../models/category');

exports.categories = (req, res, next) => {
    var categories = Category.find({parentCategory: null}).populate({path: 'children', populate: {path: 'children'}}).exec(function(error, categories){
        res.render('categories/index', {title: "Categories", categories: categories, csrftoken: req.csrfToken()});
    });
}

exports.newCategory = (req, res, next) => {
    Category.find({parentCategory: null}).populate({path: 'children', populate: {path: 'children'}}).exec(function(error, categories){
        res.render('categories/new', {title: "New Category", categories: categories, csrftoken: req.csrfToken()});
    });
}

exports.saveCategory = (req, res, next) => {
    var parent = req.body.parent;
    var title = req.body.title;
    var slug = req.body.slug;
    if(!slug || !title){
        req.flash("error", "Title and Slug is required");
        res.redirect(req.headers.referer);
        return;
    }
    Category.findOne({slug:slug},function(error,category){
        if(error){
            req.flash("error", "Slug Already Exists");
            res.redirect(req.headers.referer);
            return;
        }else{
            if(!parent){
                var newCategory = Category({
                    title: title,
                    slug: slug
                });
                newCategory.save(function(error){
                    if(error){
                        req.flash("error", error.message);
                        res.redirect(req.headers.referer);
                        return;
                    }else{
                        req.flash("status", "Category Saved");
                        res.redirect(req.headers.referer);
                        return;
                    }
                });
            }else{
                var newCategory = Category({
                    title: title,
                    slug: slug,
                    parentCategory: parent
                });
                newCategory.save(function(error){
                    if(error){
                        req.flash("error", error.message);
                        res.redirect(req.headers.referer);
                        return;
                    }else{
                        req.flash("status", "Category Saved");
                        res.redirect(req.headers.referer);
                        return;
                    }
                });
            }
        }
    });
}

exports.category = (req, res, next) => {
    Category.find({slug: req.params.slug}).populate({path: 'children', populate: {path: 'children'}}).exec(function(error, categories){
        res.render('categories/category', {title: "New Category", categories: categories, csrftoken: req.csrfToken()});
    });
}

exports.updateCategory = (req, res, next) => {
    
}

exports.deleteCategory = (req, res, next) => {
    Category.findByIdAndDelete(req.params.id,function(error){
        if(error){
            req.flash("error", error.message);
            res.redirect(req.headers.referer);
            return;
        }else{
            req.flash("status", "Category Deleted");
            res.redirect(req.headers.referer);
            return;
        }
    });
}