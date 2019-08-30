var User = require('../models/user');
var Media = require('../models/media');

exports.medias = (req, res, next) =>{
    Media.find({}, function(error, medias){
        res.render('medias/index', { title: 'Medias', medias: medias});
    })
}

exports.saveMedia = (req, res, next) => {
    var newMedia = Media({
        author: req.session.userId,
        file: req.file.path,
        title: req.body.title,
        alt_description: req.body.alt_description
    });
    newMedia.save(function(error){
        if(error){
            req.flash("error", err.message);
            res.redirect(req.headers.referer);
            return;
        }else{
            req.flash("status", "Media Uploaded Successfully");
            res.redirect(req.headers.referer);
            return;
        }
    });
}

exports.media = (req, res, next) => {
    Media.findById(req.params.id, function(error, media){
        if(media){
            res.render("medias/media", {title: media.title, media: media});
            return;
        }else{
            req.flash("error", "Media not Found");
            res.redirect(req.headers.referer);
            return;
        }
    });
}

exports.updateMedia = (req, res, next) => {
    Media.findByIdAndUpdate(req.params.id, {title: req.body.title, alt_description: req.body.alt_description}, function(error, media){
        if(error){
            req.flash("error", err.message);
            res.redirect(req.headers.referer);
            return;
        }
        req.flash("status", "Media Updated");
        res.redirect(req.headers.referer);
        return;
    });
}

exports.deleteMedia = (req, res, next) => {
    Media.findByIdAndDelete(req.params.id,function(error){
        if(error){
            req.flash("error", error.message);
            res.redirect(req.headers.referer);
            return;
        }else{
            req.flash("status", "Media Deleted");
            res.redirect(req.headers.referer);
            return;
        }
    });
}