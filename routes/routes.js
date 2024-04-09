const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin');
const publicRoutes = require('./public');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use('/admin', authMiddleware, adminRoutes);
router.use('/public', publicRoutes);

module.exports = router;
