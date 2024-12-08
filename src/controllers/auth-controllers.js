const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const { generateToken } = require('../utils/token-utils');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Используйте переменные окружения для безопасности

// Регистрация
exports.registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new Error('All fields are required'));
    }

    try {
        // Проверка, существует ли пользователь
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new Error('User already exists'));
        }

        const newUser = await User.create({ username, email, password });
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

// Логин
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new Error('All fields are required'));
    }

    try {
        const user = await User.findOne({ email }).exec();
        if (!user || !(await user.comparePassword(password))) {
            return next(new Error('Invalid credentials'));
        }

        // Создание JWT
        const token = generateToken(user);
        // Установка токена в cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ 
            message: 'Login successful', 
            user: { id: user._id, username: user.username, email: user.email },
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Выход
exports.logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logout successful' });
};