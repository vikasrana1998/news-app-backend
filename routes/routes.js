const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin');
const userRoutes = require('./users');
const postController = require('../controllers/postController');

// router.use('/admin', adminRoutes);
// router.use('/user', userRoutes);
router.get('/try', postController.index);

module.exports = router;
