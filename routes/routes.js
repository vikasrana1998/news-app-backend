const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin');
const publicRoutes = require('./public');

router.use('/admin', adminRoutes);
router.use('/public', publicRoutes);

module.exports = router;
