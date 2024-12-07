const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Используйте переменные окружения для безопасности

// Регистрация
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Проверка, существует ли пользователь
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Логин
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Сравнение паролей
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Создание JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Установка токена в cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

// Выход
exports.logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logout successful' });
};