const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.get('/posts', postController.getRecentPost);
router.get('/categories', categoryController.getCategory);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
