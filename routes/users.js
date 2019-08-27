var express = require('express');
var router = express.Router();


var authMiddleware = require("../middleware/auth");
var usersController = require("../controllers/usersController");

/* GET users listing. */
router.get('/users', authMiddleware.checkAuth, usersController.index);
router.get('/user/:id', authMiddleware.checkAuth, usersController.profile);

module.exports = router;
