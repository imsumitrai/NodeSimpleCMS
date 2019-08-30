var express = require('express');
var router = express.Router();

var categoryController = require("../controllers/categoryController");
var authMiddleware = require("../middleware/auth");

router.get('/categories',authMiddleware.checkAuth, categoryController.categories);
router.get('/categories/new', authMiddleware.checkAuth, categoryController.newCategory);
router.post('/categories/new', authMiddleware.checkAuth, categoryController.saveCategory);
router.get('/category/:slug', authMiddleware.checkAuth, categoryController.category);
router.post('/category/:slug', authMiddleware.checkAuth, categoryController.updateCategory);
router.post('/category/:id/delete', authMiddleware.checkAuth, categoryController.deleteCategory);

module.exports = router;
