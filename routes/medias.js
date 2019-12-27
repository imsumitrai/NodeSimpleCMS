var express = require('express');
var router = express.Router();

const csrf = require("csurf");

express().use(csrf());
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + "." + path.extname(file.originalname))
    }
  });
var upload = multer({ storage: storage });

// express().use(csrf());
// express().use(function (req, res, next) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.locals.csrftoken = req.csrfToken();
//     next();
//   });

var mediaController = require("../controllers/mediaController");
var authMiddleware = require("../middleware/auth");

router.get('/medias',authMiddleware.checkAuth, mediaController.medias);
router.post('/medias', authMiddleware.checkAuth, upload.single('file'), mediaController.saveMedia);
router.get('/media/:id', authMiddleware.checkAuth, mediaController.media);
router.post('/media/:id', authMiddleware.checkAuth, mediaController.updateMedia);
router.post('/media/:id/delete', authMiddleware.checkAuth, mediaController.deleteMedia);

module.exports = router;
