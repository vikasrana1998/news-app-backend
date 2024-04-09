const jwt = require('jsonwebtoken');

// Function to generate JWT token
exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

// Function to verify JWT token
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};
