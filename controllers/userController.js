require('dotenv').config();
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { User } = require("../models");
const { generateToken } = require('../utils/authJWT');

exports.register = async (req, res) => {

    try {
        //Validate
        const signUpSchema = z.object({
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { name, email, password } = signUpSchema.parse(req.body);

        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User added successfully", data: newUser });
    } catch (error) {
        res.status(400).json({ failed: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        //Validate
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { email, password } = loginSchema.parse(req.body);

        const user = await User.findOne({ where: { email: email } });

        //Password matching
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ userId: user.id });
        user.remember_token = token;
        await user.save();

        res.json({ message: 'Login successful', token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};