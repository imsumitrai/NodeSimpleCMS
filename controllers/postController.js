var User = require('../models/user');
var Post = require('../models/post');

exports.posts = (req, res, next) =>{
    // Post.find({}, function(error, posts){
    //     res.render('posts/index', { title: 'Posts', posts: posts});
    // });
    Post.find({}).populate("author", ["first_name", "last_name"]).exec(function(error, posts){
        res.render('posts/index', { title: 'Posts', posts: posts});
    })
}

exports.newPost = (req, res, next) => {
    res.render('posts/new', {title: "New Post", csrftoken: req.csrfToken()});
}

exports.savePost = (req, res, next) => {
    Post.findOne({slug: req.body.slug}, function(error, post){
        if(post){
            req.flash("error", "Post Already Exists");
            res.redirect("/posts/new");
            return;
        }else{
            var newPost = Post({
                author: req.session.userId,
                slug: req.body.slug,
                title: req.body.title,
                description: req.body.description
            });
            newPost.save(function(error){
                if(error){
                    req.flash("error", err.message);
                    res.redirect("new");
                    return;
                }else{
                    res.redirect("/post/"+ newPost.slug);
                    return;
                }
            });
        }
    });
}

exports.post = (req, res, next) => {
    Post.findOne({slug:req.params.slug}, function(error, post){
        if(post){
            res.render("posts/post", {title: post.title, post: post});
            return;
        }else{
            res.redirect("/posts");
            return;
        }
    });
}

exports.updatePost = (req, res, next) => {
    Post.update({slug:req.params.slug}, {slug: req.body.slug, title: req.body.title, description: req.body.description}, function(error, post){
        if(error){
            req.flash("error", err.message);
        }
        req.flash("status", "Post Updated");
        res.redirect(req.body.slug); 
        return;
    });
}