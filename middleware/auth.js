var User = require('../models/user');

exports.checkAuth = (req, res, next) => {
    if(req.session.userId){
        User.findById(req.session.userId, function(error, user){
            if(user){
                next();
            }else{
                req.session.userId = null;
                req.flash("error", "Login expired");
                res.redirect("login");
                return;
            }
        });
    }else{
        req.session.userId = null;
        req.flash("error", "Login First");
        res.redirect("login");
        return;
    }
}

exports.checkGuest = (req, res, next) => {
    if(req.session.userId){
        res.redirect("home");
        return;
    }else{
        res.locals.auth = null;
        next();
    }
}

exports.auth = (req, res, next) => {
  if(req.session.userId){
    User.findById(req.session.userId, function(error, user){
      if(user){
          res.locals.auth = user._id;
          next();
      }else{
          req.session.userId = null;
          next();
      }
    });
  }else{
    req.session.userId = null;
    next();
  }
}