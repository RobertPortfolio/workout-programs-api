const mongoose = require('mongoose');
const User = require('../models/user-model');

// Добавление тренировки
exports.addWorkout = async (req, res) => {
    const workoutData = req.body; // workout - это объект с данными тренировки
    if (!workoutData) {
        return res.status(400).json({ error: 'Workout data are required' });
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const workoutWithId = {
            ...workoutData,
            _id: new mongoose.Types.ObjectId(), // Генерация уникального ID
        };
        user.workoutLog.push(workoutWithId); // Добавление данных в журнал тренировок
        await user.save();

        res.status(200).json({ message: 'Workout added successfully', workoutLog: user.workoutLog });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Получение списка тренировок
exports.getUserWorkouts = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            userId: user._id,
            username: user.username,
            workoutLog: user.workoutLog
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserWorkoutById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Поиск тренировки в массиве workoutLog
        const workout = user.workoutLog.find(
            (item) => item._id.toString() === req.params.workoutId
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.status(200).json({
            workout: workout,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};