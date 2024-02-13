const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin');
const userRoutes = require('./users');
const authMiddleware = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);

module.exports = router;
