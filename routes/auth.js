var express = require('express');
var router = express.Router();
var authController = require("../controllers/authController");
var authMiddleware = require("../middleware/auth");

router.get('/login', authMiddleware.checkGuest, authController.login);
router.post('/login', authMiddleware.checkGuest, authController.doLogin);
router.get('/register', authMiddleware.checkGuest, authController.register);
router.post('/register', authMiddleware.checkGuest, authController.doRegister);
router.get('/logout', authController.logout);
router.get('/profile', authMiddleware.checkAuth, authController.profile);
router.post('/profile', authMiddleware.checkAuth, authController.profileUpdate);
router.get('/home', authMiddleware.checkAuth, authController.home);

module.exports = router;
