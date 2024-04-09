const { where } = require("sequelize");
const { User } = require("../models");
const { verifyToken } = require('../utils/authJWT');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = verifyToken(token);

        const user = await User.findOne({ where: { id: decoded.userId, remember_token: token } });

        if (!user) {
            throw new Error('User not forund');
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed login again', error: err.message });
    }
};