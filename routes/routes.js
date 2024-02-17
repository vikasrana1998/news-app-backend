const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin');
const publicRoutes = require('./public');
const postController = require('../controllers/postController');

// router.use('/admin', adminRoutes);
// router.use('/public', publicRoutes);
router.get('/try', postController.index);

module.exports = router;
