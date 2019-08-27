
var User = require('../models/user');
var bcrypt = require("bcrypt");
var bcryptSalt = 10;

exports.login = (req, res, next) =>{
    res.render('auth/login', { title: 'Login', csrftoken: req.csrfToken()});
}

exports.doLogin = (req, res, next) =>{
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email:email}, function(error, user){
        if(error){
            req.flash("error", error.message);
            res.redirect(req.headers.referer);
            return;
        }
        if(user){
            bcrypt.compare(password, user.password, function(error, is_matched){
                if(error){
                    req.flash("error", error.message);
                    res.redirect(req.headers.referer);
                    return;
                }
                if(is_matched){
                    req.session.userId = user._id;
                    req.flash("status", "Successfully Login");
                    res.redirect("home");
                    return;
                }else{
                    req.flash("error", "Incorrect Password");
                    res.redirect(req.headers.referer);
                    return;
                }
            });
        }else{
            req.flash("error", "Invalid Email");
            res.redirect(req.headers.referer);
            return;
        }
    });
}

exports.register = (req, res, next) =>{
    res.render('auth/register', { title: 'Register', csrftoken: req.csrfToken()});
}

exports.doRegister = (req, res, next) =>{
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    if(!first_name || !last_name || !email || !password || !confirm_password){
        req.flash("error", "All Fields are required");
        res.redirect(req.headers.referer);
        return;
    }
    if(password != confirm_password){
        req.flash("error", "Password Not Matched");
        res.redirect(req.headers.referer);
        return;
    }
    User.findOne({email: email},function(error, user){
        if(error){
            req.flash("error", error.message);
            res.redirect(req.headers.referer); 
            return;  
        }else{
            if(user){
                req.flash("error", "Email Already Exists");
                res.redirect(req.headers.referer);
                return;
            }else{
                bcrypt.hash(password, bcryptSalt).then(function(pwd){
                    var newUser = User({
                        first_name:first_name,
                        last_name:last_name,
                        email: email,
                        password: pwd
                    });
                    newUser.save(function(err){
                        if(err){
                            req.flash("error", err.message);
                            res.redirect(req.headers.referer);
                            return;
                        }else{
                            req.session.userId = newUser._id;
                            res.redirect("home");
                            return;
                        }
                    });
                });
            }
        }
    });
}

exports.logout = (req, res, next) =>{
    req.session.userId = null;
    res.redirect('login');
    return;
}

exports.home = (req, res, next) => {
    // res.json(req.route.path);return;
    User.find({},{password: 0}, function(error, users){
        res.render("home", {title: 'Home', users: users});
        return;
        // res.json(users);
    });
}

exports.profile = (req, res, next) => {
    User.findById(req.session.userId, function(error, user){
        res.render("auth/profile", {title: 'Profile', user: user});
    });
}

exports.profileUpdate = (req, res, next) => {
    User.findById(req.session.userId, function(error, user){
        user.update({first_name:req.body.first_name, last_name:req.body.last_name}, function(error, user){
            if(error){
                req.flash("error", error.message);
                res.redirect(req.headers.referer);
                return;
            }else{
                req.flash("status", "Successfully Updated User");
                res.redirect(req.headers.referer);
                return;
            }
        });
    });
}