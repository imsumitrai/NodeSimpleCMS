var express = require('express');
var router = express.Router();

var postController = require("../controllers/postController");
var authMiddleware = require("../middleware/auth");

router.get('/posts',authMiddleware.checkAuth, postController.posts);
router.get('/posts/new', authMiddleware.checkAuth, postController.newPost);
router.post('/posts/new', authMiddleware.checkAuth, postController.savePost);
router.get('/post/:slug', authMiddleware.checkAuth, postController.post);
router.post('/post/:slug', authMiddleware.checkAuth, postController.updatePost);

module.exports = router;
