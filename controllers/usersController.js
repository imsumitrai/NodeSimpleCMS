
var User = require('../models/user');

exports.index = (req, res, next) => {
    User.find({},{password: 0}, function(error, users){
        res.render("users/index", {title: 'Home', users: users});
        return;
    });
}

exports.profile = (req, res, next) => {
    User.findById(req.params.id, function(error, user){
        res.render("users/profile", {title: user.name + '\'s Profile', user: user});
    });
}
