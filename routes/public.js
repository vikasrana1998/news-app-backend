const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');

router.get('/posts', postController.getRecentPost);
router.get('/categories', categoryController.getCategory);

module.exports = router;
